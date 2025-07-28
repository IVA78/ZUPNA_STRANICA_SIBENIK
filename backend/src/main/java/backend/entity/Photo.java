package backend.entity;

import jakarta.persistence.*;

@Entity
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String imageUrl; // Cloudinary URL

    @ManyToOne
    private Gallery gallery;

    // getters/setters

    public Photo() {
    }

    public Photo(String description, String imageUrl, Gallery gallery) {
        this.description = description;
        this.imageUrl = imageUrl;
        this.gallery = gallery;
    }

    public Long getId() {
        return id;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Gallery getGallery() {
        return gallery;
    }

    public void setGallery(Gallery gallery) {
        this.gallery = gallery;
    }
}
