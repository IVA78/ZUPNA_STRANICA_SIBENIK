import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
  Stack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Prijava nije uspjela.");
      }

      const data = await response.json();
      console.log("Uspješna prijava:", data.token);
      // spremi token
      sessionStorage.setItem("token", data.token);

      onClose();

      navigate("/dashboard");
    } catch (error) {
      console.error("Greška prilikom prijave:", error);
    }
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
            onClick={onOpen}
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
            Izrada web stranice: <strong>Iva Pavičić</strong>
          </Text>
          <Text fontSize="sm" color="gray.600" mb={2}>
            Student @FER
          </Text>
          <Text fontSize="xl">Email: ivapavicicc@gmail.com</Text>
        </Box>
      </Flex>

      <Divider my={6} />

      <Text fontSize="sm" textAlign="center" color="gray.500">
        &copy; {new Date().getFullYear()} Župa sv. Petra, Vidici. Sva prava
        pridržana.
      </Text>

      {/* Modal za prijavu */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Prijava</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Korisničko ime</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Unesite korisničko ime"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Lozinka</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Unesite lozinku"
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              mt={4}
              variant="outline"
              color="black"
              borderColor="rgba(23,24,16)"
              _hover={{
                bg: "#86654b",
                color: "RGBA(248, 245, 240)",
                fontWeight: "bold",
              }}
              onClick={handleLogin}
            >
              Prijavi se
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Footer;
