package connection.posts;

import java.util.Date;

public class SendPost {
    private String username;
    private String content;
    private Date datePosted;
    private String imageURL;

    public String getImageURL() {
        return imageURL;
    }

    public SendPost(String username, String content, Date datePosted, String imageURL) {
        this.username = username;
        this.content = content;
        this.datePosted = datePosted;
        this.imageURL = imageURL;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public SendPost(String username, String content, Date datePosted) {
        this.username = username;
        this.content = content;
        this.datePosted = datePosted;
    }

    public String getUsername() {
        return username;
    }

    public String getContent() {
        return content;
    }

    public SendPost(String username, String content) {
        this.username = username;
        this.content = content;
    }
}
