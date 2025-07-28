package backend.service;


import backend.entity.Link;
import backend.repository.LinkRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LinkService {

    private final LinkRepository linkRepository;

    public LinkService(LinkRepository linkRepository) {
        this.linkRepository = linkRepository;
    }

    public Link addLink(Link link) {
        return linkRepository.save(link);
    }

    public List<Link> getAllLinks() {
        return linkRepository.findAll();
    }

    public void deleteLinkById(Long id) {
        linkRepository.deleteById(id);
    }

}
