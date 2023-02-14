package datastructures.community;

import java.util.Date;
import java.util.List;

public class Post {

    private final String authorID;
    private final List<String> commentIds;
    private final Date datePosted;
    private final List<String> likesUserIds;
    private final String taskId;
    private final String text;

    public Post(String authorID, List<String> comments, Date datePosted, List<String> likes, String task, String text) {
        this.authorID = authorID;
        this.commentIds = comments;
        this.datePosted = datePosted;
        this.likesUserIds = likes;
        this.taskId = task;
        this.text = text;
    }


    public void addLike(String u){
        likesUserIds.add(u);
    }

    public void removeLike(String u){
        likesUserIds.remove(u);
    }

    public void addComment(String c){
        commentIds.add(c);
    }

    public void removeComment(String c){
        commentIds.remove(c);
    }

    public String getAuthor() {
        return authorID;
    }

    public List<String> getCommentIds() {
        return commentIds;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public List<String> getLikesUserIds() {
        return likesUserIds;
    }

    public String getTaskId() {
        return taskId;
    }

    public String getText() {
        return text;
    }
}
