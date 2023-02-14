package connection;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.firestore.annotation.ServerTimestamp;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

import datastructures.User;
import datastructures.calendar.Event;
import datastructures.calendar.Task;
import datastructures.community.Post;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    // Giannis
    public void saveTask(String UID, Task t){
        throw new RuntimeException("Not implemented yet");
    }

    // Allison
    public void saveEvent(String UID, Event e){
        throw new RuntimeException("Not implemented yet");
    }

    // Mamoun
    public String createPost(String userID, String taskID, String postText){

        DocumentReference userRef = db.collection("users").document(userID);

        // Populating the fields
        Map<String, Object> postData = new HashMap<>();
        postData.put("author", userRef);
        postData.put("comments", new DocumentReference[]{});
        postData.put("date", FieldValue.serverTimestamp());
        postData.put("likes", new DocumentReference[]{});
        postData.put("task", db.collection("tasks").document(taskID));
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
        userRef.update("tasks", FieldValue.arrayUnion(postRef.getId()));
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

    // Mamoun
    public List<Post> fetchPosts(){
        throw new RuntimeException("Not implemented yet");
    }

}
