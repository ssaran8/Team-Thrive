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
                    p.getTask().getTaskId().equals(taskId) &&
                    p.getText().equals(postText)){
                postCreated = true;
            }
        }
        Assertions.assertTrue(postCreated);
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
        Task t = new Task(taskId, "todo", 0, false, 60, false, Frequency.DAILY);
        db.saveTask(u, t);
        User test = db.fetchUser("giannis");
        Assertions.assertTrue(test.getTasks().contains(t));
    }
}
