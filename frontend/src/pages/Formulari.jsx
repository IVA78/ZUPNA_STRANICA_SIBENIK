import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Stack,
  Text,
  useToast,
  Icon,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

const Formulari = () => {
  const [formulari, setFormulari] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
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
        const res = await fetch("/api/auth/verify", {
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
    fetch("/api/forms")
      .then((res) => res.json())
      .then((data) => setFormulari(data))
      .catch((err) => console.error("Greška pri dohvaćanju formulara:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !file) {
      toast({
        title: "Greška",
        description: "Molim unesite ime i odaberite datoteku.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch("/api/forms", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // <-- token ovdje
        },
        body: formData,
      });

      if (res.ok) {
        toast({
          title: "Uspješno!",
          description: "Formular je poslan.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setName("");
        setFile(null);
      } else {
        throw new Error("Došlo je do greške.");
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

  return (
    <div>
      <Navbar></Navbar>
      <Box p={4}>
        <Box
          bg="RGBA(248, 245, 240)"
          p={4}
          borderRadius="md"
          mb={6}
          boxShadow="sm"
        >
          <Text fontSize="xl" color="gray.700">
            Na ovoj stranici možete preuzeti razne formulare i dokumente koje
            župa stavlja na raspolaganje, poput prijavnica, obrazaca za
            sakramente, potvrda i drugih važnih dokumenata.{" "}
            <strong>Klikom</strong> na naziv dokumenta{" "}
            <strong>započinje preuzimanje</strong>.
          </Text>
        </Box>

        {formulari.length === 0 ? (
          <Text color="gray.500">Trenutno nema formulara za preuzimanje.</Text>
        ) : (
          <Stack spacing={4} bg="RGBA(248, 245, 240)">
            {formulari.map((f) => (
              <Box
                key={f.id}
                p={5}
                paddingRight={10}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
                bg="white"
                margin={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <ChakraLink
                  href={`/api/forms/${f.id}/download`}
                  isExternal
                  color="teal.600"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                >
                  📄 {f.name}
                </ChakraLink>
                {isLoggedIn && (
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    onClick={async () => {
                      try {
                        const res = await fetch(`/api/forms/${f.id}`, {
                          method: "DELETE",
                        });
                        if (res.ok) {
                          // makni iz state-a bez refreša
                          setFormulari((prev) =>
                            prev.filter((x) => x.id !== f.id)
                          );
                        } else {
                          console.error("Greška kod brisanja formulara");
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
        {isLoggedIn ? (
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
              <Text fontSize="xl">Upute za učitavanje novog formulara</Text>
              <Text marginTop=".5em">
                Za učitavanje novog formulara potrebno je najprije upisati ime
                ili naslov formulara koji će se prikazivati korisnicima
                stranice. Nakon toga odaberite datoteku klikom na gumb{" "}
                <strong>„Odaberi datoteku”</strong>. Kada unesete sve potrebne
                podatke, kliknite na gumb <strong>„Objavi”</strong> kako bi se
                formular pohranio u bazu podataka. Promjena će biti vidljiva
                nakon osvježavanja preglednika{" "}
                <Icon
                  as={FiRefreshCw}
                  ml={1}
                  boxSize={4}
                  verticalAlign="middle"
                />
              </Text>
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
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <Text fontSize="xl">Dodavanje novog formulara</Text>
                  <FormControl isRequired>
                    <FormLabel>Ime formulara</FormLabel>
                    <Input
                      type="text"
                      placeholder="Unesite ime"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Datoteka</FormLabel>
                    <Input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
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
      </Box>
      <Footer></Footer>
    </div>
  );
};

export default Formulari;
