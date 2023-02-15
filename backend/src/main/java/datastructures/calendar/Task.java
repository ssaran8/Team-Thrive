package datastructures.calendar;

import java.util.Date;

public class Task {
    private final String userId;
    private final String name;
    private final String category;

    private final int priority;
    private final int estimationTime;

    private boolean completed;
    private final boolean repeated;
    private final boolean privateTask;

    private final Frequency frequency;

    private final Date deadline;


    public Task(String userId, String name, String category, int priority, boolean completed, int estimationTime, boolean repeated, Frequency frequency, boolean privateTask, Date deadline) {
        this.userId = userId;
        this.name = name;
        this.category = category;
        this.priority = priority;
        this.completed = completed;
        this.estimationTime = estimationTime;
        this.repeated = repeated;
        this.frequency = frequency;
        this.privateTask = privateTask;
        this.deadline = deadline;
    }

}
