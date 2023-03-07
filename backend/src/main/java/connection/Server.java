package connection;

import com.google.gson.*;
import datastructures.User;
import datastructures.calendar.Task;
import datastructures.community.Comment;
import datastructures.community.Post;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class Server {
    public static void main(String[] args) throws Exception {

        // Initializes database connection and spark server
        Database db = Database.connectFirestore();
        Spark.init();

        Spark.options("/*",
        (request, response) -> {

            String accessControlRequestHeaders = request
                    .headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers",
                        accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request
                    .headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods",
                        accessControlRequestMethod);
            }

            return "OK";
        });

        Spark.before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));


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

        Spark.post("/createUser", (request, response) -> {
            JsonObject body = JsonParser.parseString(request.body()).getAsJsonObject();
            return db.createUser(body.get("uid").getAsString());
        });


        Spark.get("/fetchUser", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                String uid = request.queryParams("uid");
                User user = db.fetchUser(uid);
                Gson gson = new Gson();
                return gson.toJson(user);
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
            Gson gson = new Gson();

            if (request.queryParams("scope").equals("all")) {
                JsonArray taskList = new JsonArray();
                Map<String, Task> tasks = db.fetchAllTasks(request.queryParams("uid"));
                for (String taskID : tasks.keySet()) {
                    JsonObject taskJson = gson.toJsonTree(tasks.get(taskID)).getAsJsonObject();
                    taskJson.addProperty("taskId", taskID);
                    taskList.add(taskJson);
                }
                return gson.toJson(taskList);
            } else if (request.queryParams("scope").equals("today")) {
                Map<String, List<String>> taskHistory = db.fetchTaskHistory(request.queryParams("uid"), new Date());
                JsonArray taskList = new JsonArray();
                for (String key : taskHistory.keySet()) {
                    boolean done = key.equals("complete");
                    for (String taskID : taskHistory.get(key)) {
                        Task task = db.fetchTask(taskID);
                        JsonObject taskJson = gson.toJsonTree(task).getAsJsonObject();
                        taskJson.addProperty("taskId", taskID);
                        taskJson.addProperty("done", done);
                        taskList.add(taskJson);
                    }
                }
                return gson.toJson(taskList);
            } else {
                return "{ status: \"failure\"}";
            }
        });

        Spark.post("/tasks", (request, response) -> {
            response.type("application/json");
            Task task = new Gson().fromJson(request.body(), Task.class);
            return db.createTask(task.getUserId(), task);
        });

        Spark.post("/taskdone", (request, response) -> {
            response.type("text/html");
            JsonObject body = JsonParser.parseString(request.body()).getAsJsonObject();
            String res = db.taskDone(body.get("uid").getAsString(), body.get("taskId").getAsString());
            return res;
        });

        Spark.get("/tasksummary", (request, response) -> {
            response.type("application/json");
            Map<String, List<Integer>> summary = db.fetchTaskSummary(request.queryParams("uid"));
            return new Gson().toJson(summary);
        });

        Spark.post("/deletetask", (request, response) -> {
            response.type("text/html");
            JsonObject body = JsonParser.parseString(request.body()).getAsJsonObject();
            String res = db.deleteTask(body.get("uid").getAsString(), body.get("taskId").getAsString());
            return res;
        });    
    }
}
