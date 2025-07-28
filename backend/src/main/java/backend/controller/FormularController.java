package backend.controller;

import backend.entity.Formular;
import backend.service.FormularService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/forms")
public class FormularController {

    private final FormularService service;

    public FormularController(FormularService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Formular> uploadFormular(
            @RequestParam("name") String name,
            @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(service.saveFormular(name, file));
    }

    @GetMapping
    public ResponseEntity<List<Formular>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> download(@PathVariable Long id) {
        Formular f = service.getById(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + f.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(f.getFileType()))
                .body(f.getData());
    }
}

