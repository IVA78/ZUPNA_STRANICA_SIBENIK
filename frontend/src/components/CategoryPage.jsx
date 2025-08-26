// src/components/CategoryPage.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Stack,
  Image,
  SimpleGrid,
  Input,
  Button,
  Textarea,
  Flex,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import PolaroidFrame from "./PolaroidFrame";

const API_URL = import.meta.env.VITE_API_URL;

const CategoryPage = ({ categoryId }) => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [deleteImage, setDeleteImage] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toast = useToast();

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

  useEffect(() => {
    fetch(`${API_URL}/api/pages/dto/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setPage(data);
        setTitle(data.title);
        setText(data.text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška pri dohvatu stranice:", err);
        setLoading(true);
      });
  }, [categoryId]);

  useEffect(() => {
    fetch(`${API_URL}/api/notifications/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setNotifLoading(false);
      })
      .catch((err) => {
        console.error("Greška pri dohvatu obavijesti:", err);
        setNotifLoading(true);
      });
  }, [categoryId]);

  const handleUpdatePage = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    if (imageFile) formData.append("image", imageFile);
    formData.append("deleteImage", deleteImage ? "true" : "false");

    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/pages/${page.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // <-- token ovdje
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Greška pri ažuriranju stranice");

      const updated = await res.json();
      setPage(updated);
      setDeleteImage(false);
      setImageFile(null);

      toast({
        title: "Uspjeh",
        description: "Stranica je uspješno ažurirana!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom ažuriranja stranice.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <>
      <Box>
        <Box
          borderRadius="md"
          mx="auto"
          p={6}
          bg="RGBA(248, 245, 240)"
          margin={3}
        >
          <Heading as="h2" size="xl">
            {page.title}
          </Heading>
          {page.imageUrl && (
            <PolaroidFrame imageSrc={page.imageUrl} altText={page.title} />
          )}
          <Box mt={6}>
            <Box
              className="page-text"
              fontSize="md"
              lineHeight="1.8"
              dangerouslySetInnerHTML={{ __html: page.text }}
            />
          </Box>
        </Box>
        {isLoggedIn && (
          <>
            <Box
              borderRadius="md"
              mx="auto"
              p={6}
              bg="RGBA(248, 245, 240)"
              margin={3}
            >
              <Text mb={4} fontSize="md" color="gray.700">
                Ovdje možete urediti naslov, tekst i naslovnu fotografiju
                stranice. Ako stranica trenutno nema sliku, možete ju dodati.
                Ako naslovna fotografija postoji, možete ju obrisati klikom na
                ikonu kante za smeće. U slučaju brisanja, možete ponovno dodati
                novu fotografiju.
                <br></br>
                <b>Upute za autora teksta:</b>
                <ul style={{ marginLeft: "2em" }}>
                  <li>
                    <code>&lt;p&gt; ... &lt;/p&gt;</code> – koristi se za
                    označavanje pasusa, tj. za grupiranje jednog ili više
                    rečenica koje pripadaju zajedno.
                  </li>
                  <li>
                    <code>&lt;br&gt;</code> – koristi se za umetanje prijeloma
                    linije unutar pasusa, bez stvaranja novog pasusa.
                  </li>
                  <li>
                    <code>&lt;ul&gt;</code> i <code>&lt;li&gt;</code> – za
                    navođenje popisa stavki.
                  </li>
                  <li>
                    <code>&lt;b&gt;</code> ili <code>&lt;strong&gt;</code> – za
                    isticanje teksta (bold).
                  </li>
                  <li>
                    <b>
                      HTML tagove koristite samo unutar polja za tekst kako bi
                      se sadržaj pravilno prikazao.{" "}
                    </b>
                  </li>
                </ul>
              </Text>
              <Input
                mb={3}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Naslov stranice"
                size="lg"
              />
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tekst stranice"
                rows={8}
                mb={3}
              />
              {page.imageUrl && !deleteImage && (
                <Flex align="center" mb={3}>
                  <Text>Naslovna fotografija </Text>
                  <IconButton
                    aria-label="Obriši sliku"
                    icon={<DeleteIcon />}
                    ml={3}
                    colorScheme="red"
                    onClick={() => setDeleteImage(true)}
                  />
                </Flex>
              )}
              {!page.imageUrl || deleteImage ? (
                <Input
                  type="file"
                  mb={3}
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              ) : null}

              <Button
                size="lg"
                variant="outline"
                color="black"
                borderColor="rgba(23,24,16)"
                _hover={{
                  bg: "#86654b",
                  color: "RGBA(248, 245, 240)",
                  fontWeight: "bold",
                }}
                marginTop={{ base: "1em", lg: "3em" }}
                onClick={handleUpdatePage}
              >
                Spremi promjene
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* Obavijesti */}
      <Box
        p={5}
        bg="RGBA(248, 245, 240)"
        borderRadius="md"
        margin={3}
        marginBottom={3}
      >
        <Heading size="lg" mb={4}>
          Obavijesti
        </Heading>

        {notifLoading ? (
          <Spinner size="md" />
        ) : notifications.length === 0 ? (
          <Text color="gray.500">Trenutno nema obavijesti.</Text>
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={6}
            bg="RGBA(248, 245, 240)"
            borderRadius="md"
            padding={3}
          >
            {notifications.map((event) => (
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
        )}
      </Box>
    </>
  );
};

export default CategoryPage;
