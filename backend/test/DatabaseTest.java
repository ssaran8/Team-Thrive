import app.Database;
import datastructures.User;
import datastructures.calendar.Frequency;
import datastructures.calendar.Task;
import datastructures.community.Post;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
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
    public void testSavePost(){
        User u = db.fetchUser("giannis");
        Post p = new Post(u, List.of(), new Date(2023, 9, 12), List.of(), null, "nice post");
        db.savePost(u, p);
        User test = db.fetchUser("giannis");
        Assertions.assertTrue(test.getPosts().contains(p));
    }

    @Test
    public void testSaveUser(){
        User u = new User("giannis", "CS student", List.of(), List.of(), List.of(),
                List.of(), 0, List.of());
        db.saveUser(u);
        User test = db.fetchUser("giannis");
        Assertions.assertTrue(u.equals(test));
    }

    @Test
    public void testSaveTask(){
        User u = db.fetchUser("giannis");
        Task t = new Task("todo", 0, false, 60, false, Frequency.DAILY);
        db.saveTask(u, t);
        User test = db.fetchUser("giannis");
        Assertions.assertTrue(test.getTasks().contains(t));
    }
}
