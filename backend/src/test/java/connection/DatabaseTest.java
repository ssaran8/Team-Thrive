package connection;

import datastructures.User;
import datastructures.calendar.Frequency;
import datastructures.calendar.Task;
import datastructures.community.Post;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

public class DatabaseTest {

    Database db = Database.connectFirestore();

    @Test
    public void testFetchUser(){
        User test = db.fetchUser("giannis");
        Assertions.assertEquals(test.getName(), "giannis");
        Assertions.assertTrue(test.getBadges().isEmpty());
        Assertions.assertTrue(test.getEvents().isEmpty());
        Assertions.assertTrue(test.getFriends().isEmpty());
        Assertions.assertTrue(test.getRewardPoints() == 0);
        Assertions.assertEquals(test.getTitle(), "CS student");
    }

    @Test
    public void testCreatePost(){
        String userId = "exampleUser";
        String taskId = "exampleTask";
        String postText = "This is the example post test";
        db.createPost(userId, taskId, postText);
        List<Post> test = db.fetchPosts();
        boolean postCreated = false;
        for(Post p : test){
            if(p.getAuthor().equals(userId) &&
                    p.getTaskId().equals(taskId) &&
                    p.getText().equals(postText)){
                postCreated = true;
            }
        }
        Assertions.assertTrue(postCreated);
    }

    @Test
    public void testFetchPosts(){
        db.createPost("exampleUser1", "exampleTask1", "examplePost1");
        db.createPost("exampleUser2", "exampleTask2", "examplePost2");
        db.createPost("exampleUser3", "exampleTask3", "examplePost3");
        List<Post> posts = db.fetchPosts();
        int contained = 0;
        for(Post p : posts){
            if(p.getAuthor().equals("exampleUser1") && p.getTaskId().equals("exampleTask1") && p.getText().equals("examplePost1"))
                contained++;
            if(p.getAuthor().equals("exampleUser2") && p.getTaskId().equals("exampleTask2") && p.getText().equals("examplePost2"))
                contained++;
            if(p.getAuthor().equals("exampleUser3") && p.getTaskId().equals("exampleTask3") && p.getText().equals("examplePost3"))
                contained++;
        }
        Assertions.assertEquals(contained, 3);
    }
    @Test
    public void testSaveUser(){
        User u = new User("giannis", "CS student", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), 0, new ArrayList<>());
        db.saveUser(u);
        User test = db.fetchUser("giannis");
        Assertions.assertTrue(u.equals(test));
    }

    @Test
    public void testSaveTask(){
        User u = db.fetchUser("giannis");
        Task t = new Task(userId, taskId, "todo", category, 0, false, 60, false, Frequency.DAILY, privateTask, deadline);
        db.saveTask(u, t);
        User test = db.fetchUser("giannis");
        Assertions.assertTrue(test.getTasks().contains(t));
    }

    @Test
    public void testTaskDone(){
        User u = db.fetchUser("giannis");
        Task t = new Task(userId, taskId, "todo", category, 0, false, 60, false, Frequency.DAILY, privateTask, deadline);
        Task finished_t = new Task(userId, taskId, "todo", category, 0, true, 0, false, Frequency.DAILY, privateTask, deadline);
        db.saveTask(u, t);
        db.taskDone(u, t);
        User test = db.fetchUser("giannis");
        Assertions.assertTrue(test.getTasks().contains(finished_t));
    }
    
    @Test
    public void testCreateComment(){
        User u = db.fetchUser("giannis");
        Comment c = new Comment(userId, "comment");
        db.createComment(u, c);
        User test = db.fetchUser("giannis");
        Assertions.assertTrue(test.getComments().contains(c));        
    }
}
