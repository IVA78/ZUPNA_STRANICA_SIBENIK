import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import emailjs from "@emailjs/browser";

import { useState } from "react";

import {
  Grid,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  useToast,
  Stack,
  Text,
  Textarea,
  Heading,
  Image,
} from "@chakra-ui/react";
import PolaroidFrame from "../components/PolaroidFrame";

import crkva from "../assets/crkva.jpg";

const Kontakt = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const toast = useToast();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleButtonClick = () => {
    const serviceId = "service_cc0ja98";
    const templateId = "template_aoshg5k";
    const publicKey = "tko5L_ezcdg4GJ9FL";

    const data = {
      from_name: name,
      from_email: email,
      to_name: "Iva",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, data, publicKey)
      .then((response) => {
        //izgeneriraj Toast komponentu za uspjesno poslan upit
        toast({
          title: "Uspješno poslan upit!",
          description: "Uspješno ste poslali upit.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((e) => {
        console.log("Error sending email: ", e);
      });
  };

  return (
    <div>
      <Navbar></Navbar>

      <Grid
        templateColumns={{ base: "1fr", md: "4fr 4fr", lg: "5fr 4fr" }}
        p={5}
        bg="RGBA(248, 245, 240)"
        borderRadius="md"
        margin={3}
      >
        <Box
          p="1em"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text fontSize="xl">
            Ovdje možete pronaći informacije o župi i kontakt podatke.
          </Text>
          <PolaroidFrame imageSrc={crkva} altText="Župa sv. Petra" />
        </Box>

        <Box
          bg="white"
          gap={4}
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
          color="RGBA(23,24,16)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          backgroundColor="RGBA(248, 245, 240)"
        >
          <Heading size="md" marginTop={3}>
            Šibenska biskupija
          </Heading>
          <Heading size="lg">ŽUPA SV. PETRA, VIDICI</Heading>

          <Text>
            {" "}
            <strong>Adresa:</strong> 8. dalmatinske udarne brigade 21, HR –
            22000, Šibenik
          </Text>

          <Stack spacing={1}>
            <Text>
              <strong>Telefon:</strong> 0916018412
            </Text>
            <Text>
              <strong>E-mail:</strong> info.vidici@gmail.com
            </Text>
            <Text>
              <strong>E-mail župnik:</strong> zeljko.klaric@gmail.com
            </Text>
          </Stack>

          <Stack spacing={1}>
            <Text>
              <strong>OIB:</strong> 32366285585
            </Text>
            <Text>
              <strong>Matični broj:</strong> 1101928947
            </Text>
            <Text>
              <strong>Žiro račun:</strong> IBAN HR41 23600001101928847
            </Text>
          </Stack>

          <Text fontWeight="bold" marginBottom={3}>
            Župnik: fra Željko Klarić, OFMConv
          </Text>
        </Box>
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "4fr 6fr" }}
        gap={6}
        padding="1em"
        bg="RGBA(248, 245, 240)"
        borderRadius="md"
        margin={3}
      >
        <Box
          padding="1em"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="xl">
            Ako imate pitanje, prijedlog, želite zatražiti sakrament ili
            kontaktirati župni ured, ispunite kontakt obrazac prema sljedećim
            uputama:
            <br />
            <br />
            Molimo vas da <strong>ispravno unesete</strong> sljedeće podatke:
            <br />
            <strong>Ime i prezime</strong>:* Vaše puno ime
            <br />
            <strong>Email adresa</strong>:* Aktivna email adresa kako bismo vam
            mogli odgovoriti
            <br />
            <strong>Poruka</strong>:* Detaljno napišite svoje pitanje ili poruku
            <br />
            <br />
            Kliknite na gumb <strong>"Pošalji"</strong> nakon ispunjavanja
            kontaktne forme.
            <br />
            <br />
          </Text>
        </Box>
        <Box position="relative" width="100%" boxShadow="md">
          <Box
            textAlign="center"
            padding="1em"
            color="RGBA(23,24,16)"
            borderRadius="md"
            width={{ base: "100%", lg: "100%" }}
            height={{ base: "100%", lg: "100%" }}
            fontSize="3em"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor="RGBA(248, 245, 240)"
            boxShadow="md"
          >
            <FormControl>
              <Stack spacing={1}>
                <FormLabel>Ime i prezime</FormLabel>
                <Input
                  type="name"
                  value={name}
                  onChange={handleNameChange}
                  borderColor="RGBA(23,24,16)"
                  bg="white"
                />
              </Stack>
            </FormControl>

            <FormControl>
              <Stack spacing={1}>
                <FormLabel>Email addresa</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  borderColor="RGBA(23,24,16)"
                  bg="white"
                />
              </Stack>
            </FormControl>

            <FormControl>
              <Stack spacing={1}>
                <FormLabel>Poruka</FormLabel>
                <Textarea
                  type="message"
                  value={message}
                  onChange={handleMessageChange}
                  height="8em"
                  borderColor="RGBA(23,24,16)"
                  bg="white"
                />
              </Stack>
            </FormControl>

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
              marginTop={{ base: "1em", lg: "3em" }}
              onClick={handleButtonClick}
            >
              Pošalji!
            </Button>
          </Box>
        </Box>
      </Grid>
      <Footer></Footer>
    </div>
  );
};

export default Kontakt;
