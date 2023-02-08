package java.datastructures.calendar;

public class Task {
    private final String name;
    private final int priority;
    private boolean completed;
    private final int estimationTime;
    private final boolean repeated;
    private final Frequency frequency;

    public Task(String name, int priority, boolean completed, int estimationTime, boolean repeated, Frequency frequency) {
        this.name = name;
        this.priority = priority;
        this.completed = completed;
        this.estimationTime = estimationTime;
        this.repeated = repeated;
        this.frequency = frequency;
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
