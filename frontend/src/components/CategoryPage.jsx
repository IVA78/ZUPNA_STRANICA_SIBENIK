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
  Flex,
} from "@chakra-ui/react";
import PolaroidFrame from "./PolaroidFrame";

const CategoryPage = ({ categoryId }) => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/pages/dto/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setPage(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška pri dohvatu stranice:", err);
        setLoading(true);
      });
  }, [categoryId]);

  useEffect(() => {
    fetch(`/api/notifications/category/${categoryId}`)
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

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <>
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
