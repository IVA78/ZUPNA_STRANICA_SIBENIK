package backend.entity;

import jakarta.persistence.*;

@Entity
public class Formular {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // npr. "Prijavnica za krizmu"
    private String fileName; // npr. "krizma.pdf"
    private String fileType; // npr. "application/pdf"

    @Lob
    private byte[] data;

    public Formular() {
    }

    public Formular(String name, String fileName, String fileType, byte[] data) {
        this.name = name;
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
    }

    public Formular(Long id, String name, String fileName, String fileType, byte[] data) {
        this.id = id;
        this.name = name;
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}

