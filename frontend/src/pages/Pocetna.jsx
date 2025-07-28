import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Spinner,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { IoShareSocialSharp } from "react-icons/io5";

const Pocetna = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentGallery, setCurrentGallery] = useState([]);

  const [links, setLinks] = useState([]);
  const [isLinksLoading, setIsLinksLoading] = useState(true);

  const [futureEvents, setFutureEvents] = useState([]);
  const [isFutureEventsLoading, setFutureEventsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications/all", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška prilikom dohvata podataka:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/links", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setLinks(data);
        setIsLinksLoading(false);
      })
      .catch((err) => {
        console.error("Greška prilikom dohvaćanja linkova:", err);
        setIsLinksLoading(true);
      });
  }, []);

  useEffect(() => {
    fetch("/api/events", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setFutureEvents(data);
        setFutureEventsLoading(false);
      })
      .catch((err) => {
        console.error("Greška prilikom dohvaćanja linkova:", err);
        setFutureEventsLoading(true);
      });
  }, []);

  const openImageModal = (gallery, index) => {
    setCurrentGallery(gallery);
    setSelectedImageIndex(index);
    onOpen();
  };

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <Box>
      <Navbar />

      <Flex
        direction={{ base: "column", md: "row" }}
        minHeight="80vh"
        p={4}
        gap={6}
      >
        {/* Glavni sadržaj - fleksibilna širina */}

        <Box flex="1">
          <Box
            p={5}
            bg="RGBA(248, 245, 240)"
            borderRadius="md"
            marginBottom={3}
          >
            <Text fontSize="xl" color="gray.600" mt={1}>
              Dobrodošli na stranicu Župe sv. Petra – Vidici, Šibenik. Ovdje
              možete pratiti najnovije obavijesti, preporučeni sadržaj te
              nadolazeće događaje naše župne zajednice.
            </Text>
          </Box>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={6}
            bg="RGBA(248, 245, 240)"
            borderRadius="md"
            padding={3}
          >
            {events.map((event) => (
              <Box
                key={event.id}
                borderWidth="1px"
                borderRadius="xl"
                overflow="hidden"
                boxShadow="md"
                bg="white"
              >
                {event.coverPhoto?.imageUrl && (
                  <Image
                    src={event.coverPhoto.imageUrl}
                    alt={event.coverPhoto.description || "Slika"}
                    objectFit="cover"
                    w="100%"
                    h="200px"
                    cursor="pointer"
                    onClick={() => openImageModal([event.coverPhoto], 0)}
                    transition="transform 0.2s"
                    _hover={{ transform: "scale(1.02)" }}
                  />
                )}

                <Box p={4}>
                  <Heading size="md">{event.title}</Heading>
                  <Text fontSize="sm" color="gray.600">
                    {event.date} • {event.categoryName}
                  </Text>
                  <Text mt={2}>{event.summary}</Text>

                  {event.galleryPhotos.length > 0 && (
                    <Stack direction="row" spacing={2} mt={4} wrap="wrap">
                      {event.galleryPhotos.slice(0, 3).map((photo, index) => (
                        <Image
                          key={index}
                          src={photo.imageUrl}
                          alt={photo.description}
                          boxSize="80px"
                          objectFit="cover"
                          borderRadius="md"
                          cursor="pointer"
                          onClick={() =>
                            openImageModal(event.galleryPhotos, index)
                          }
                          transition="transform 0.2s"
                          _hover={{ transform: "scale(1.05)" }}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Dodatni sadržaj - fleksibilna širina */}
        <Box
          as="nav"
          width={{ base: "100%", md: "25%", lg: "20%" }}
          maxW={{ md: "300px", lg: "350px" }}
          bg="RGBA(248, 245, 240)"
          p={4}
          borderRadius="md"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
        >
          {/* Linkovi */}
          <Heading size="md" margin={2}>
            Preporučeni sadržaj
          </Heading>

          {isLinksLoading ? (
            <Text>Učitavanje sadržaja...</Text>
          ) : links.length === 0 ? (
            <Text color="gray.500">Trenutno nema linkova za prikazati.</Text>
          ) : (
            <Stack spacing={3}>
              {links.map((link) => (
                <ChakraLink
                  key={link.id}
                  href={link.url}
                  isExternal
                  color="#8b6f5e"
                  _hover={{ textDecoration: "underline" }}
                >
                  <HStack spacing={2}>
                    <Icon as={IoShareSocialSharp} boxSize={5} />
                    <Text>{link.text}</Text>
                  </HStack>
                </ChakraLink>
              ))}
            </Stack>
          )}

          {/* Dogadjaji */}
          <Heading size="md" margin={2}>
            Nadolazeći događaji
          </Heading>

          {isFutureEventsLoading ? (
            <Text>Učitavanje sadržaja...</Text>
          ) : futureEvents.length === 0 ? (
            <Text color="gray.500">Trenutno nema događaja za prikazati.</Text>
          ) : (
            <Stack spacing={4}>
              {futureEvents.map((event) => (
                <Box
                  key={event.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  bg="white"
                  boxShadow="sm"
                >
                  <Heading size="sm" mb={2}>
                    {event.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    📅 {new Date(event.datetime).toLocaleString("hr-HR")}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    📍 {event.location}
                  </Text>
                  <Text>{event.description}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Flex>

      {/* Modal za prikaz slike */}
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

      <Footer />
    </Box>
  );
};

export default Pocetna;
