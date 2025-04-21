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
        return this.eventRepo.findAll();
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
        CalendarEvent newCalEvent = mapper.map(data, CalendarEvent.class);
        return this.eventRepo.save(newCalEvent);
    }

    public CalendarEvent updateCalendarEvent(Long id, UpdateCalendarEventDTO data) {
        Optional<CalendarEvent> result = this.eventRepo.findById(id);
        if (result.isEmpty()) {
            return null;
        }
        CalendarEvent found = result.get();

        Optional<Label> labelResult = labelRepo.findById(data.getLabelId());
        Label labelFound = labelResult.get();

        found.setTitle(data.getTitle());
        found.setEventDate(data.getEventDate());
        found.setEventTime(data.getEventTime());
        found.setLocation(data.getLocation());
        found.setDeleted(data.getDeleted());
        found.setLabelId(labelFound);

        return this.eventRepo.save(found);
    }

    public void deleteCalendarEvent(Long id) {
        Optional<CalendarEvent> result = this.eventRepo.findById(id);
        CalendarEvent found = result.get();
        found.setDeleted(true);
        this.eventRepo.save(found);
    }

    public List<CalendarEvent> getCalendarEventByLocation(String term) {
        List<CalendarEvent> all = this.eventRepo.findAll();
        List<CalendarEvent> eventsByLocation = new ArrayList<>();

        eventsByLocation = all.stream().filter((event) -> event.getLocation().equals(term)).collect(Collectors.toList());

        return eventsByLocation;
    }

    public List<CalendarEvent> getCalendarEventsByLabel(String id) {
        List<CalendarEvent> all = this.eventRepo.findAll();
        List<CalendarEvent> eventsByLabel = new ArrayList<>();

        Optional<Label> found = labelRepo.findById(id);
        Label label = found.get();

        eventsByLabel = all.stream().filter((event) -> event.getLabelId().getName().equals(label.getName())).collect(Collectors.toList());

        return eventsByLabel;
    }

}
