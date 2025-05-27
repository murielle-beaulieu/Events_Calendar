package io.nology.events_calendar.calendar_event;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nology.events_calendar.label.Label;
import io.nology.events_calendar.label.LabelRepository;

@Service
public class CalendarEventService {

    private CalendarEventRepository eventRepo;
    private LabelRepository labelRepo;
    private ModelMapper mapper;

    public CalendarEventService(ModelMapper mapper, CalendarEventRepository eventRepo, LabelRepository labelRepo) {
        this.mapper = mapper;
        this.eventRepo = eventRepo;
        this.labelRepo = labelRepo;
    }

    public List<CalendarEvent> getAllCalendarEvents() {
        List<CalendarEvent> all = this.eventRepo.findAll();
        List<CalendarEvent> allActive = all.stream().filter((e) -> e.getIsDeleted() != null && !e.getIsDeleted()).collect(Collectors.toList());
        return allActive;
    }

    public CalendarEvent getCalendarEventById(Long id) {
        Optional<CalendarEvent> found = this.eventRepo.findById(id);
        if (found.isEmpty()) {
            return null;
        }
        CalendarEvent result = found.get();
        return result;
    }

    public CalendarEvent createCalendarEvent(CreateCalendarEventDTO data) {
        Label labelFound = null;
        
        if (data.getLabel() != null) {
            Optional<Label> labelResult = labelRepo.findById(data.getLabel());
            if (labelResult.isPresent()) {
                labelFound = labelResult.get();
            }
        }
        
        CalendarEvent newCalEvent = mapper.map(data, CalendarEvent.class);
        newCalEvent.setIsDeleted(false);
        newCalEvent.setLabel(labelFound);  // This will be null if no label was found
        
        return this.eventRepo.save(newCalEvent);
    }

    public CalendarEvent updateCalendarEvent(Long id, UpdateCalendarEventDTO data) {
        Optional<CalendarEvent> result = this.eventRepo.findById(id);
        if (result.isEmpty()) {
            return null;
        }
        CalendarEvent found = result.get();

        Optional<Label> labelResult = labelRepo.findById(data.getLabel());
        if (labelResult.isEmpty()) {
            return null;
        }
        Label labelFound = labelResult.get();

        found.setTitle(data.getTitle());
        found.setEventDate(data.getEventDate());
        found.setEventTime(data.getEventTime());
        found.setLocation(data.getLocation());
        found.setIsDeleted(data.getIsDeleted());
        found.setLabel(labelFound);

        return this.eventRepo.save(found);
    }

    public void deleteCalendarEvent(Long id) {
        Optional<CalendarEvent> result = this.eventRepo.findById(id);
        CalendarEvent found = result.get();
        found.setIsDeleted(true);
        this.eventRepo.save(found);
    }

    public List<CalendarEvent> getCalendarEventByLocation(String term) {
        List<CalendarEvent> all = this.eventRepo.findAll();
        List<CalendarEvent> eventsByLocation = new ArrayList<>();

        eventsByLocation = all.stream().filter((event) ->(event.getLocation().toLowerCase()).equals(term.toLowerCase())).collect(Collectors.toList());

        return eventsByLocation;
    }

    public List<CalendarEvent> getCalendarEventsByLabel(Long id) {

        List<CalendarEvent> all = this.eventRepo.findAll();
        List<CalendarEvent> eventsByLabel = new ArrayList<>();

        Optional<Label> found = labelRepo.findById(id);
        Label result = found.get();

        all = all.stream().filter((e) -> e.getLabel()!= null).collect(Collectors.toList());
        eventsByLabel = all.stream().filter((event) -> event.getLabel().getId().equals(result.getId())).collect(Collectors.toList());

        return eventsByLabel;
    }

}
