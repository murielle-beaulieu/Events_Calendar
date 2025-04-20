package io.nology.events_calendar.event;

import java.time.LocalDateTime;

import io.nology.events_calendar.label.Label;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "events")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private LocalDateTime eventTime;

    @Column
    private String location;

    @ManyToOne
    @JoinColumn(name = "labelId", nullable = true)
    private Label label;

    @Column
    private Boolean deleted;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        LocalDateTime timestamp = LocalDateTime.now();
        createdAt = timestamp;
        updatedAt = timestamp;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
