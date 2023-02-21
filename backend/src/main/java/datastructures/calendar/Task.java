package datastructures.calendar;

import java.time.LocalDateTime;
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

    private final LocalDateTime deadline;

    public String getUserId() {
        return userId;
    }

    public boolean isPrivateTask() {
        return privateTask;
    }

    public String getCategory() {
        return category;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public Task(String userId, String name, String category, int priority, boolean completed, int estimationTime, boolean repeated, Frequency frequency, boolean privateTask, LocalDateTime deadline) {
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

    public String getName() {
        return name;
    }

    public int getPriority() {
        return priority;
    }

    public boolean isCompleted() {
        return completed;
    }

    public int getEstimationTime() {
        return estimationTime;
    }

    public boolean isRepeated() {
        return repeated;
    }

    public Frequency getFrequency() {
        return frequency;
    }
}
