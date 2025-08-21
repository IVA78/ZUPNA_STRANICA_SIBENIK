package backend.cloudinary;


import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Service
public class FileUploadService {

    private final Cloudinary cloudinary;

    // Constructor to inject Cloudinary bean
    public FileUploadService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String upload(MultipartFile file, Long ID, String type) throws IOException {
        // Convert ID to String before passing it to Cloudinary
        String publicId = file.getOriginalFilename();

        if (publicId == null) {
            publicId = String.valueOf(Math.random());
        }

        Map<String, Object> options = new java.util.HashMap<>(Map.of("public_id", publicId));

        if (Objects.equals(type, "image")) {
            return cloudinary.uploader().upload(file.getBytes(), options).get("url").toString();
        } else if (Objects.equals(type, "video")) {
            options.put("resource_type", "video");
            return cloudinary.uploader().uploadLarge(file.getBytes(), options).get("url").toString();
        } else {
            // Handle other file types or throw an error
            throw new RuntimeException("Unsupported file type");
        }
    }

    public void delete(String fileUrl) {
        try {
            // Izvuci public_id iz URL-a
            String[] parts = fileUrl.split("/");
            String filename = parts[parts.length - 1];  // npr. "slika.jpg"
            String publicId = filename.contains(".") ? filename.substring(0, filename.lastIndexOf(".")) : filename;

            cloudinary.uploader().destroy(publicId, Map.of());
        } catch (Exception e) {
            // logiranje greške ili ponovni pokušaj
            System.err.println("Greška prilikom brisanja s Cloudinaryja: " + e.getMessage());
        }
    }


}