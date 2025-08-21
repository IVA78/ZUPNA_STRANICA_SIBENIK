package backend.DTO;

public class NotificationUpdateDTO {
    private String title;
    private String summary;
    private String content;

    // getteri i setteri
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
