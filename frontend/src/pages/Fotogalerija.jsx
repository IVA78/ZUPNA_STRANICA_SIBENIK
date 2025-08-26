import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Stack,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

const Fotogalerija = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentGallery, setCurrentGallery] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/notifications/all`)
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška prilikom dohvata:", err);
        setLoading(false);
      });
  }, []);

  const openImageModal = (gallery, index) => {
    setCurrentGallery(gallery);
    setSelectedImageIndex(index);
    onOpen();
  };

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <>
      <Navbar></Navbar>
      <Box p={6}>
        <Heading size="lg" mb={6}>
          Fotogalerija događanja
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {notifications
            .filter((n) => n.galleryPhotos && n.galleryPhotos.length > 0)
            .map((n) => (
              <Box
                key={n.id}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                boxShadow="sm"
                bg="white"
              >
                <Box p={4}>
                  <Heading size="md">{n.title}</Heading>
                </Box>

                {/* Naslovna slika */}
                {n.coverPhoto?.imageUrl && (
                  <Image
                    src={n.coverPhoto.imageUrl}
                    alt={n.coverPhoto.description || "Slika"}
                    objectFit="cover"
                    w="100%"
                    h="200px"
                    cursor="pointer"
                    onClick={() => openImageModal([n.coverPhoto], 0)}
                    _hover={{ transform: "scale(1.02)" }}
                    transition="transform 0.2s"
                  />
                )}

                {/* Galerija */}
                {n.galleryPhotos?.length > 0 && (
                  <Stack direction="row" spacing={2} p={4} wrap="wrap">
                    {n.galleryPhotos.slice(0, 4).map((photo, index) => (
                      <Image
                        key={index}
                        src={photo.imageUrl}
                        alt={photo.description}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                        cursor="pointer"
                        onClick={() => openImageModal(n.galleryPhotos, index)}
                        _hover={{ transform: "scale(1.05)" }}
                        transition="transform 0.2s"
                      />
                    ))}
                  </Stack>
                )}
              </Box>
            ))}
        </SimpleGrid>

        {/* Modal za slike */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p={0}>
              {currentGallery.length > 0 && selectedImageIndex !== null && (
                <>
                  <Image
                    src={currentGallery[selectedImageIndex].imageUrl}
                    alt={currentGallery[selectedImageIndex].description}
                    objectFit="contain"
                    w="100%"
                    maxH="80vh"
                  />
                  <Box p={4}>
                    <Text fontSize="sm" color="gray.600">
                      {currentGallery[selectedImageIndex].description}
                    </Text>
                  </Box>

                  {currentGallery.length > 1 && (
                    <Stack direction="row" justify="space-between" p={4}>
                      <Text
                        as="button"
                        onClick={() =>
                          setSelectedImageIndex(
                            (prev) =>
                              (prev - 1 + currentGallery.length) %
                              currentGallery.length
                          )
                        }
                        fontWeight="bold"
                        color="#86654b"
                      >
                        ← Prethodna
                      </Text>
                      <Text
                        as="button"
                        onClick={() =>
                          setSelectedImageIndex(
                            (prev) => (prev + 1) % currentGallery.length
                          )
                        }
                        fontWeight="bold"
                        color="#86654b"
                      >
                        Sljedeća →
                      </Text>
                    </Stack>
                  )}
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
      <Footer></Footer>
    </>
  );
};

export default Fotogalerija;
