// Dashboard.jsx
import { Box, Button, Stack, Heading, Text } from "@chakra-ui/react";
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
      <Navbar></Navbar>
      <Stack spacing={6} align="center">
        <Box p={8}>
          <Heading mb={4}> Dobrodošao u kontrolnu ploču!</Heading>
          <Text>Ovdje vidiš sadržaj samo ako si prijavljen.</Text>
          <Text>
            Formulari se dodaju i brišu na podstranici formulari koja se može
            naći u navigacijskoj traci.
          </Text>
          <Text>
            Najava novih događanja, objavljivanje korisnih poveznica i brisanje
            istih može se napraviti na početnoj stranici.
          </Text>
        </Box>
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
          onClick={handleLogout}
          fontSize="xl"
        >
          Odjavi se
        </Button>
      </Stack>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
