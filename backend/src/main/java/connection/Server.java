package connection;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import javax.xml.crypto.Data;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class Server {
    public static void main(String[] args) throws Exception {

        Database db = Database.connectFirestore();
        Spark.init();
        Spark.get("/createPost", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                String userID = request.queryParams("uid");
                String taskID = request.queryParams("tid");
                String postText = request.queryParams("text");
                String postID = db.createPost(userID, taskID, postText);
                Gson gson = new Gson();
                return gson.toJson(postID);
            }
        });
    }
}
