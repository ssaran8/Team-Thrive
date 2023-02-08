package java.datastructures;

import main.java.datastructures.calendar.Event;

import java.datastructures.calendar.Task;
import java.datastructures.community.Post;
import java.util.Date;
import java.util.List;
import java.util.PriorityQueue;

public class User {
    private final String name;
    private final String title;
    private final List<Task> tasks;
    private final List<User> friends;
    private List<Event> events;
    private final List<Post> posts;
    private int rewardPoints;
    private final List<String> badges;

    public static User createNewUser(){
        throw new RuntimeException("Not implemented yet");
    }

    public User(String name, String title, List<Task> tasks, List<User> friends,
                List<Event> events, List<Post> posts, int rewardPoints, List<String> badges) {
        this.name = name;
        this.title = title;
        this.tasks = tasks;
        this.friends = friends;
        this.events = events;
        this.posts = posts;
        this.rewardPoints = rewardPoints;
        this.badges = badges;
    }

    public void addTask(Task task) {
        tasks.add(task);
    }

    public void addEvent(Event event) {
        events.add(event);
    }

    public PriorityQueue<Task> getTaskInPriorityOrder() {
        // convert list to pq?
        throw new RuntimeException("Not implemented yet");

    }

    public List<Event> getEventWeek(Date week_start) {
        // check if start time >= week_start and start time < week_start + 7
        throw new RuntimeException("Not implemented yet");

    }

    public List<Task> getTasks() {
        return tasks;
    }

    public List<Event> getEvents() {
        return events;
    }

    public int getRewardPoints() {
        return rewardPoints;
    }

    public String getName() {
        return name;
    }

    public String getTitle() {
        return title;
    }

    public List<User> getFriends() {
        return friends;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public List<String> getBadges() {
        return badges;
    }
}
