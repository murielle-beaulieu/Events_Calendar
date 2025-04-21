package io.nology.events_calendar.label;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateLabelDTO {

    @NotBlank
    private String name;

    private Boolean deleted = false;
}
