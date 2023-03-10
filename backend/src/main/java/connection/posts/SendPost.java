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

    @Override
    public String toString(){
        return String.format("Post :/n - username : %s/n- content : %s", username, content);
    }

    @Override
    public boolean equals(Object o){
 
        // If the object is compared with itself then return true 
        if (o == this) {
            return true;
        }
 
        /* Check if o is an instance of Complex or not
          "null instanceof [type]" also returns false */
        if (!(o instanceof SendPost)) {
            return false;
        }
         
        // typecast o to Complex so that we can compare data members
        SendPost s = (SendPost) o;
         
        // Compare the data members and return accordingly
        return username.equals(s.username) && content.equals(s.content);
    
    }
}
