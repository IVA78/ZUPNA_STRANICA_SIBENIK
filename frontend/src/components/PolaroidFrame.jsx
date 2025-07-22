import { Box, Image } from "@chakra-ui/react";

const PolaroidFrame = ({ imageSrc, altText = "Polaroid" }) => {
  return (
    <Box position="relative" display="inline-block" marginTop={5}>
      {/* Donji sloj */}
      <Box
        position="absolute"
        top="10px"
        left="10px"
        w="100%"
        h="100%"
        bg="gray.300"
        borderRadius="10px"
        boxShadow="lg"
        transform="rotate(-4deg)"
      />

      {/* Srednji sloj */}
      <Box
        position="absolute"
        top="5px"
        left="5px"
        w="100%"
        h="100%"
        bg="gray.200"
        borderRadius="10px"
        boxShadow="md"
        transform="rotate(2deg)"
      />

      {/* Glavni sloj sa slikom */}
      <Box
        bg="white"
        p="4"
        borderRadius="10px"
        boxShadow="xl"
        position="relative"
      >
        <Image src={imageSrc} alt={altText} borderRadius="5px" />
      </Box>

      {/* Spajalica */}
      <Box
        position="absolute"
        top="-10px"
        right="10px"
        width="20px"
        height="40px"
        bg="gray.500"
        borderRadius="full"
        transform="rotate(20deg)"
        zIndex="2"
      />
    </Box>
  );
};

export default PolaroidFrame;
