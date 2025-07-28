package backend.DTO;

import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public class CreateNotificationRequest {
    private String title;
    private String summary;
    private String content;
    private LocalDate date;
    private Long categoryId;

    // Multipart files
    private MultipartFile coverPhoto;
    private List<MultipartFile> galleryPhotos;

    // getters/setters


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public MultipartFile getCoverPhoto() {
        return coverPhoto;
    }

    public void setCoverPhoto(MultipartFile coverPhoto) {
        this.coverPhoto = coverPhoto;
    }

    public List<MultipartFile> getGalleryPhotos() {
        return galleryPhotos;
    }

    public void setGalleryPhotos(List<MultipartFile> galleryPhotos) {
        this.galleryPhotos = galleryPhotos;
    }
}
