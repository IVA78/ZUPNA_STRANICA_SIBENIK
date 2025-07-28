package backend.service;

import backend.entity.Formular;
import backend.repository.FormularRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FormularService {

    private final FormularRepository repo;

    public FormularService(FormularRepository repo) {
        this.repo = repo;
    }

    public Formular saveFormular(String name, MultipartFile file) throws IOException {
        try {
            return repo.save(new Formular(
                    null,
                    name,
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            ));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Formular> getAll() {
        return repo.findAll();
    }

    public Formular getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Formular not found"));
    }
}
