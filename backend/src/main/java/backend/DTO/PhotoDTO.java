package backend.DTO;

public class PhotoDTO {

    private Long id;
    private String imageUrl;
    private String description;

    public PhotoDTO(Long id, String imageUrl, String description) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    // getteri/setteri

    // getteri/setteri
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}