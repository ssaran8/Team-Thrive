package datastructures.calendar;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class Task {

    // private final String userId;
    // private final String name;
    // private final String category;
    //
    // private final int priority;
    // private final int estimationTime;
    //
    // private boolean completed;
    // private final boolean privateTask;
    //
    // private final Frequency frequency;
    //
    // private final Date startDate;
    // private final Date endDate;
    // private final int[] daysOfWeek;

    private String userId;
    private String name;
    private String category;

    private boolean privateTask;

    private Frequency frequency;

    private Date startDate;
    private Date endDate;

    private List<Boolean> daysOfWeek;

    public List<Boolean> getDaysOfWeek() {
        return daysOfWeek;
    }

    public Task(String userId, String name, String category, Frequency frequency, boolean privateTask, Date startDate,
            Date endDate, List<Boolean> daysOfWeek) {
        this.userId = userId;
        this.name = name;
        this.category = category;
        this.frequency = frequency;
        this.privateTask = privateTask;
        this.startDate = startDate;
        this.endDate = endDate;
        this.daysOfWeek = daysOfWeek;
    }

    public Task() {

    }

    public String getUserId() {
        return userId;
    }

    public boolean isPrivateTask() {
        return privateTask;
    }

    public String getCategory() {
        return category;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public String getName() {
        return name;
    }

    public Frequency getFrequency() {
        return frequency;
    }

}
