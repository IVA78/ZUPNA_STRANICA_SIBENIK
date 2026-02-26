// Dashboard.jsx
import {
  Box,
  Button,
  Stack,
  Heading,
  Text,
  VStack,
  Divider,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Stack spacing={8} align="center" p={8}>
        <Heading mb={4} textAlign="center" textTransform="uppercase">
          UPUTE ZA PRIJAVLJENE KORISNIKE
        </Heading>
        <Text fontSize="lg" textAlign="center" maxW="800px">
          Dobrodošao/la!
        </Text>
        <Text fontSize="lg" textAlign="center" maxW="800px">
          Ovdje pristupaš uputama o svim administrativnim funkcijama dostupnim
          samo prijavljenim korisnicima.
        </Text>

        <Alert status="info" maxW="800px" borderRadius="lg" flexWrap="wrap">
          <AlertIcon />
          Nakon svake promjene potrebno je osvježiti preglednik kako bi bile
          vidljive najnovije izmjene.
        </Alert>
        <Alert status="info" maxW="800px" borderRadius="lg" flexWrap="wrap">
          <AlertIcon />U slučaju isteka sesije (2 sata), što se može
          manifestirati nefunkcioniranjem određenih funkcionalnosti, potrebno je
          ponovno se prijaviti u sustav.
        </Alert>
        <Alert status="info" maxW="800px" borderRadius="lg" flexWrap="wrap">
          <AlertIcon />
          Preporuka je svim fotografijama u sustavu dodijeliti jedinstven naziv
          kod učitavanja.
        </Alert>

        <VStack spacing={6} align="stretch" maxW="800px">
          <Divider />

          <Box>
            <Heading as="h3" size="md" mb={2}>
              📝 Stranice
            </Heading>
            <Text>
              Upravljanje stranicama moguće je na <b>podstranicama </b>,
              dostupnima u navigacijskoj traci. Na svakoj stranici (izuzev
              stranice Početna) možete:
            </Text>
            <ul style={{ marginLeft: "1.5em", marginTop: "0.5em" }}>
              <li>urediti naslov podstranice</li>
              <li>urediti tekst koji se nalazi na podstranici</li>
              <li>dodati, brisati/promijeniti naslovnu fotografiju stranice</li>
            </ul>
            <Text mt={2}>
              Nakon dodavanja ili uređivanja stranice, potrebno je{" "}
              <i>osvježiti preglednik</i> kako bi se promjene prikazale.
            </Text>
          </Box>

          <Divider />

          <Box>
            <Heading as="h3" size="md" mb={2}>
              📰 Obavijesti
            </Heading>
            <Text>
              Objava i uređivanje obavijesti vrši se na stranici <b>Početna</b>.
            </Text>
            <Text mt={2}>
              Kako biste vidjeli promjene nakon uređivanja ili dodavanja
              obavijesti, potrebno je <i>osvježiti preglednik</i>.
            </Text>
            <Text mt={2}>
              Za pregled obavijesti prema temama koristite{" "}
              <b>filter po kategoriji</b>i prikazat će se samo obavijesti iz
              željene kategorije.
            </Text>
            <Text mt={2}>
              Fotografije određene obavijesti mogu se obrisati na stranici{" "}
              <b>Početna</b>. Klikom na neku od fotografija i otvaranjem
              galerije možete naći željenu fotografiju.
            </Text>
            <Text mt={2}>
              Dijeljenje određene objave može se napraviti{" "}
              <b>kopiranjem linka na podstranici pripadajuće kategorije</b>{" "}
              obavijesti.
            </Text>
          </Box>

          <Divider />

          <Box>
            <Heading as="h3" size="md" mb={2}>
              📅 Najave događanja i poveznice
            </Heading>
            <Text>
              Na stranici <b>Početna</b> možete:
            </Text>
            <ul style={{ marginLeft: "1.5em", marginTop: "0.5em" }}>
              <li>dodati najavu novog događanja,</li>
              <li>objaviti korisne poveznice,</li>
              <li>obrisati postojeće najave i poveznice.</li>
            </ul>
          </Box>
          <Divider />

          <Box>
            <Heading as="h3" size="md" mb={2}>
              📑 Upravljanje formularima
            </Heading>
            <Text>
              Dodavanje i brisanje formulara moguće je na podstranici{" "}
              <b>Formulari</b>, dostupnoj u navigacijskoj traci.
            </Text>
          </Box>
          <Divider />

          <Box>
            <Heading as="h3" size="md" mb={2}>
              📷 Fotogalerija
            </Heading>
            <Text>
              Galerija fotografija se automatski puni prilikom objave
              obavijesti. Potrebno je samo dodati željene fotografije tijekom
              objavljivanja.
            </Text>
          </Box>
        </VStack>

        <Box maxW="800px">
          <Heading as="h3" size="md" mb={2}>
            🚪 Odjava
          </Heading>
          <Text>
            Odjava se vrši izravno na ovoj stranici pod naslovom <b>UPUTE</b>.
            Klikom na gumb <b>Odjavi se</b> završava tvoja sesija i vraćaš se na
            početnu stranicu.
          </Text>
        </Box>

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
          onClick={handleLogout}
          fontSize="xl"
        >
          Odjavi se
        </Button>
        <Divider />
      </Stack>

      <Footer />
    </>
  );
};

export default Dashboard;
