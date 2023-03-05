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

    public static Database connectFirestore(){
        try{
            FileInputStream serviceAccount =
                    new FileInputStream("res/thrive-b3588-firebase-adminsdk-ooykn-60a3497bd1.json");

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
    public String createTask(String userId, String name, String category, int priority, int estimationTime, Frequency frequency, boolean privateTask, Date startDate, Date endDate){
        // Create a new Task with current information
        Task task = new Task (
                userId,
                name,
                category,
                priority,
                false,
                estimationTime,
                frequency,
                privateTask,
                startDate,
                endDate
                //daysOfWeek
        );
        return createTask(userId, task);
    }

    public String createTask(String userId, Task task) {
        DocumentReference userRef = db.collection("users").document(userId);

        // Creating a new doc for the post
        ApiFuture<DocumentReference> futureTaskRef = db.collection("tasks").add(task);
        DocumentReference taskRef;
        try{
            taskRef = futureTaskRef.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        // Get the user document
        ApiFuture<DocumentSnapshot> userSnapshotFuture = userRef.get();
        DocumentSnapshot userSnapshot;
        try{
            userSnapshot = userSnapshotFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        User user = userSnapshot.toObject(User.class);

        // Adding the task to the user document
        user.addTask(taskRef.getId());
        ApiFuture<WriteResult> updateUser = userRef.set(user);
        try{
            updateUser.get();
        } catch(Exception e){
            e.printStackTrace();
            return "";
        }
        return taskRef.getId();
    }

    // do later
    public void saveEvent(String UID, Event e){
        throw new RuntimeException("Not implemented yet");
    }

    // Allison
    public String taskDone(String userID, String taskID){
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("users").document(userID).get();
        DocumentSnapshot ds = null;
        try{
            ds = dsFuture.get();
        } catch(Exception e){
            e.printStackTrace();
            return "";
        }

        Map<String, Map<String, List<String>>> taskHistory = (Map<String, Map<String, List<String>>>) ds.get("taskHistory");
        Date today = new Date();
        DateFormat dateFormat = new SimpleDateFormat("MMddyyyy");
        String strToday = dateFormat.format(today);

        if (taskHistory == null) {
            taskHistory = new HashMap<>();
        }

        // if today already exists in task history
        if (taskHistory.containsKey(strToday)) {
            Map<String, List<String>> lists = taskHistory.get(strToday);
            lists.get("complete").add(taskID);
        } else { // if today does not exist in task history
            Map<String, List<String>> lists = new HashMap<>();
            List<String> complete = new ArrayList<>();
            List<String> incomplete = new ArrayList<>();
            complete.add(taskID);

            //get list of today's tasks IDs
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

                Date current = new Date();
                // check if current date is between startDate and endDate
                if ((current.after(startDate) && current.before(endDate)) ||
                        current.equals(startDate) || current.equals(endDate)) {
                    if (!newtaskID.equals(taskID)) {
                        incomplete.add(newtaskID);
                    }
                }
            }
            lists.put("complete", complete);
            lists.put("incomplete", incomplete);
            taskHistory.put(strToday, lists);
        }

        // Adding the post to the user document
        DocumentReference userRef = db.collection("users").document(userID);
        ApiFuture<WriteResult> updateUser = userRef.update("taskHistory", taskHistory);
        try{
            updateUser.get();
        } catch(Exception e){
            e.printStackTrace();
            return "";
        }
        return "success";
    }

    /**
     * Creates a post in the firestore database, with no comments, no likes and as a date the current timestamp
     * @param userID the document id of the user
     * @param taskID the document id of the task, can be null if no task associated with the post
     * @param postText the text of the post
     * @return the document id of the newly created post
     */
    public String createPost(String userID, String taskID, String postText){

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
        try{
            postRef = futurePostRef.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        // Get the user document
        ApiFuture<DocumentSnapshot> userSnapshotFuture = userRef.get();
        DocumentSnapshot userSnapshot;
        try{
            userSnapshot = userSnapshotFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        User user = userSnapshot.toObject(User.class);

        user.addPost(postRef.getId());
        ApiFuture<WriteResult> updateUser = userRef.set(user);
        try{
            updateUser.get();
        } catch(Exception e){
            e.printStackTrace();
            return "";
        }
        return postRef.getId();
    }

    // Giannis
    public String createUser(String UID){
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
        try{
             resultApiFuture.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "FAILURE";
        }

        return "SUCCESS";
    }

    public User fetchUser(String UID){
        DocumentReference dr = db.collection("users").document(UID);
        ApiFuture<DocumentSnapshot> dsFuture = dr.get();
        DocumentSnapshot ds;
        try{
            ds = dsFuture.get();
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
        User user = ds.toObject(User.class);
        return user;
    }

    /**
     * Creates a comment in the firestore database with no likes
     * @param userID the document id of the user
     * @param text the text of the post
     * @return the document id of the newly created comment
     */
    public String createComment(String userID, String text){
        DocumentReference userRef = db.collection("users").document(userID);

        // Populating the fields
        Map<String, Object> commentData = new HashMap<>();
        commentData.put("user", userRef);
        commentData.put("text", text);
        commentData.put("likes", new DocumentReference[]{});

        // Creating a new doc for the comment
        ApiFuture<DocumentReference> futureCommentRef = db.collection("comments").add(commentData);
        DocumentReference commentRef;
        try{
            commentRef = futureCommentRef.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        // Adding the comment to the user document
        ApiFuture<WriteResult> updateUser = userRef.update("comments", FieldValue.arrayUnion(commentRef.getId()));
        try{
            updateUser.get();
        } catch(Exception e){
            e.printStackTrace();
            return "";
        }
        return commentRef.getId();
    }

    /**
     * fetches every post in the firestore database
     * @return every post
     */
    public List<Post> fetchPosts(){
        CollectionReference cr = db.collection("posts");
        List<Post> posts = new ArrayList<>();
        for(DocumentReference dr : cr.listDocuments()){
            posts.add(fetchPost(dr.getId()));
        }
        return posts;
    }

    /**
     * Fetches the post corresponding to a certain ID from the firestore database
     * @param postID the document id of the post
     * @return the Post
     */
    public Post fetchPost(String postID){
        DocumentReference dr = db.collection("posts").document(postID);
        ApiFuture<DocumentSnapshot> dsFuture = dr.get();
        DocumentSnapshot ds;
        try{
            ds = dsFuture.get();
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
        Post post = ds.toObject(Post.class);
        return post;
    }

    /**
     * Fetches the task with a specific taskid
     * @param taskID the task document id
     * @return the task from the database
     */
    // fetch task with just taskID - not needed
    public Task fetchTask(String taskID){
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("tasks").document(taskID).get();
        DocumentSnapshot ds;
        try{
            ds = dsFuture.get();
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }

        Task task = ds.toObject(Task.class);

        return task;
    }

    // test method, delete later
    public List<Task> fetchTaskWithUserID(String userID){
        List<Task> fetchedTasks = new ArrayList<>();
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("users").document(userID).get();
        DocumentSnapshot ds;
        try{
            ds = dsFuture.get();
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }

        List<String> tasks = (List<String>) ds.get("taskIds");
        for (String taskID : tasks) {
            ApiFuture<DocumentSnapshot> dsFutureCurr = db.collection("tasks").document(taskID).get();
            DocumentSnapshot dsCurr;
            try{
                dsCurr = dsFutureCurr.get();
            } catch(Exception e){
                e.printStackTrace();
                return null;
            }
            fetchedTasks.add(dsCurr.toObject(Task.class));
        }
        return fetchedTasks;
    }

    /**
     * Fetches the task with a specific taskid
     * @param userID the user id
     * @param scope the scope of tasks to return (i.e. "today", "all", etc)
     * @return the task from the database
     */
    public List<Task> fetchTask(String userID, String scope){
        List<Task> fetchedTasks = new ArrayList<>();
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("users").document(userID).get();
        DocumentSnapshot ds;
        try{
            ds = dsFuture.get();
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }

        List<String> tasks = (List<String>) ds.get("taskIds");
        for (String taskID : tasks) {
            ApiFuture<DocumentSnapshot> dsFutureCurr = db.collection("tasks").document(taskID).get();
            DocumentSnapshot dsCurr;
            try{
                dsCurr = dsFutureCurr.get();
            } catch(Exception e){
                e.printStackTrace();
                return null;
            }
            Date startDate = dsCurr.get("startDate", Date.class);
            Date endDate = dsCurr.get("endDate", Date.class);

            if (scope.equals("all")) {
                fetchedTasks.add(dsCurr.toObject(Task.class));

            } else if (scope.equals("today")) {
                Date current = new Date();
                if ((current.after(startDate) && current.before(endDate)) ||
                        current.equals(startDate) || current.equals(endDate)) {
                    fetchedTasks.add(dsCurr.toObject(Task.class));
                }
            }


        }

        return fetchedTasks;
    }

    /**
     * Fetches the comment with a specific comment id
     * @param commentID the comment document id
     * @return the comment from the database
     */
    public Comment fetchComment(String commentID){
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("comments").document(commentID).get();
        DocumentSnapshot ds = null;
        try{
            ds = dsFuture.get();
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
        Comment comment = ds.toObject(Comment.class);
        return comment;
    }

    public void deletePost(String postID){
        ApiFuture<WriteResult> writeResult = db.collection("posts").document(postID).delete();
        try {
            writeResult.get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

    }

    public void deleteTask(String taskID){
        ApiFuture<WriteResult> writeResult = db.collection("tasks").document(taskID).delete();
        try {
            writeResult.get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

    }

}
