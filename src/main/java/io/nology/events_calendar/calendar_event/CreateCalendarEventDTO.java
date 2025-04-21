package io.nology.events_calendar.calendar_event;

import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCalendarEventDTO {
    
    @NotBlank
    private String title;

    private LocalDate eventDate;

    private LocalDateTime eventTime;

    @NotBlank
    private String location;

    private long label;

    private Boolean deleted = false;

}
