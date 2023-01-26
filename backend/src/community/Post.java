package community;

import java.nio.file.ProviderNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Post {
  private final String text;
  private final Task task;
  private final User author;
  private final List<Comment> comments = new ArrayList<>();
  private final int likes = 0;

  public Post(String text, Task task, User author){
    this.text = text;
    this.task = task;
    this.author = author;
  }

  public String getText(){
    return text;
  }

  public Task getTask(){
    return task;
  }

  public User getAuthor(){
    return author;
  }

  public List<Comment> getComments(){
    return Collections.unmodifiableList(comments);
  }

  public void addComment(User commenter, String comment){
    comments.add(new Comment(commenter, comment));
  }

  public void like(){
    likes += 1;
  }

  public void removeLike(){
    if(likes > 0){
        likes -= 1;
    }
  }

}
