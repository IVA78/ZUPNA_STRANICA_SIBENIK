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
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { IoShareSocialSharp } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";

const Pocetna = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentGallery, setCurrentGallery] = useState([]);

  const [links, setLinks] = useState([]);
  const [isLinksLoading, setIsLinksLoading] = useState(true);

  const [futureEvents, setFutureEvents] = useState([]);
  const [isFutureEventsLoading, setFutureEventsLoading] = useState(true);

  const toast = useToast();

  // State za event
  const [event, setEvent] = useState({
    title: "",
    datetime: "",
    location: "",
    description: "",
  });

  // State za link
  const [link, setLink] = useState({
    url: "",
    text: "",
  });

  // provjera na mount
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

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

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    let datetime = event.datetime;
    if (datetime.length === 16) {
      datetime += ":00"; // dodaj sekunde
    }

    const payload = { ...event, datetime };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast({
          title: "Uspješno!",
          description: "Event je dodan.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEvent({ title: "", datetime: "", location: "", description: "" });
      } else {
        throw new Error("Greška kod dodavanja eventa");
      }
    } catch (err) {
      toast({
        title: "Greška",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(link),
      });
      if (res.ok) {
        toast({
          title: "Uspješno!",
          description: "Poveznica je dodana.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLink({ url: "", text: "" });
      } else {
        throw new Error("Greška kod dodavanja poveznice");
      }
    } catch (err) {
      toast({
        title: "Greška",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
                <HStack
                  key={link.id}
                  justifyContent="space-between"
                  bg="white"
                  p={2}
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <ChakraLink
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

                  {isLoggedIn && (
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="outline"
                      onClick={async () => {
                        try {
                          const res = await fetch(`/api/links/${link.id}`, {
                            method: "DELETE",
                          });
                          if (res.ok) {
                            setLinks((prev) =>
                              prev.filter((l) => l.id !== link.id)
                            );
                          } else {
                            console.error("Greška kod brisanja poveznice");
                          }
                        } catch (err) {
                          console.error("Došlo je do greške:", err);
                        }
                      }}
                    >
                      Obriši
                    </Button>
                  )}
                </HStack>
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

                  {isLoggedIn && (
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="outline"
                      mt={2}
                      onClick={async () => {
                        try {
                          const res = await fetch(`/api/events/${event.id}`, {
                            method: "DELETE",
                          });
                          if (res.ok) {
                            setFutureEvents((prev) =>
                              prev.filter((e) => e.id !== event.id)
                            );
                          } else {
                            console.error("Greška kod brisanja eventa");
                          }
                        } catch (err) {
                          console.error("Došlo je do greške:", err);
                        }
                      }}
                    >
                      Obriši
                    </Button>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Flex>
      {isLoggedIn ? (
        <Box
          bg="RGBA(248, 245, 240)"
          p={4}
          borderRadius="md"
          mb={6}
          boxShadow="sm"
          marginTop="1.5em"
        >
          {/* Forma za Event */}
          <Box
            mx="auto"
            mt={10}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            shadow="md"
            bg="white"
          >
            <Text fontSize="xl">Dodavanje novog eventa</Text>
            <Text marginTop=".5em">
              Za dodavanje eventa potrebno je unijeti naslov, datum i vrijeme,
              lokaciju i opis. Nakon toga kliknite na gumb{" "}
              <strong>„Objavi”</strong>. Promjena će biti vidljiva nakon
              osvježavanja preglednika{" "}
              <Icon
                as={FiRefreshCw}
                ml={1}
                boxSize={4}
                verticalAlign="middle"
              />
              .
            </Text>

            <form onSubmit={handleEventSubmit}>
              <VStack spacing={4} mt={4}>
                <FormControl isRequired>
                  <FormLabel>Naslov</FormLabel>
                  <Input
                    type="text"
                    value={event.title}
                    onChange={(e) =>
                      setEvent({ ...event, title: e.target.value })
                    }
                    placeholder="Unesite naslov"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Datum i vrijeme</FormLabel>
                  <Input
                    type="datetime-local"
                    value={event.datetime}
                    onChange={(e) =>
                      setEvent({ ...event, datetime: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Lokacija</FormLabel>
                  <Input
                    type="text"
                    value={event.location}
                    onChange={(e) =>
                      setEvent({ ...event, location: e.target.value })
                    }
                    placeholder="Unesite lokaciju"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Opis</FormLabel>
                  <Textarea
                    value={event.description}
                    onChange={(e) =>
                      setEvent({ ...event, description: e.target.value })
                    }
                    placeholder="Unesite opis"
                  />
                </FormControl>

                <Button
                  mt={4}
                  variant="outline"
                  color="black"
                  borderColor="rgba(23,24,16)"
                  type="submit"
                  w="full"
                  _hover={{
                    bg: "#86654b",
                    color: "RGBA(248, 245, 240)",
                    fontWeight: "bold",
                  }}
                >
                  Objavi
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Forma za Link */}
          <Box
            mx="auto"
            mt={10}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            shadow="md"
            bg="white"
          >
            <Text fontSize="xl">Dodavanje nove poveznice</Text>
            <Text marginTop=".5em">
              Za dodavanje poveznice potrebno je unijeti URL i tekst koji će se
              prikazivati korisnicima. Kliknite na gumb{" "}
              <strong>„Objavi”</strong> kako bi se poveznica pohranila. Promjena
              će biti vidljiva nakon osvježavanja preglednika{" "}
              <Icon
                as={FiRefreshCw}
                ml={1}
                boxSize={4}
                verticalAlign="middle"
              />
              .
            </Text>

            <form onSubmit={handleLinkSubmit}>
              <VStack spacing={4} mt={4}>
                <FormControl isRequired>
                  <FormLabel>URL</FormLabel>
                  <Input
                    type="url"
                    value={link.url}
                    onChange={(e) => setLink({ ...link, url: e.target.value })}
                    placeholder="Unesite URL"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tekst poveznice</FormLabel>
                  <Input
                    type="text"
                    value={link.text}
                    onChange={(e) => setLink({ ...link, text: e.target.value })}
                    placeholder="Unesite tekst"
                  />
                </FormControl>

                <Button
                  mt={4}
                  variant="outline"
                  color="black"
                  borderColor="rgba(23,24,16)"
                  type="submit"
                  w="full"
                  _hover={{
                    bg: "#86654b",
                    color: "RGBA(248, 245, 240)",
                    fontWeight: "bold",
                  }}
                >
                  Objavi
                </Button>
              </VStack>
            </form>
          </Box>
        </Box>
      ) : (
        <></>
      )}

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
