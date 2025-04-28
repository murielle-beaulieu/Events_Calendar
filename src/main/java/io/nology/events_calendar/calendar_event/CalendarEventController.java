package io.nology.events_calendar.calendar_event;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/calendar_events")
public class CalendarEventController {

    private CalendarEventService service;
    
    public CalendarEventController(CalendarEventService service) {
        this.service = service;
    }

    @GetMapping()
    public ResponseEntity<List<CalendarEvent>> getAllCalendarEvents() {
        List<CalendarEvent> all = this.service.getAllCalendarEvents();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CalendarEvent> getCalendarEventById(@PathVariable Long id){
        CalendarEvent found = this.service.getCalendarEventById(id);
        return new ResponseEntity<>(found, HttpStatus.OK);
    }

    @GetMapping("/location/{term}")
    public ResponseEntity<List<CalendarEvent>> getCalendarEventByLocation (@PathVariable String term) {
        List<CalendarEvent> eventsByLocation = this.service.getCalendarEventByLocation(term);
        return new ResponseEntity<>(eventsByLocation, HttpStatus.OK);
    }

    @GetMapping("/label/{id}")
    public ResponseEntity<List<CalendarEvent>> getCalendarEventByLabel (@PathVariable Long id) {
        List<CalendarEvent> eventsByLabel = this.service.getCalendarEventsByLabel(id);
        return new ResponseEntity<>(eventsByLabel, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<CalendarEvent> createCalendarEvent(@RequestBody @Valid CreateCalendarEventDTO data) {
        CalendarEvent newCalEvent = this.service.createCalendarEvent(data);
        return new ResponseEntity<>( newCalEvent, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CalendarEvent> updateCalendarEvent(@PathVariable Long id, @RequestBody @Valid UpdateCalendarEventDTO data) {
        CalendarEvent updatedCalEvent = this.service.updateCalendarEvent(id, data);
        return new ResponseEntity<>(updatedCalEvent, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public String deleteCalendarEvent(@PathVariable Long id) {
        this.service.deleteCalendarEvent(id);
        return ("Successfully deleted Calendar Event with ID " + id);
    }
}
