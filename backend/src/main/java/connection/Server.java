package connection;

import com.google.gson.Gson;
import datastructures.calendar.Task;
import datastructures.community.Comment;
import datastructures.community.Post;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import java.util.List;


public class Server {
    public static void main(String[] args) throws Exception {

        // Initializes database connection and spark server
        Database db = Database.connectFirestore();
        Spark.init();

        // Create post api call, needs 3 parameters :
        // uid (user document id), tid (task document id), text (post text)
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

        // Fetch post api call, needs 1 parameter :
        // pid (post document id)
        Spark.get("/fetchPost", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                String postID = request.queryParams("pid");
                Post post = db.fetchPost(postID);
                Gson gson = new Gson();
                return gson.toJson(post);
            }
        });

        // Fetch every post uploaded api call
        Spark.get("/fetchPosts", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                Gson gson = new Gson();
                return gson.toJson(db.fetchPosts());
            }
        });

        // Fetch task api call, needs 1 parameter:
        // tid (task document id)
        Spark.get("/fetchTask", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                String taskID = request.queryParams("tid");
                Task task = db.fetchTask(taskID);
                Gson gson = new Gson();
                return gson.toJson(task);
            }
        });

        // Fetch comment api call, needs 1 parameter:
        // cid (comment document id)
        Spark.get("/fetchComment", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                String commentID = request.queryParams("cid");
                Comment comment = db.fetchComment(commentID);
                Gson gson = new Gson();
                return gson.toJson(comment);
            }
        });

        // Fetch tasks api call, needs 2 parameters:
        // uid (user id)
        // scope ("today", "all")
        Spark.get("/tasks", (request, response) -> {
            response.type("application/json");
            List<Task> tasks = db.fetchTask(request.queryParams("uid"),request.queryParams("scope"));
            return new Gson().toJson(tasks);
        });
    }
}
