package backend.controller;

import backend.DTO.PageDTO;
import backend.entity.Page;
import backend.service.PageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/pages")
public class PageController {

    private final PageService pageService;

    public PageController(PageService pageService) {
        this.pageService = pageService;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createPage(
            @RequestParam String title,
            @RequestParam String text,
            @RequestParam Long categoryId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        try {
            Page saved = pageService.createPage(title, text, categoryId, imageFile);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Greška: " + e.getMessage());
        }
    }

    @GetMapping("/dto")
    public ResponseEntity<List<PageDTO>> getAllPagesAsDTO() {
        return ResponseEntity.ok(pageService.getAllAsDTO());
    }

    @GetMapping("/dto/{id}")
    public ResponseEntity<PageDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(pageService.findById(id));
    }

    @GetMapping("/dto/category/{categoryId}")
    public ResponseEntity<PageDTO> findByCategoryId(@PathVariable Long categoryId) {
        return ResponseEntity.ok(pageService.findByCategoryId(categoryId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePage(@PathVariable Long id) {
        pageService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<PageDTO> updatePage(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String text,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(required = false) String deleteImage  // <-- string
    ) throws IOException {

        boolean shouldDeleteImage = "true".equalsIgnoreCase(deleteImage); // parsiramo string u boolean
        Page updated = pageService.updatePage(id, title, text, image, shouldDeleteImage);
        return ResponseEntity.ok(pageService.toDTO(updated));
    }



}
