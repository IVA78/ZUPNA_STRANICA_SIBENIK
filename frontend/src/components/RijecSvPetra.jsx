import { useEffect, useState } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import citati from "../data/citati.json"; // 🔹 put do tvog JSON-a

const RijecSvPetra = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % citati.length);
    }, 7000); // mijenja citat svakih 7 sekundi

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      p={5}
      bg="RGBA(248, 245, 240, 0.7)"
      borderRadius="lg"
      shadow="md"
      textAlign="center"
      mx="auto"
    >
      <Heading size="md" mb={3} color="#86654b">
        Riječ sv. Petra
      </Heading>
      <Text fontStyle="italic" fontSize="xl" transition="opacity 0.5s">
        {citati[index]}
      </Text>
    </Box>
  );
};

export default RijecSvPetra;
