package community;

public class Comment {
    private final String text;
    private final User user;
    private int likes;

    public Comment(String text, User user, int likes) {
        this.text = text;
        this.user = user;
        this.likes = likes;
    }

}
