package datastructures.calendar;

import java.time.LocalDateTime;
import java.util.Date;

public class Task {

//    private final String userId;
//    private final String name;
//    private final String category;
//
//    private final int priority;
//    private final int estimationTime;
//
//    private boolean completed;
//    private final boolean privateTask;
//
//    private final Frequency frequency;
//
//    private final Date startDate;
//    private final Date endDate;
    //private final int[] daysOfWeek;

    private String userId;
    private String name;
    private String category;

    private int priority;
    private int estimationTime;

    private boolean completed;
    private boolean privateTask;

    private Frequency frequency;

    private Date startDate;
    private Date endDate;

    private boolean[] daysOfWeek;


    //public int[] getDaysOfWeek() {
       // return daysOfWeek;
   // }


    // once: empty
    // daily: 1-7
    // weekly: every mon tues: 1, 2




    public Task(String userId, String name, String category, int priority, boolean completed, int estimationTime, Frequency frequency, boolean privateTask, Date startDate, Date endDate, boolean[] daysOfWeek) {
        this.userId = userId;
        this.name = name;
        this.category = category;
        this.priority = priority;
        this.completed = completed;
        this.estimationTime = estimationTime;
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

    public int getPriority() {
        return priority;
    }

    public boolean isCompleted() {
        return completed;
    }

    public int getEstimationTime() {
        return estimationTime;
    }

    public Frequency getFrequency() {
        return frequency;
    }

}
