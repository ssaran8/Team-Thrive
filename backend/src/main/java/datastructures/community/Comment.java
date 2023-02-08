package java.datastructures.community;

import java.datastructures.User;

import java.util.List;

public class Comment {
    private final String text;
    private final User user;
    private List<User> likes;

    public Comment(String text, User user, List<User> likes) {
        this.text = text;
        this.user = user;
        this.likes = likes;
    }

    public String getText() {
        return text;
    }

    public User getUser() {
        return user;
    }

    public List<User> getLikes() {
        return likes;
    }

    public void addLike(User u){
        likes.add(u);
    }

    public void removeLike(User u){
        likes.remove(u);
    }
}
