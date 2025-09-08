package backend.controller;

import backend.DTO.NotificationDTO;
import backend.DTO.NotificationUpdateDTO;
import backend.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/{id}")
    public ResponseEntity<?> updateNotification(
            @PathVariable Long id,
            @RequestBody NotificationUpdateDTO dto
    ) {
        try {
            notificationService.updateNotification(id, dto.getTitle(), dto.getSummary(), dto.getContent());

            Map<String, Object> response = new HashMap<>();
            response.put("id", id);
            response.put("message", "Obavijest ažurirana");

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Greška prilikom ažuriranja"));
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long id) {
        try {
            notificationService.deleteNotification(id);
            return ResponseEntity.ok("Obavijest obrisana");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Greška prilikom brisanja");
        }
    }

    @DeleteMapping("/{notificationId}/photos/{photoId}")
    public ResponseEntity<?> deletePhotoFromNotification(
            @PathVariable Long notificationId,
            @PathVariable Long photoId
    ) {
        try {
            notificationService.deletePhotoFromNotification(notificationId, photoId);
            return ResponseEntity.ok("Fotografija obrisana");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Greška prilikom brisanja fotografije"));
        }
    }
    

}
