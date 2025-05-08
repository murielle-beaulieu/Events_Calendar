package io.nology.events_calendar.calendar_event;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UpdateCalendarEventDTO {

    private String title;

    private LocalDate eventDate;

    private LocalDateTime eventTime;

    private String location;

    private Boolean deleted;

    private Long label;
}