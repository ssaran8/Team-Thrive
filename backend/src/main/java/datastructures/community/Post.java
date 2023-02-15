package datastructures.community;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class Post {

    private final String authorID;
    private final String taskId;
    private final String text;

    private final List<String> commentIds;
    private final List<String> likesUserIds;

    private final LocalDateTime datePosted;

    public Post(String authorID, String taskId, String text, List<String> commentIds, List<String> likesUserIds, LocalDateTime datePosted) {
        this.authorID = authorID;
        this.taskId = taskId;
        this.text = text;
        this.commentIds = commentIds;
        this.likesUserIds = likesUserIds;
        this.datePosted = datePosted;
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

    public LocalDateTime getDatePosted() {
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
