package backend.service;

import backend.DTO.NotificationDTO;
import backend.DTO.PhotoDTO;
import backend.cloudinary.FileUploadService;
import backend.entity.Category;
import backend.entity.Gallery;
import backend.entity.Notification;
import backend.entity.Photo;
import backend.repository.CategoryRepository;
import backend.repository.NotificationRepository;
import backend.repository.PhotoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepo;
    private final CategoryRepository categoryRepo;
    private final PhotoRepository photoRepo;
    private final FileUploadService fileUploadService;

    public NotificationService(NotificationRepository notificationRepo, CategoryRepository categoryRepo,
                               PhotoRepository photoRepo, FileUploadService fileUploadService) {
        this.notificationRepo = notificationRepo;
        this.categoryRepo = categoryRepo;
        this.photoRepo = photoRepo;
        this.fileUploadService = fileUploadService;
    }

    public void createNotification(String title, String summary, String content, Long categoryId,
                                   MultipartFile coverPhoto, List<MultipartFile> galleryPhotos) throws IOException {

        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setSummary(summary);
        notification.setContent(content);
        notification.setDate(LocalDate.now());

        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Kategorija ne postoji"));
        notification.setCategory(category);

        // Upload naslovne slike
        if (coverPhoto != null && !coverPhoto.isEmpty()) {
            String url = fileUploadService.upload(coverPhoto, null, "image");
            Photo cover = new Photo();
            cover.setImageUrl(url);
            cover.setDescription("Naslovna slika");
            photoRepo.save(cover);
            notification.setCoverPhoto(cover);
        }

        // Upload galerijskih slika
        if (galleryPhotos != null && !galleryPhotos.isEmpty()) {
            Gallery gallery = new Gallery();
            gallery.setTitle("Galerija - " + title);
            gallery.setDescription("Fotografije uz obavijest");
            gallery.setNotification(notification);

            for (MultipartFile photoFile : galleryPhotos) {
                if (!photoFile.isEmpty()) {
                    String url = fileUploadService.upload(photoFile, null, "image");
                    Photo p = new Photo();
                    p.setImageUrl(url);
                    p.setDescription("Galerijska slika");
                    p.setGallery(gallery);
                    gallery.getPhotos().add(p);
                }
            }
            notification.setGallery(gallery);
        }

        notificationRepo.save(notification);
    }

    public List<NotificationDTO> getAllNotifications() {
        List<Notification> notifications = notificationRepo.findAll();
        // Pretvori entitete u DTO-e da ne šalješ nepotrebne podatke
        return notifications.stream()
                .map(notification -> toDTO(notification))
                .toList();
    }

    public List<NotificationDTO> getNotificationsByCategoryId(Long categoryId) {
        List<Notification> notifications = notificationRepo.findByCategoryId(categoryId);
        return notifications.stream()
                .map(notification -> toDTO(notification))
                .toList();
    }

    public NotificationDTO toDTO(Notification notification) {
        PhotoDTO cover = null;
        if (notification.getCoverPhoto() != null) {
            cover = new PhotoDTO(notification.getCoverPhoto().getImageUrl(),
                    notification.getCoverPhoto().getDescription());
        }

        List<PhotoDTO> galleryPhotos = new ArrayList<>();
        if (notification.getGallery() != null) {
            galleryPhotos = notification.getGallery().getPhotos()
                    .stream()
                    .map(photo -> new PhotoDTO(photo.getImageUrl(), photo.getDescription()))
                    .toList();
        }

        return new NotificationDTO(
                notification.getId(),
                notification.getTitle(),
                notification.getSummary(),
                notification.getDate(),
                notification.getCategory().getName(),
                cover,
                galleryPhotos
        );
    }

}
