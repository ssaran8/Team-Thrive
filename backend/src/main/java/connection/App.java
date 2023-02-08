package connection;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("Hello, World!");

        // Connect to google firestore
        FileInputStream serviceAccount =
                new FileInputStream("res/thrive-b3588-firebase-adminsdk-ooykn-60a3497bd1.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);
        Firestore db = FirestoreClient.getFirestore();

        // get all users
        ApiFuture<QuerySnapshot> query = db.collection("users").get();


        QuerySnapshot querySnapshot = query.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();

        for (QueryDocumentSnapshot document : documents) {
            System.out.println("main.java.datastructures.User: " + document.getId());
        }

        DocumentReference docRef = db.collection("users").document("giannis");
        Map<String, Object> data = new HashMap<>();
        data.put("name", "Giannis");
        data.put("title", "CS student");
        data.put("points", 1000);
        //asynchronously write data
        ApiFuture<WriteResult> result = docRef.set(data);
        // result.get() blocks on response
        System.out.println("Update time : " + result.get().getUpdateTime());
    }
}
