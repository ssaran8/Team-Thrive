package connection.posts;

import com.google.gson.Gson;
import connection.Database;
import spark.Request;
import spark.Response;
import spark.Route;

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
}
