package backend.DTO;

import java.time.LocalDate;
import java.util.List;

public class NotificationDTO {
    private Long id;
    private String title;
    private String summary;
    private LocalDate date;
    private String categoryName;

    private PhotoDTO coverPhoto;  // naslovna
    private List<PhotoDTO> galleryPhotos;  // galerijske slike

    public NotificationDTO(Long id, String title, String summary, LocalDate date, String categoryName, PhotoDTO coverPhoto, List<PhotoDTO> galleryPhotos) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.date = date;
        this.categoryName = categoryName;
        this.coverPhoto = coverPhoto;
        this.galleryPhotos = galleryPhotos;
    }

    // getters i setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public PhotoDTO getCoverPhoto() {
        return coverPhoto;
    }

    public void setCoverPhoto(PhotoDTO coverPhoto) {
        this.coverPhoto = coverPhoto;
    }

    public List<PhotoDTO> getGalleryPhotos() {
        return galleryPhotos;
    }

    public void setGalleryPhotos(List<PhotoDTO> galleryPhotos) {
        this.galleryPhotos = galleryPhotos;
    }
}
