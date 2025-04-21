package io.nology.events_calendar.label;

import lombok.Data;

@Data
public class UpdateLabelDTO {

    private String name;

    private Boolean deleted;
}
