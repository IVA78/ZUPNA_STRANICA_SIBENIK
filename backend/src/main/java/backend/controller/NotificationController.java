package backend.controller;

import backend.DTO.NotificationDTO;
import backend.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createNotification(
            @RequestParam String title,
            @RequestParam String summary,
            @RequestParam String content,
            @RequestParam Long categoryId,
            @RequestParam(required = false) MultipartFile coverPhoto,
            @RequestParam(required = false) List<MultipartFile> galleryPhotos
    ) {
        try {
            notificationService.createNotification(title, summary, content, categoryId, coverPhoto, galleryPhotos);
            return ResponseEntity.ok("Obavijest spremljena");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Greška kod uploadanja slike");
        }
    }

    @GetMapping("/all")
    public List<NotificationDTO> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/category/{categoryId}")
    public List<NotificationDTO> getNotificationsByCategory(@PathVariable Long categoryId) {
        return notificationService.getNotificationsByCategoryId(categoryId);
    }

}
