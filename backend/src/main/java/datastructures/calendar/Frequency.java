package datastructures.calendar;

import com.google.gson.annotations.SerializedName;

public enum Frequency {
    @SerializedName("0")
    ONCE,
    @SerializedName("1")
    DAILY,
    @SerializedName("2")
    WEEKLY
}
