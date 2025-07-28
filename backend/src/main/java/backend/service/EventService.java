package backend.service;

import backend.entity.Event;
import backend.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getUpcomingEvents() {
        return eventRepository.findByDatetimeAfterOrderByDatetimeAsc(LocalDateTime.now());
    }

    public void deleteEventById(Long id) {
        eventRepository.deleteById(id);
    }
}
