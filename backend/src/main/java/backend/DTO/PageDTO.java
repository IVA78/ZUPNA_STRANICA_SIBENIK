package backend.DTO;

public class PageDTO {
    private Long id;
    private String title;
    private String text;
    private String categoryName;
    private String imageUrl; // može biti null

    public PageDTO(Long id, String title, String text, String categoryName, String imageUrl) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.categoryName = categoryName;
        this.imageUrl = imageUrl;
    }

    // Getteri i setteri

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
