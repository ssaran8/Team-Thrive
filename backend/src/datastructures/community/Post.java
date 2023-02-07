package datastructures.community;

import datastructures.User;
import datastructures.calendar.Task;

import java.util.Date;
import java.util.List;

public class Post {

    private final User author;
    private final List<Comment> comments;
    private final Date datePosted;
    private final List<User> likes;
    private final Task task;
    private final String text;

    public Post(User author, List<Comment> comments, Date datePosted, List<User> likes, Task task, String text) {
        this.author = author;
        this.comments = comments;
        this.datePosted = datePosted;
        this.likes = likes;
        this.task = task;
        this.text = text;
    }


    public void addLike(User u){
        likes.add(u);
    }

    public void removeLike(User u){
        likes.remove(u);
    }

    public void addComment(Comment c){
        comments.add(c);
    }

    public void removeComment(Comment c){
        comments.remove(c);
    }

    public User getAuthor() {
        return author;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public List<User> getLikes() {
        return likes;
    }

    public Task getTask() {
        return task;
    }

    public String getText() {
        return text;
    }
}
