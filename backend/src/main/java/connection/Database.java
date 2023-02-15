package connection;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
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
    public String createTask(String userID, Task taskID, String name, String category, int priority, boolean completed, int estimationTime, boolean repeated, Frequency frequency, boolean privateTask, Date deadline){
        DocumentReference userRef = db.collection("users").document(userID);

        // Populating the fields
        Map<String, Object> taskData = new HashMap<>();
        taskData.put("user_id", userID);
        taskData.put("task_id", taskID);
        taskData.put("name", name);
        taskData.put("category", category);
        taskData.put("priority", priority);
        taskData.put("completed", completed);
        taskData.put("estimationTime", estimationTime);
        taskData.put("repeated", repeated);
        taskData.put("frequency", frequency);
        taskData.put("privateTask", privateTask);
        taskData.put("deadline", deadline);

        // Creating a new doc for the post
        ApiFuture<DocumentReference> futureTaskRef = db.collection("tasks").add(taskData);
        DocumentReference taskRef;
        try{
            taskRef = futureTaskRef.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        // Adding the post to the user document
        ApiFuture<WriteResult> updateUser = userRef.update("tasks", FieldValue.arrayUnion(taskRef.getId()));
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
       ApiFuture<DocumentSnapshot> dsFuture = db.collection("tasks").document(taskID).get();
        DocumentSnapshot ds = null;
        try{
            ds = dsFuture.get();
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }

        DocumentReference userRef = db.collection("users").document(userID);

        // Populating the fields
        Map<String, Object> taskData = new HashMap<>();
        taskData.put("user_id", ds.getString("user"));
        taskData.put("task_id", taskID);
        taskData.put("name", ds.getString("name"));
        taskData.put("category", ds.getString("category"));
        taskData.put("priority", ds.get("priority", int.class));
        taskData.put("completed", true);
        taskData.put("estimationTime", 0);
        taskData.put("repeated",  ds.get("repeated", boolean.class));
        taskData.put("frequency", ds.get("frequency", Frequency.class));
        taskData.put("privateTask", ds.get("private", boolean.class));
        taskData.put("deadline", ds.get("deadline", Date.class));

        // Creating a new doc for the post
        ApiFuture<DocumentReference> futureTaskRef = db.collection("tasks").add(taskData);
        DocumentReference taskRef;
        try{
            taskRef = futureTaskRef.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        // Adding the post to the user document
        ApiFuture<WriteResult> updateUser = userRef.update("tasks", FieldValue.arrayUnion(taskRef.getId()));
        try{
            updateUser.get();
        } catch(Exception e){
            e.printStackTrace();
            return "";
        }
        return taskRef.getId();
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
                LocalDateTime.now());


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

        user.addTask(taskID);
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
    public User fetchUser(String UID){
        throw new RuntimeException("Not implemented yet");
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
        String userID = ds.getString("userID");
        String text = ds.getString("text");
        DocumentReference[] commentRefs = ds.get("comments", DocumentReference[].class);
        List<String> commentIds = new ArrayList<>();
        for(DocumentReference commentRef : commentRefs){
            commentIds.add(commentRef.getId());
        }
        List<String> userLikeIds = new ArrayList<>();
        DocumentReference[] likes = ds.get("likes", DocumentReference[].class);
        for(DocumentReference postLikesRef : likes){
            userLikeIds.add(postLikesRef.getId());
        }
        LocalDateTime postDate = ds.get("date", LocalDateTime.class);
        String taskId = ds.get("task", DocumentReference.class).getId();
        return new Post(
                userID,
                taskId,
                text,
                commentIds,
                userLikeIds,
                postDate);
    }

    /**
     * Fetches the task with a specific taskid
     * @param taskID the task document id
     * @return the task from the database
     */
    public Task fetchTask(String taskID){
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("tasks").document(taskID).get();
        DocumentSnapshot ds;
        try{
            ds = dsFuture.get();
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
        String userID = ds.getString("user");
        String category = ds.getString("category");
        Date deadline = ds.get("deadline", Date.class);
        boolean done = ds.get("done", boolean.class);
        String name = ds.getString("name");
        int priority = ds.get("priority", int.class);
        boolean privateTask = ds.get("private", boolean.class);
        Frequency frequency = ds.get("frequency", Frequency.class);
        int time_to_complete = ds.get("time_to_complete", int.class);
        return new Task(
                userID,
                name,
                category,
                priority,
                done,
                time_to_complete,
                frequency != null,
                frequency,
                privateTask,
                deadline
        );
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
        String userID = ds.get("user", String.class);
        String text = ds.get("text", String.class);
        DocumentReference[] commentLikes = ds.get("likes", DocumentReference[].class);
        List<String> commentLikesIds = new ArrayList<>();
        for(DocumentReference dr : commentLikes){
            commentLikesIds.add(dr.getId());
        }
        return new Comment(text, userID, commentLikesIds);
    }

}
