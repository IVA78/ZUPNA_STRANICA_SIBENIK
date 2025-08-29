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
  HStack,
  Link,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PhoneIcon, EmailIcon, InfoIcon } from "@chakra-ui/icons";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Footer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
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

      // spremi token
      sessionStorage.setItem("token", data.token);

      onClose();

      navigate("/upute");
    } catch (error) {
      console.error("Greška prilikom prijave:", error);
    }
  };

  return (
    <Box p={5} bg="RGBA(248, 245, 240)" borderRadius="md" margin={3}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="flex-start" // 🔹 uvijek poravnato gore
        gap={10}
        marginBottom={3}
      >
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Heading size="sm" mb={2} fontSize="xl">
            Kontakt podaci
          </Heading>

          <Stack spacing={2} fontSize="lg">
            <HStack>
              <PhoneIcon color="black" />
              <Text>00 385 22 339 840</Text>
            </HStack>

            <HStack>
              <EmailIcon color="black" />
              <Text>info.vidici@gmail.com</Text>
            </HStack>

            <HStack>
              <InfoIcon color="black" />
              <Text>Žiro račun: IBAN HR41 23600001101928847</Text>
            </HStack>
          </Stack>
          <Link
            href="/kontakt"
            color="black"
            fontWeight="medium"
            mt={3}
            display="inline-block"
            _hover={{ textDecoration: "underline", color: "#86654b" }}
          >
            ➤ Više na...
          </Link>
        </Box>

        {/* 🔹 Društvene mreže */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Heading size="sm" mb={3} fontSize="xl">
            Zapratite nas
          </Heading>
          <HStack marginTop={5}>
            <Box display="flex">
              <Link
                href="https://www.facebook.com/zupavidicisibenik/"
                isExternal
                _hover={{ color: "#4267B2" }}
              >
                <FaFacebook size="28" />
              </Link>
              <Text marginLeft={2} fontSize="xl">
                Župa Vidici
              </Text>
            </Box>
          </HStack>
          <HStack marginTop={5}>
            <Box display="flex">
              <Link
                href="https://www.instagram.com/zupavidici/"
                isExternal
                _hover={{ color: "#C13584" }}
              >
                <FaInstagram size="28" />
              </Link>
              <Text marginLeft={2} fontSize="xl">
                Župa sv. Petra Vidici
              </Text>
            </Box>
          </HStack>
        </Box>

        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
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

        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
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
