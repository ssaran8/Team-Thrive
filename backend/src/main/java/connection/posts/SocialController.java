package connection.posts;

import com.google.gson.Gson;
import connection.Database;
import datastructures.User;
import datastructures.community.Post;
import spark.Request;
import spark.Response;
import spark.Route;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SocialController {

    public static Route createPostHandler(Database db){
        return new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                Gson gson = new Gson();
                NewPost newPost = gson.fromJson(request.body(), NewPost.class);
                String postID = db.createPost(newPost.getUid(), "no more taskid", newPost.getPost());
                return gson.toJson(postID);
            }
        };
    }

    public static Route getUserHandler(Database db){
        return new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                String uid = request.queryParams("uid");
                User u = db.fetchUser(uid);
                return u.getName();
            }
        };
    }

    public static Route fetchPostTestHandler(Database db){
        return new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                Post p1 = new Post(
                        "User 1",
                        "taskID",
                        "Post 1",
                        new ArrayList<>(),
                        new ArrayList<>(),
                        new Date());

                Post p2 = new Post(
                        "User 2",
                        "taskID",
                        "Post 2",
                        new ArrayList<>(),
                        new ArrayList<>(),
                        new Date());

                Post p3 = new Post(
                        "User 3",
                        "taskID",
                        "Post 3",
                        new ArrayList<>(),
                        new ArrayList<>(),
                        new Date());

                return new Gson().toJson(List.of(p1, p2, p3));
            }
        };
    }

}
