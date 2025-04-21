package io.nology.events_calendar.calendar_event;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;


@Service
public class CalendarEventService {

    private CalendarEventRepository repo;
    private ModelMapper mapper;

    public CalendarEventService(ModelMapper mapper, CalendarEventRepository repo) {
        this.mapper = mapper;
        this.repo = repo;
    }

    public List<CalendarEvent> getAllCalendarEvents() {
        return this.repo.findAll();
    }

    public CalendarEvent getCalendarEventById(Long id) {
        Optional<CalendarEvent> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return null;
        }
        CalendarEvent result = found.get();
        return result;
    }

    public CalendarEvent createCalendarEvent(CreateCalendarEventDTO data) {

        CalendarEvent newCalEvent = mapper.map(data, CalendarEvent.class);
        return this.repo.save(newCalEvent);
    }

    public CalendarEvent updateCalendarEvent(Long id, UpdateCalendarEventDTO data) {
        Optional<CalendarEvent> result = this.repo.findById(id);
        if (result.isEmpty()) {
            return null;
        }
        CalendarEvent found = result.get();
        mapper.map(data, found);
        return this.repo.save(found);
    }

    public void deleteCalendarEvent(Long id) {
        Optional<CalendarEvent> result = this.repo.findById(id);
        CalendarEvent found = result.get();
        found.setDeleted(true);
        this.repo.save(found);
    }

}
