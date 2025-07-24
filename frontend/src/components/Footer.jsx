import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
  Stack,
  Divider,
} from "@chakra-ui/react";

const Footer = () => {
  const handleButtonClick = () => {
    console.log("Clicked!");
  };

  return (
    <Box p={5} bg="RGBA(248, 245, 240)" borderRadius="md" margin={3}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={10}
        marginBottom={3}
      >
        <Box flex="1">
          <Heading size="sm" mb={2} fontSize="xl">
            Riječ sv. Petra
          </Heading>
          <Text fontStyle="italic" maxW="400px" fontSize="xl">
            „Budite trijezni, bdijte! Protivnik vaš đavao obilazi kao ričući
            lav, tražeći koga da proždre.” (1 Pt 5,8)
          </Text>
        </Box>

        <Box flex="1">
          <Heading size="sm" mb={2} fontSize="xl">
            PRIJAVA
          </Heading>
          <Button
            size="lg"
            mt={4}
            variant="outline"
            color="black"
            borderColor="rgba(23,24,16)"
            _hover={{
              bg: "#86654b",
              color: "RGBA(248, 245, 240)",
              fontWeight: "bold",
            }}
            marginTop={{ base: "1em", lg: "3em" }}
            onClick={handleButtonClick}
            fontSize="xl"
          >
            Ulaz za autore
          </Button>
        </Box>

        <Box flex="1">
          <Heading size="sm" mb={2} fontSize="xl">
            Autor
          </Heading>
          <Text fontSize="xl">
            Izrada web stranice: <strong>Iva Svalina</strong>
          </Text>
          <Text fontSize="sm" color="gray.600" mb={2}>
            Student @FER
          </Text>
          <Text fontSize="xl">Email: isvalina3@gmail.com</Text>
        </Box>
      </Flex>

      <Divider my={6} />

      <Text fontSize="sm" textAlign="center" color="gray.500">
        &copy; {new Date().getFullYear()} Župa sv. Petra, Vidici. Sva prava
        pridržana.
      </Text>
    </Box>
  );
};

export default Footer;
