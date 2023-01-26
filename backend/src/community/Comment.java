package community;

class Comment {
  private final User author;
  private final String text;
  private int likes = 0;

  public Comment(User author, String text){
    this.author = author;
    this.text = text;
  }

  public User getAuthor(){
    return author;
  }

  public String getText(){
    return text;
  }

  public int getLikes(){
    return likes;
  }

  public void liked(){
    likes += 1;
  }

  public void removedLike(){
    likes -= 1;
  }
}
