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
import java.util.*;

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

    // Giannis
    public void saveTask(String UID, Task t){
        throw new RuntimeException("Not implemented yet");
    }

    // Allison
    public void saveEvent(String UID, Event e){
        throw new RuntimeException("Not implemented yet");
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

        // Populating the fields
        Map<String, Object> postData = new HashMap<>();
        postData.put("author", userRef);
        postData.put("comments", new DocumentReference[]{});
        postData.put("date", FieldValue.serverTimestamp());
        postData.put("likes", new DocumentReference[]{});
        postData.put("task", taskID != null ? db.collection("tasks").document(taskID) : null);
        postData.put("text", postText);

        // Creating a new doc for the post
        ApiFuture<DocumentReference> futurePostRef = db.collection("posts").add(postData);
        DocumentReference postRef;
        try{
            postRef = futurePostRef.get();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        // Adding the post to the user document
        ApiFuture<WriteResult> updateUser = userRef.update("tasks", FieldValue.arrayUnion(postRef.getId()));
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

    // Allison
    public void saveComment(String UID, String comment){
        throw new RuntimeException("Not implemented yet");
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
        Date postDate = ds.get("date", Date.class);
        String taskId = ds.get("task", DocumentReference.class).getId();
        return new Post(userID, commentIds, postDate, userLikeIds, taskId, text);
    }

    /**
     * Fetches the task with a specific taskid
     * @param taskID the task document id
     * @return the task from the database
     */
    public Task fetchTask(String taskID){
        ApiFuture<DocumentSnapshot> dsFuture = db.collection("tasks").document(taskID).get();
        DocumentSnapshot ds = null;
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
                taskID,
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
