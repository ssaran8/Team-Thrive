import Calendar.Event;
import Calendar.Task;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import community.Post;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

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

    public Database(Firestore fs) {
        db = fs;
    }

    public void saveTask(Task t){
        throw new RuntimeException("Not implemented yet");
    }

    public List<Task> fetchUserTasks(User u){
        throw new RuntimeException("Not implemented yet");
    }

    public void savePost(Post p){
        throw new RuntimeException("Not implemented yet");
    }

    public List<Post> fetchUserPosts(User u){
        throw new RuntimeException("Not implemented yet");
    }

    public void saveUser(User u){
        throw new RuntimeException("Not implemented yet");
    }

    public User fetchUser(String username){
        throw new RuntimeException("Not implemented yet");
    }

    
}
