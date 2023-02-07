package community;

import Calendar.Task;

import java.util.Date;
import java.util.List;

public class Post {
    private final User author;
    private final List<Comment> comments;
    private final Date datePosted;
    private int likes;
    private final Task task;
    private final String text;

    public Post(User author, List<Comment> comments, Date datePosted, int likes, Task task, String text) {
        this.author = author;
        this.comments = comments;
        this.datePosted = datePosted;
        this.likes = likes;
        this.task = task;
        this.text = text;
    }
}
