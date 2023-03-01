package datastructures.community;


import java.util.List;

public class Comment {
    private final String text;
    private final String userID;
    private List<String> likes;

    public Comment(String text, String user, List<String> likes) {
        this.text = text;
        this.userID = user;
        this.likes = likes;
    }

    public String getText() {
        return text;
    }

    public String getUserID() {
        return userID;
    }

    public List<String> getLikes() {
        return likes;
    }

    public void addLike(String u){
        likes.add(u);
    }

    public void removeLike(String u){
        likes.remove(u);
    }
}
