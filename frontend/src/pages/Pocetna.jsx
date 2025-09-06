import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterKategorija from "../components/FilterKategorija";

import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
  Select,
  useToast,
} from "@chakra-ui/react";

import { IoShareSocialSharp } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";

import svpetar from "../assets/svpetar.jpg";
import RijecSvPetra from "../components/RijecSvPetra";

const API_URL = import.meta.env.VITE_API_URL;

const Pocetna = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Za modal slike
  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onClose: onImageClose,
  } = useDisclosure();

  // Za modal obavijesti
  const {
    isOpen: isEventOpen,
    onOpen: onEventOpen,
    onClose: onEventClose,
  } = useDisclosure();

  // Za modal eventa - uredjivanje
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentGallery, setCurrentGallery] = useState([]);

  const [links, setLinks] = useState([]);
  const [isLinksLoading, setIsLinksLoading] = useState(true);

  const [futureEvents, setFutureEvents] = useState([]);
  const [isFutureEventsLoading, setFutureEventsLoading] = useState(true);

  const [currentNotificationId, setCurrentNotificationId] = useState(null);

  const [visibleCount, setVisibleCount] = useState(7); // početno 7 obavijesti

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 7); // prikaži još 7 po kliku
  };

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

  // State za obavijest
  const [notification, setNotification] = useState({
    title: "",
    summary: "",
    content: "",
    categoryId: "",
    coverPhoto: null,
    galleryPhotos: [],
  });

  //State za kategorije
  const [categories, setCategories] = useState([]);

  const [filteredEvents, setFilteredEvents] = useState();

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
  });

  // provjera na mount
  useEffect(() => {
    async function checkLogin() {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/verify`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          sessionStorage.removeItem("token"); // očisti nevažeći token
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    }

    checkLogin();
  }, []);

  // Dohvat kategorija s backend-a
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${API_URL}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Greška kod dohvaćanja kategorija", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/notifications/all`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška prilikom dohvata podataka:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/links`, {
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
    fetch(`${API_URL}/api/events`, {
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
      const token = sessionStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
        setEvent({
          title: "",
          datetime: "",
          location: "",
          description: "",
          id: "",
        });
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
      const token = sessionStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  const handleGalleryChange = (e) => {
    setNotification({
      ...notification,
      galleryPhotos: Array.from(e.target.files),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", notification.title);
      formData.append("summary", notification.summary);
      formData.append("content", notification.content);
      formData.append("categoryId", notification.categoryId);
      if (notification.coverPhoto) {
        formData.append("coverPhoto", notification.coverPhoto);
      }
      notification.galleryPhotos.forEach((file, index) => {
        formData.append("galleryPhotos", file); // backend očekuje niz
      });

      const token = sessionStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/notifications`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // <-- token ovdje
        },
        body: formData,
      });

      if (res.ok) {
        toast({
          title: "Uspješno!",
          description: "Obavijest je dodana.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setNotification({
          title: "",
          summary: "",
          content: "",
          categoryId: "",
          coverPhoto: null,
          galleryPhotos: [],
        });
      } else {
        throw new Error("Greška kod dodavanja obavijesti");
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

  // inicijaliziraj formData kad se modal otvori
  const handleOpen = () => {
    setFormData({
      title: event.title || "",
      summary: event.summary || "",
      content: event.content || "",
    });
    onFormOpen();
  };

  const handleSave = async (id) => {
    try {
      console.log(formData);

      const token = sessionStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/notifications/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- token ovdje
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        // update state-a u parent komponenti

        // update state-a liste obavijesti (npr. notifications)

        onFormClose();
      }
    } catch (err) {
      console.error("Greška kod uređivanja eventa:", err);
    }
  };

  const handleFilterChange = (category) => {
    if (!category) {
      setFilteredEvents(events); // ako nema filtera, prikaži sve
    } else {
      setFilteredEvents(events.filter((e) => e.categoryName === category));
    }
  };

  const openImageModal = (gallery, index, notificationId) => {
    setCurrentGallery(gallery);
    setSelectedImageIndex(index);
    setCurrentNotificationId(notificationId);
    onImageOpen();
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
        <Box flex="1">
          <Box p={5} bg="RGBA(248, 245, 240)" marginBottom={3}>
            <Heading size="md" mb={3} color="#86654b">
              Dobrodošli na mrežnu stranicu Župe sv. Petra – Vidici, Šibenik.
            </Heading>
            <Text fontSize="xl" color="gray.700" textAlign="center">
              Na ovoj stranici možete pronaći najnovije obavijesti, preporučene
              sadržaje za duhovni rast te informacije o nadolazećim događanjima
              i slavljima naše župne zajednice.
            </Text>
          </Box>

          <RijecSvPetra></RijecSvPetra>

          <FilterKategorija onFilterChange={handleFilterChange} />

          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={6}
            bg="RGBA(248, 245, 240)"
            borderRadius="md"
            padding={3}
          >
            {filteredEvents.slice(0, visibleCount).map((event) => (
              <Box
                key={event.id}
                borderWidth="1px"
                borderRadius="xl"
                overflow="hidden"
                boxShadow="md"
                bg="white"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                {event.coverPhoto?.imageUrl && (
                  <Image
                    src={event.coverPhoto.imageUrl}
                    alt={event.coverPhoto.description || "Slika"}
                    objectFit="cover"
                    w="100%"
                    h="200px"
                    cursor="pointer"
                    onClick={() =>
                      openImageModal([event.coverPhoto], 0, event.id)
                    }
                    transition="transform 0.2s"
                    _hover={{ transform: "scale(1.02)" }}
                  />
                )}

                <Box p={4} flex="1">
                  <Heading size="md">{event.title}</Heading>
                  <Text fontSize="sm" color="gray.600">
                    {event.date} • {event.categoryName}
                  </Text>
                  <Text mt={2}>{event.summary}</Text>

                  {event.galleryPhotos?.length > 0 && (
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
                            openImageModal(event.galleryPhotos, index, event.id)
                          }
                          transition="transform 0.2s"
                          _hover={{ transform: "scale(1.05)" }}
                        />
                      ))}
                    </Stack>
                  )}

                  <Text
                    mt={2}
                    color="blue.500"
                    cursor="pointer"
                    onClick={onEventOpen}
                  >
                    Pročitaj cijelu obavijest
                  </Text>

                  <Modal isOpen={isEventOpen} onClose={onEventClose} size="xl">
                    <ModalOverlay bg="blackAlpha.300" />
                    <ModalContent>
                      <ModalHeader>{event.title}</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>{event.content}</Text>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={onEventClose}>Zatvori</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>

                {isLoggedIn && (
                  <>
                    <Button
                      colorScheme="red"
                      m={4}
                      size="sm"
                      variant="outline"
                      color="black"
                      borderColor="rgba(23,24,16)"
                      _hover={{
                        bg: "#86654b",
                        color: "RGBA(248, 245, 240)",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        // inicijaliziraj formData s trenutnim vrijednostima eventa
                        setFormData({
                          title: event.title || "",
                          summary: event.summary || "",
                          content: event.content || "",
                        });
                        onFormOpen(); // otvara modal
                      }}
                    >
                      Uredi
                    </Button>

                    <Modal isOpen={isFormOpen} onClose={onFormClose} size="xl">
                      <ModalOverlay bg="blackAlpha.300" />
                      <ModalContent>
                        <ModalHeader>Uredi obavijest</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <FormControl mb={3}>
                            <FormLabel>Naslov</FormLabel>
                            <Input
                              value={formData.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  title: e.target.value,
                                })
                              }
                            />
                          </FormControl>

                          <FormControl mb={3}>
                            <FormLabel>Sažetak</FormLabel>
                            <Textarea
                              value={formData.summary}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  summary: e.target.value,
                                })
                              }
                            />
                          </FormControl>

                          <FormControl mb={3}>
                            <FormLabel>Sadržaj</FormLabel>
                            <Textarea
                              value={formData.content}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  content: e.target.value,
                                })
                              }
                            />
                          </FormControl>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            m={4}
                            variant="outline"
                            color="black"
                            borderColor="rgba(23,24,16)"
                            _hover={{
                              bg: "#86654b",
                              color: "RGBA(248, 245, 240)",
                              fontWeight: "bold",
                            }}
                            onClick={() => handleSave(event.id)}
                          >
                            Spremi
                          </Button>
                          <Button m={4} variant="outline" onClick={onFormClose}>
                            Odustani
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    <Button
                      colorScheme="red"
                      variant="outline"
                      m={4}
                      size="sm"
                      onClick={async () => {
                        try {
                          const token = sessionStorage.getItem("token");

                          const res = await fetch(
                            `${API_URL}/api/notifications/${event.id}`,
                            {
                              method: "DELETE",
                              headers: {
                                Authorization: `Bearer ${token}`, // <-- token ovdje
                              },
                            }
                          );
                          if (res.ok) {
                            setEvents((prev) =>
                              prev.filter((e) => e.id !== event.id)
                            );
                            setFilteredEvents((prev) =>
                              prev.filter((e) => e.id !== event.id)
                            );
                          } else {
                            console.error("Greška kod brisanja obavijesti");
                          }
                        } catch (err) {
                          console.error("Došlo je do greške:", err);
                        }

                        console.log(events);
                        console.log("event id: ", event.id);
                      }}
                    >
                      Obriši
                    </Button>
                  </>
                )}
              </Box>
            ))}
          </SimpleGrid>
          {/* Gumb za učitavanje više */}
          {visibleCount < filteredEvents.length && (
            <Box textAlign="center" mt={4}>
              <Button
                onClick={handleLoadMore}
                mt={4}
                variant="outline"
                color="black"
                borderColor="rgba(23,24,16)"
                w="full"
                _hover={{
                  bg: "#86654b",
                  color: "RGBA(248, 245, 240)",
                  fontWeight: "bold",
                }}
              >
                Prikaži još obavijesti
              </Button>
            </Box>
          )}
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
            Raspored bogoslužja
          </Heading>
          <ChakraLink
            href="/raspored-bogosluzja"
            color="teal.800"
            fontWeight="medium"
            _hover={{ textDecoration: "underline" }}
          >
            <HStack spacing={2}>
              <FaRegCalendarAlt />
              <Text>Pogledaj ovdje</Text>
            </HStack>
          </ChakraLink>

          {/* Linkovi */}
          <Heading size="md" margin={2} marginTop="1em">
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
                          const token = sessionStorage.getItem("token");

                          const res = await fetch(
                            `${API_URL}/api/links/${link.id}`,
                            {
                              method: "DELETE",
                              headers: {
                                Authorization: `Bearer ${token}`, // <-- token ovdje
                              },
                            }
                          );
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
          <Heading size="md" margin={2} marginTop="1em">
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
                          const token = sessionStorage.getItem("token");

                          const res = await fetch(
                            `${API_URL}/api/events/${event.id}`,
                            {
                              method: "DELETE",
                              headers: {
                                Authorization: `Bearer ${token}`, // <-- token ovdje
                              },
                            }
                          );
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
            bg="RGBA(248, 245, 240)"
            p={4}
            borderRadius="md"
            mb={6}
            boxShadow="sm"
            marginTop="1.5em"
          >
            <Box
              mx="auto"
              mt={10}
              p={6}
              borderWidth={1}
              borderRadius="lg"
              shadow="md"
              bg="white"
            >
              <Text fontSize="xl">Dodavanje nove obavijesti</Text>
              <Text marginTop=".5em">
                Unesite naslov, sažetak, sadržaj i odaberite kategoriju
                obavijesti. Odaberite naslovnu sliku i galerijske slike (više
                slika). Kliknite na gumb <strong>„Objavi”</strong> kako bi se
                obavijest pohranila. Promjena će biti vidljiva nakon
                osvježavanja preglednika{" "}
                <Icon
                  as={FiRefreshCw}
                  ml={1}
                  boxSize={4}
                  verticalAlign="middle"
                />
              </Text>

              <form onSubmit={handleSubmit}>
                <VStack spacing={4} mt={4}>
                  <FormControl isRequired>
                    <FormLabel>Naslov</FormLabel>
                    <Input
                      type="text"
                      placeholder="Unesite naslov"
                      value={notification.title}
                      onChange={(e) =>
                        setNotification({
                          ...notification,
                          title: e.target.value,
                        })
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Sažetak</FormLabel>
                    <Textarea
                      placeholder="Unesite sažetak"
                      value={notification.summary}
                      onChange={(e) =>
                        setNotification({
                          ...notification,
                          summary: e.target.value,
                        })
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Sadržaj</FormLabel>
                    <Textarea
                      placeholder="Unesite sadržaj obavijesti"
                      value={notification.content}
                      onChange={(e) =>
                        setNotification({
                          ...notification,
                          content: e.target.value,
                        })
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Kategorija obavijesti</FormLabel>
                    <Select
                      placeholder="Odaberite kategoriju"
                      value={notification.categoryId}
                      onChange={(e) =>
                        setNotification({
                          ...notification,
                          categoryId: e.target.value,
                        })
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Naslovna slika</FormLabel>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setNotification({
                          ...notification,
                          coverPhoto: e.target.files[0],
                        })
                      }
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Galerijske slike</FormLabel>
                    <Input
                      type="file"
                      multiple
                      onChange={handleGalleryChange}
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
            <Text fontSize="xl">Dodavanje preporučenog sadržaja</Text>
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

          <Box
            mx="auto"
            mt={10}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            shadow="md"
            bg="white"
          >
            <Text fontSize="xl">Dodavanje nadolazećeg događaja</Text>
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
        </Box>
      ) : (
        <></>
      )}

      {/* Modal za prikaz slike */}
      <Modal isOpen={isImageOpen} onClose={onImageClose} isCentered size="xl">
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

                {/* Gumb za brisanje slike */}
                {isLoggedIn ? (
                  <>
                    <Box px={4} pb={4}>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={async () => {
                          if (
                            !currentNotificationId ||
                            selectedImageIndex === null
                          )
                            return;

                          const photoId = currentGallery[selectedImageIndex].id;

                          const token = sessionStorage.getItem("token");

                          const res = await fetch(
                            `${API_URL}/api/notifications/${currentNotificationId}/photos/${photoId}`,
                            {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${sessionStorage.getItem(
                                  "token"
                                )}`,
                              },
                            }
                          );

                          if (res.ok) {
                            setCurrentGallery((prev) =>
                              prev.filter(
                                (_, idx) => idx !== selectedImageIndex
                              )
                            );
                            setSelectedImageIndex(null);
                            onImageClose();
                          } else {
                            const err = await res.json();
                            alert(
                              err.error || "Greška prilikom brisanja slike"
                            );
                          }
                        }}
                      >
                        Obriši fotografiju
                      </Button>
                    </Box>
                  </>
                ) : (
                  <></>
                )}

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
