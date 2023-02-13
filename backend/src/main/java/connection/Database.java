package connection;

import java.datastructures.User;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

import java.datastructures.calendar.Task;
import java.datastructures.community.Post;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

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
    public void savePost(String UID, Post p){
        throw new RuntimeException("Not implemented yet");
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
