package java.connection;

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

import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class Server {
    public static void main(String[] args) throws Exception {
        Spark.get("/path", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                String startBuilding = request.queryParams("start");
                String endBuilding = request.queryParams("end");
                Gson gson = new Gson();
                return gson.toJson(shortestPath);
            }
        });
    }
}
