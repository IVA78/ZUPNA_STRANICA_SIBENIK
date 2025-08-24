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
            cover = new PhotoDTO(
                    notification.getCoverPhoto().getId(),
                    notification.getCoverPhoto().getImageUrl(),
                    notification.getCoverPhoto().getDescription());
        }

        List<PhotoDTO> galleryPhotos = new ArrayList<>();
        if (notification.getGallery() != null) {
            galleryPhotos = notification.getGallery().getPhotos()
                    .stream()
                    .map(photo -> new PhotoDTO(
                            photo.getId(),
                            photo.getImageUrl(),
                            photo.getDescription()))
                    .toList();
        }

        return new NotificationDTO(
                notification.getId(),
                notification.getTitle(),
                notification.getSummary(),
                notification.getDate(),
                notification.getCategory().getName(),
                notification.getContent(),
                cover,
                galleryPhotos
        );
    }

    public void updateNotification(Long id, String title, String summary, String content) {
        Notification notification = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Obavijest ne postoji"));

        if (title != null && !title.isEmpty()) {
            notification.setTitle(title);
        }
        if (summary != null && !summary.isEmpty()) {
            notification.setSummary(summary);
        }
        if (content != null && !content.isEmpty()) {
            notification.setContent(content);
        }

        notificationRepo.save(notification);
    }


    public void deleteNotification(Long notificationId) {
        Notification notification = notificationRepo.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Obavijest ne postoji"));

        // Brisanje naslovne slike sa cloud servisa ako postoji
        if (notification.getCoverPhoto() != null) {
            try {
                fileUploadService.delete(notification.getCoverPhoto().getImageUrl());
            } catch (Exception e) {
                // možeš logirati grešku, ali ne prekidaj brisanje
            }
            photoRepo.delete(notification.getCoverPhoto());
        }

        // Brisanje galerijskih slika
        if (notification.getGallery() != null) {
            notification.getGallery().getPhotos().forEach(photo -> {
                try {
                    fileUploadService.delete(photo.getImageUrl());
                } catch (Exception e) {
                    // log greške
                }
                photoRepo.delete(photo);
            });
        }

        // Na kraju obriši obavijest
        notificationRepo.delete(notification);
    }

    public void deletePhotoFromNotification(Long notificationId, Long photoId) {
        Notification notification = notificationRepo.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Obavijest ne postoji"));

        Photo photo = photoRepo.findById(photoId)
                .orElseThrow(() -> new RuntimeException("Fotografija ne postoji"));

        // Ako je naslovna slika
        if (notification.getCoverPhoto() != null &&
                notification.getCoverPhoto().getId().equals(photoId)) {
            try {
                fileUploadService.delete(photo.getImageUrl());
            } catch (Exception e) {
                // logirati ako treba
            }
            notification.setCoverPhoto(null);
            photoRepo.delete(photo);
            notificationRepo.save(notification);
            return;
        }

        // Ako je u galeriji
        if (notification.getGallery() != null &&
                notification.getGallery().getPhotos().contains(photo)) {
            try {
                fileUploadService.delete(photo.getImageUrl());
            } catch (Exception e) {
                // logirati ako treba
            }
            notification.getGallery().getPhotos().remove(photo);
            photoRepo.delete(photo);
            notificationRepo.save(notification);
            return;
        }

        throw new RuntimeException("Fotografija nije vezana uz ovu obavijest");
    }



}
