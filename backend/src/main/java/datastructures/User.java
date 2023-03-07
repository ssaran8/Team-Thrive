package datastructures;

import datastructures.calendar.Event;
import datastructures.calendar.Task;
import datastructures.community.Post;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class User {
    // private final String name;
    // private final String email;
    // private final String title;

    private String name;
    private String email;
    private String title;

    private int rewardPoints;

    private List<String> badges;

    private List<String> taskIds;
    private Map<String, Map<String, List<String>>> taskHistory;
    private List<String> friendIds;
    private List<String> eventIds;
    private List<String> postIds;

    public static User createNewUser() {
        throw new RuntimeException("Not implemented yet");
    }

    public User(String name, String email, String title, int rewardPoints, List<String> badges, List<String> taskIds,
            List<String> friendIds, List<String> postIds) {
        this.name = name;
        this.email = email;
        this.title = title;
        this.rewardPoints = rewardPoints;
        this.badges = badges;
        this.taskIds = taskIds;
        this.friendIds = friendIds;
        this.postIds = postIds;
    }

    public User() {

    }

    public List<Event> getEventWeek(Date week_start) {
        // check if start time >= week_start and start time < week_start + 7
        throw new RuntimeException("Not implemented yet");

    }

    public String getName() {
        return name;
    }

    public String getTitle() {
        return title;
    }

    public int getRewardPoints() {
        return rewardPoints;
    }

    public List<String> getTaskIds() {
        return taskIds;
    }

    public Map<String, Map<String, List<String>>> getTaskHistory() {
        return taskHistory;
    }

    public List<String> getFriendIds() {
        return friendIds;
    }

    public List<String> getEventIds() {
        return eventIds;
    }

    public List<String> getPostIds() {
        return postIds;
    }

    public List<String> getBadges() {
        return badges;
    }

    public void addTask(String taskId) {
        taskIds.add(taskId);
    }

    public void addPost(String postId) {
        postIds.add(postId);
    }
}
