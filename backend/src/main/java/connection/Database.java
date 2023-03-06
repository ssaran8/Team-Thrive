package connection;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;

import datastructures.User;
import datastructures.calendar.Event;
import datastructures.calendar.Frequency;
import datastructures.calendar.Task;
import datastructures.community.Comment;
import datastructures.community.Post;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.text.*;
import java.util.concurrent.ExecutionException;

public class Database {
    private final Firestore db;

    public static Database connectFirestore() {
        try {
            FileInputStream serviceAccount = new FileInputStream(
                    "res/thrive-b3588-firebase-adminsdk-ooykn-60a3497bd1.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
            Firestore fs = FirestoreClient.getFirestore();
            return new Database(fs);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private Database(Firestore fs) {
        db = fs;
    }

    // Allison
    public String createTask(String userId, String name, String category, int priority, int estimationTime,
            Frequency frequency, boolean privateTask, Date startDate, Date endDate, boolean[] daysOfWeek) {
        // Create a new Task with current information
        Task task = new Task(
                userId,
                name,
                category,
                priority,
                false,
                estimationTime,
                frequency,
                privateTask,
                startDate,
                endDate,
                daysOfWeek);
        return createTask(userId, task);
    }

    public String createTask(String userID, Task task) {
        DocumentReference userRef = db.collection("users").document(userID);

        // Creating a new doc for the post
        ApiFuture<DocumentReference> futureTaskRef = db.collection("tasks").add(task);
        DocumentReference taskRef;
        try {
            taskRef = futureTaskRef.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        // Get the user document
        ApiFuture<DocumentSnapshot> userSnapshotFuture = userRef.get();
        DocumentSnapshot userSnapshot;
        try {
            userSnapshot = userSnapshotFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        User user = userSnapshot.toObject(User.class);

        // Adding the task to the user document
        user.addTask(taskRef.getId());
        ApiFuture<WriteResult> updateUser = userRef.set(user);
        try {
            updateUser.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        // Add task to taskHistory if applicable
        DateFormat dateFormat = new SimpleDateFormat("MMddyyyy");
        String taskDate = dateFormat.format(task.getStartDate());

        DocumentReference taskHistoryRef = db.collection("users").document(userID).collection("taskHistory")
                .document(taskDate);
        ApiFuture<DocumentSnapshot> taskHistoryFuture = taskHistoryRef.get();
        DocumentSnapshot taskHistoryDoc;
        try {
            taskHistoryDoc = taskHistoryFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        Map<String, Object> taskHistory;
        if (taskHistoryDoc.exists()) {
            taskHistory = taskHistoryDoc.getData();
            List<String> incomplete = (List<String>) taskHistory.get("incomplete");
            incomplete.add(taskRef.getId());
            ApiFuture<WriteResult> updateHistory = taskHistoryRef.set(taskHistory);
            try {
                updateHistory.get();
            } catch (Exception e) {
                e.printStackTrace();
                return "";
            }
        }

        return taskRef.getId();
    }

    // do later
    public void saveEvent(String UID, Event e) {
        throw new RuntimeException("Not implemented yet");
    }

    public Map<String, List<Integer>> fetchTaskSummary(String userID) {
        Map<String, List<Integer>> summary = new HashMap<>();
        summary.put("week", new ArrayList<>());
        summary.put("month", new ArrayList<>());

        Calendar cal = Calendar.getInstance();
        int dayOfMonth = cal.get(Calendar.DAY_OF_MONTH);
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        int month = cal.get(Calendar.MONTH);
        int year = cal.get(Calendar.YEAR);

        // TODO: adding async calls to fetchTaskHistory could be nice since each call
        // blocks on calls to db, so it is slow
        // We would need to change summary value type from List<Integer> to probably an
        // int[31] Map<Integer, Integer>
        for (int i = 1; i <= dayOfMonth; i++) {
            cal.set(Calendar.DAY_OF_MONTH, i);
            Date date = cal.getTime();
            Map<String, List<String>> history = fetchTaskHistory(userID, date);
            double numComplete = (double) history.get("complete").size();
            double numIncomplete = (double) history.get("incomplete").size();
            summary.get("month").add((int) Math.ceil(100 * numComplete / (numComplete + numIncomplete)));
        }

        for (int i = dayOfMonth - (dayOfWeek - 1); i <= dayOfMonth; i++) {
            cal.set(Calendar.DAY_OF_MONTH, i);
            Date date = cal.getTime();
            Map<String, List<String>> history = fetchTaskHistory(userID, date);
            double numComplete = (double) history.get("complete").size();
            double numIncomplete = (double) history.get("incomplete").size();
            summary.get("week").add((int) Math.ceil(100 * numComplete / (numComplete + numIncomplete)));
        }

        return summary;
    }

    public String deleteTask(String userID, String taskID) {
        // Update task end date to start of today
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        Date date = cal.getTime();

        DocumentReference taskRef = db.collection("tasks").document(taskID);
        ApiFuture<WriteResult> updateTask = taskRef.update("endDate", date);
        try {
            updateTask.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "Failure";
        }

        // Update today's task history if applicable
        DateFormat dateFormat = new SimpleDateFormat("MMddyyyy");
        String dateString = dateFormat.format(date);

        DocumentReference taskHistoryRef = db.collection("users").document(userID).collection("taskHistory")
                .document(dateString);
        ApiFuture<DocumentSnapshot> taskHistoryFuture = taskHistoryRef.get();
        DocumentSnapshot taskHistoryDoc;
        try {
            taskHistoryDoc = taskHistoryFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        if (taskHistoryDoc.exists()) {
            Map<String, List<String>> newHistory = new HashMap<>();
            Map<String, Object> taskHistoryObject = taskHistoryDoc.getData();
            for (String key : taskHistoryObject.keySet()) {
                newHistory.put(key, (List<String>) taskHistoryObject.get(key));
                newHistory.get(key).remove(taskID);
            }
            ApiFuture<WriteResult> updateHistory = taskHistoryRef.set(newHistory);
            try {
                updateHistory.get();
            } catch (Exception e) {
                e.printStackTrace();
                return "Failure";
            }
        }

        return "Success";
    }

    // Allison
    public String taskDone(String userID, String taskID) {
        Date today = new Date();
        DateFormat dateFormat = new SimpleDateFormat("MMddyyyy");
        String strToday = dateFormat.format(today);

        DocumentReference taskHistoryRef = db.collection("users").document(userID).collection("taskHistory")
                .document(strToday);
        ApiFuture<DocumentSnapshot> taskHistoryFuture = taskHistoryRef.get();
        DocumentSnapshot taskHistoryDoc;
        try {
            taskHistoryDoc = taskHistoryFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        Map<String, Object> taskHistory;
        if (taskHistoryDoc.exists()) {
            taskHistory = taskHistoryDoc.getData();
        } else {
            // New task history
            taskHistory = new HashMap<>();
            taskHistory.put("complete", new ArrayList<>());
            taskHistory.put("incomplete", fetchTaskIdsByDate(userID, today));
        }

        List<String> complete = (List<String>) taskHistory.get("complete");
        List<String> incomplete = (List<String>) taskHistory.get("incomplete");

        // Toggle task done
        if (complete.contains(taskID)) {
            complete.remove(taskID);
            incomplete.add(taskID);
        } else {
            complete.add(taskID);
            incomplete.remove(taskID);
        }

        ApiFuture<WriteResult> updateHistory = taskHistoryRef.set(taskHistory);

        try {
            updateHistory.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
        return "success";
    }

    /**
     * Fetches list of all taskIds of all tasks that were active on given date for
     * given user
     * 
     * @param userID
     * @param date
     * @return
     */
    public List<String> fetchTaskIdsByDate(String userID, Date date) {
        List<String> taskIds = new ArrayList<>();

        ApiFuture<DocumentSnapshot> dsFutureTask = db.collection("users").document(userID).get();
        DocumentSnapshot dsTask;
        try {
            dsTask = dsFutureTask.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        List<String> tasks = (List<String>) dsTask.get("taskIds");
        for (String newtaskID : tasks) {
            ApiFuture<DocumentSnapshot> dsFutureCurr = db.collection("tasks").document(newtaskID).get();
            DocumentSnapshot dsCurr;
            try {
                dsCurr = dsFutureCurr.get();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
            Date startDate = dsCurr.get("startDate", Date.class);
            Date endDate = dsCurr.get("endDate", Date.class);

            // check if current date is between startDate and endDate
            if ((date.after(startDate) && date.before(endDate)) ||
                    date.equals(startDate) || date.equals(endDate)) {
                taskIds.add(newtaskID);
            }
        }
        return taskIds;
    }

    /**
     * Fetches taskHistory subcollection for given userID on given dateString
     * 
     * @param userID
     * @param date   dateString formatted as MMDDYYYY
     * @return
     */
    public Map<String, List<String>> fetchTaskHistory(String userID, Date date) {
        DateFormat dateFormat = new SimpleDateFormat("MMddyyyy");
        String dateString = dateFormat.format(date);

        DocumentReference taskHistoryRef = db.collection("users").document(userID).collection("taskHistory")
                .document(dateString);
        ApiFuture<DocumentSnapshot> taskHistoryFuture = taskHistoryRef.get();
        DocumentSnapshot taskHistoryDoc;
        try {
            taskHistoryDoc = taskHistoryFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        Map<String, List<String>> taskHistory = new HashMap<>();
        if (taskHistoryDoc.exists()) {
            Map<String, Object> taskHistoryObject = taskHistoryDoc.getData();
            for (String key : taskHistoryObject.keySet()) {
                taskHistory.put(key, (List<String>) taskHistoryObject.get(key));
            }
        } else {
            // taskHistory for this date doesn't exist, so no tasks have been completed.
            // So, we compute the tasks that were active during that date.
            taskHistory.put("complete", new ArrayList<>());
            taskHistory.put("incomplete", fetchTaskIdsByDate(userID, date));
        }

        return taskHistory;
    }

    /**
     * Creates a post in the firestore database, with no comments, no likes and as a
     * date the current timestamp
     * 
     * @param userID   the document id of the user
     * @param taskID   the document id of the task, can be null if no task
     *                 associated with the post
     * @param postText the text of the post
     * @return the document id of the newly created post
     */
    public String createPost(String userID, String taskID, String postText) {

        DocumentReference userRef = db.collection("users").document(userID);

        // Create a new Post with current information
        Post post = new Post(
                userID,
                taskID,
                postText,
                new ArrayList<>(),
                new ArrayList<>(),
                new Date());

        // Creating a new doc for the post
        ApiFuture<DocumentReference> futurePostRef = db.collection("posts").add(post);
        DocumentReference postRef;
        try {
            postRef = futurePostRef.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        // Get the user document
        ApiFuture<DocumentSnapshot> userSnapshotFuture = userRef.get();
        DocumentSnapshot userSnapshot;
        try {
            userSnapshot = userSnapshotFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        User user = userSnapshot.toObject(User.class);

        user.addPost(postRef.getId());
        ApiFuture<WriteResult> updateUser = userRef.set(user);
        try {
            updateUser.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
        return postRef.getId();
    }

    // Giannis
    public String createUser(String UID) {
        // Get information through authentication page
        UserRecord userRecord;
        try {
            userRecord = FirebaseAuth.getInstance().getUser(UID);
        } catch (Exception e) {
            return "Error! Could not find user based on UID";
        }

        // Create new User object
        User user = new User(
                userRecord.getDisplayName(),
                userRecord.getEmail(),
                "User",
                0,
                new ArrayList<>(),
                new ArrayList<>(),
                new HashMap<>(),
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>());

        // Insert user to the User table

        ApiFuture<WriteResult> resultApiFuture = db.collection("users").document(UID).set(user);
        try {
            resultApiFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "FAILURE";
        }

        return "SUCCESS";
    }

    public User fetchUser(String UID) {
        DocumentReference dr = db.collection("users").document(UID);
        ApiFuture<DocumentSnapshot> dsFuture = dr.get();
        DocumentSnapshot ds;
        try {
            ds = dsFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        User user = ds.toObject(User.class);
        return user;
    }

    /**
     * Creates a comment in the firestore database with no likes
     * 
     * @param userID the document id of the user
     * @param text   the text of the post
     * @return the document id of the newly created comment
     */
    public String createComment(String userID, String text) {
        DocumentReference userRef = db.collection("users").document(userID);

        // Populating the fields
        Map<String, Object> commentData = new HashMap<>();
        commentData.put("user", userRef);
        commentData.put("text", text);
        commentData.put("likes", new DocumentReference[] {});

        // Creating a new doc for the comment
        ApiFuture<DocumentReference> futureCommentRef = db.collection("comments").add(commentData);
        DocumentReference commentRef;
        try {
            commentRef = futureCommentRef.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        // Adding the comment to the user document
        ApiFuture<WriteResult> updateUser = userRef.update("comments", FieldValue.arrayUnion(commentRef.getId()));
        try {
            updateUser.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
        return commentRef.getId();
    }

    /**
     * fetches every post in the firestore database
     * 
     * @return every post
     */
    public List<Post> fetchPosts() {
        CollectionReference cr = db.collection("posts");
        List<Post> posts = new ArrayList<>();
        for (DocumentReference dr : cr.listDocuments()) {
            posts.add(fetchPost(dr.getId()));
        }
        return posts;
    }

    /**
     * Fetches the post corresponding to a certain ID from the firestore database
     * 
     * @param postID the document id of the post
     * @return the Post
     */
    public Post fetchPost(String postID) {
        DocumentReference dr = db.collection("posts").document(postID);
        ApiFuture<DocumentSnapshot> dsFuture = dr.get();
        DocumentSnapshot ds;
        try {
            ds = dsFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        Post post = ds.toObject(Post.class);
        return post;
    }

    /**
     * Fetches the task with a specific taskid
     * 
     * @param taskID the task document id
     * @return the task from the database
     */
    // fetch task with just taskID - not needed
    public Task fetchTask(String taskID) {
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("tasks").document(taskID).get();
        DocumentSnapshot ds;
        try {
            ds = dsFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        Task task = ds.toObject(Task.class);

        return task;
    }

    // test method, delete later
    public List<Task> fetchTaskWithUserID(String userID) {
        List<Task> fetchedTasks = new ArrayList<>();
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("users").document(userID).get();
        DocumentSnapshot ds;
        try {
            ds = dsFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        List<String> tasks = (List<String>) ds.get("taskIds");
        for (String taskID : tasks) {
            ApiFuture<DocumentSnapshot> dsFutureCurr = db.collection("tasks").document(taskID).get();
            DocumentSnapshot dsCurr;
            try {
                dsCurr = dsFutureCurr.get();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
            fetchedTasks.add(dsCurr.toObject(Task.class));
        }
        return fetchedTasks;
    }

    /**
     * Fetches the task with a specific taskid
     * 
     * @param userID the user id
     * @param scope  the scope of tasks to return (i.e. "today", "all", etc)
     * @return the task from the database
     */
    public Map<String, Task> fetchAllTasks(String userID) {
        Map<String, Task> fetchedTasks = new HashMap<>();
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("users").document(userID).get();
        DocumentSnapshot ds;
        try {
            ds = dsFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        List<String> tasks = (List<String>) ds.get("taskIds");
        for (String taskID : tasks) {
            ApiFuture<DocumentSnapshot> dsFutureCurr = db.collection("tasks").document(taskID).get();
            DocumentSnapshot dsCurr;
            try {
                dsCurr = dsFutureCurr.get();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
            fetchedTasks.put(taskID, dsCurr.toObject(Task.class));

            // Date startDate = dsCurr.get("startDate", Date.class);
            // Date endDate = dsCurr.get("endDate", Date.class);

            // if (scope.equals("all")) {
            // fetchedTasks.put(taskID, dsCurr.toObject(Task.class));

            // } else if (scope.equals("today")) {
            // Date current = new Date();
            // if ((current.after(startDate) && current.before(endDate)) ||
            // current.equals(startDate) || current.equals(endDate)) {
            // fetchedTasks.put(taskID, dsCurr.toObject(Task.class));
            // }
            // }
        }

        return fetchedTasks;
    }

    /**
     * Fetches the comment with a specific comment id
     * 
     * @param commentID the comment document id
     * @return the comment from the database
     */
    public Comment fetchComment(String commentID) {
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("comments").document(commentID).get();
        DocumentSnapshot ds = null;
        try {
            ds = dsFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        Comment comment = ds.toObject(Comment.class);
        return comment;
    }

    public void deletePost(String postID) {
        ApiFuture<WriteResult> writeResult = db.collection("posts").document(postID).delete();
        try {
            writeResult.get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

    }

    // public void deleteTask(String taskID){
    // ApiFuture<WriteResult> writeResult =
    // db.collection("tasks").document(taskID).delete();
    // try {
    // writeResult.get();
    // } catch (InterruptedException e) {
    // e.printStackTrace();
    // } catch (ExecutionException e) {
    // e.printStackTrace();
    // }

    // }

}
