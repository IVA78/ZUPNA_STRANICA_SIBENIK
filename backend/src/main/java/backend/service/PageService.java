package backend.service;

import backend.DTO.PageDTO;
import backend.cloudinary.FileUploadService;
import backend.entity.Category;
import backend.entity.Page;
import backend.entity.Photo;
import backend.repository.CategoryRepository;
import backend.repository.PageRepository;
import backend.repository.PhotoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PageService {

    private final PageRepository pageRepo;
    private final CategoryRepository categoryRepo;
    private final PhotoRepository photoRepository;
    private final FileUploadService fileUploadService;

    public PageService(PageRepository pageRepo, CategoryRepository categoryRepo,
                       PhotoRepository photoRepo, FileUploadService fileUploadService) {
        this.pageRepo = pageRepo;
        this.categoryRepo = categoryRepo;
        this.photoRepository = photoRepo;
        this.fileUploadService = fileUploadService;
    }

    public Page createPage(String title, String text, Long categoryId, MultipartFile imageFile) throws IndexOutOfBoundsException {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Kategorija ne postoji"));

        Page page = new Page();
        page.setTitle(title);
        page.setText(text);
        page.setCategory(category);

        // Opcionalna slika
        if (imageFile != null && !imageFile.isEmpty()) {
            String url = null;
            try {
                url = fileUploadService.upload(imageFile, null, "image");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            Photo photo = new Photo();
            photo.setImageUrl(url);
            photo.setDescription("Naslovna slika stranice");
            photoRepository.save(photo);
            page.setImage(photo);
        }

        return pageRepo.save(page);
    }


    public List<PageDTO> getAllAsDTO() {
        return pageRepo.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public PageDTO findById(Long id) {
        Page page = pageRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Page not found with id " + id));
        return toDTO(page);
    }

    public PageDTO findByCategoryId(Long categoryId) {
        Page page = pageRepo.findByCategoryId(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Stranica nije pronađena za kategoriju " + categoryId));
        return toDTO(page);
    }


    public Page save(Page page) {
        return pageRepo.save(page);
    }

    public void deleteById(Long id) {
        pageRepo.deleteById(id);
    }

    public PageDTO toDTO(Page page) {
        String imageUrl = page.getImage() != null ? page.getImage().getImageUrl() : null;
        String categoryName = page.getCategory() != null ? page.getCategory().getName() : null;

        return new PageDTO(
                page.getId(),
                page.getTitle(),
                page.getText(),
                categoryName,
                imageUrl
        );
    }
}

