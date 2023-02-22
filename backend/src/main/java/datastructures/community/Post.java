package datastructures.community;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class Post {

    private String authorId;
    private String taskId;
    private String text;

    private List<String> commentIds;
    private List<String> likesUserIds;

    private Date datePosted;

    public Post(String authorId, String taskId, String text, List<String> commentIds, List<String> likesUserIds, Date datePosted) {
        this.authorId = authorId;
        this.taskId = taskId;
        this.text = text;
        this.commentIds = commentIds;
        this.likesUserIds = likesUserIds;
        this.datePosted = datePosted;

    }

    public Post() {
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<String> getCommentIds() {
        return commentIds;
    }

    public void setCommentIds(List<String> commentIds) {
        this.commentIds = commentIds;
    }

    public List<String> getLikesUserIds() {
        return likesUserIds;
    }

    public void setLikesUserIds(List<String> likesUserIds) {
        this.likesUserIds = likesUserIds;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(Date datePosted) {
        this.datePosted = datePosted;
    }
}
