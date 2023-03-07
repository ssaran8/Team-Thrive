package connection.posts;

public class NewPost {
    private String uid;
    private String post;

    public String getUid() {
        return uid;
    }

    public String getPost() {
        return post;
    }

    public NewPost(String uid, String post) {
        this.uid = uid;
        this.post = post;
    }
}
