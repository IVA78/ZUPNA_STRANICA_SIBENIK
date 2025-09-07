package backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String summary;

    @Column(length = 10000)
    private String content;

    private LocalDate date;

    @ManyToOne
    private Category category;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Photo coverPhoto; // naslovna slika

    @OneToOne(mappedBy = "notification", cascade = CascadeType.ALL, orphanRemoval = true)
    private Gallery gallery;

    // getters/setters


    public Notification() {
    }

    public Notification(String title, String summary, String content, LocalDate date, Category category, Photo coverPhoto, Gallery gallery) {
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.date = date;
        this.category = category;
        this.coverPhoto = coverPhoto;
        this.gallery = gallery;
    }

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Photo getCoverPhoto() {
        return coverPhoto;
    }

    public void setCoverPhoto(Photo coverPhoto) {
        this.coverPhoto = coverPhoto;
    }

    public Gallery getGallery() {
        return gallery;
    }

    public void setGallery(Gallery gallery) {
        this.gallery = gallery;
    }
}
