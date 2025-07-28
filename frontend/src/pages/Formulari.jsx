import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Box,
  Heading,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Formulari = () => {
  const [formulari, setFormulari] = useState([]);

  useEffect(() => {
    fetch("/api/forms")
      .then((res) => res.json())
      .then((data) => setFormulari(data))
      .catch((err) => console.error("Greška pri dohvaćanju formulara:", err));
  }, []);

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
            sakramente, potvrda i drugih važnih dokumenata. Klikom na naziv
            dokumenta započinje preuzimanje.
          </Text>
        </Box>

        {formulari.length === 0 ? (
          <Text color="gray.500">Trenutno nema formulara za preuzimanje.</Text>
        ) : (
          <Stack spacing={4} bg="RGBA(248, 245, 240)">
            {formulari.map((f) => (
              <Box
                key={f.id}
                p={3}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
                bg="white"
                margin={2}
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
              </Box>
            ))}
          </Stack>
        )}
      </Box>
      <Footer></Footer>
    </div>
  );
};

export default Formulari;
