package io.nology.events_calendar.calendar_event;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Object> {
    
}
