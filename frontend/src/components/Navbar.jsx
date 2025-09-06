import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Link,
  Image,
  GridItem,
  Grid,
  Divider,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
} from "@chakra-ui/react";
import { ArrowRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FiHome } from "react-icons/fi";
import { Icon } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  FaPrayingHands,
  FaBook,
  FaRoute,
  FaWpforms,
  FaEnvelope,
} from "react-icons/fa";

import { useEffect, useState } from "react";

import logo from "../assets/logo.jpg";

const API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // provjera na mount
  useEffect(() => {
    async function checkLogin() {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/verify`, {
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

  return (
    <Box as="nav" bg="#f8f5f0" p="1em">
      <Grid templateColumns="repeat(6, 1fr)" alignItems="center">
        <GridItem
          colSpan={{ base: 5, lg: 5, xl: 1 }}
          display="flex"
          alignItems="center"
          marginLeft={2}
        >
          <Image
            src={logo}
            alt="Logo"
            maxWidth={{ base: "5em", lg: "12em", xl: "12em" }}
            maxHeight={{ base: "6em", lg: "8em", xl: "8em" }}
            marginRight={{ base: "1em", lg: "2em", xl: "2em" }}
          />
          <Flex
            direction="column"
            align="left"
            justify="center"
            gap={{ base: 0, lg: 1, xl: 1 }}
          >
            <Text
              fontSize={{ base: "xs", lg: "s", xl: "s" }}
              fontWeight="semibold"
            >
              Šibenska biskupija
            </Text>
            <Text
              fontSize={{ base: "2xl", lg: "4xl", xl: "4xl" }}
              fontWeight="bold"
              color="#8b6f5e"
              whiteSpace="nowrap"
            >
              ŽUPA SV. PETRA
            </Text>
            <Text
              fontSize={{ base: "xs", lg: "s", xl: "s" }}
              fontWeight="semibold"
            >
              Župa Sv. Petra, Vidici, Šibenik
            </Text>
          </Flex>
        </GridItem>

        {/*Navigacija za mobilne uređaje */}
        <GridItem
          display={{ base: "flex", lg: "flex", xl: "none" }}
          justifyContent="flex-end"
          colSpan={{ base: 1, lg: 1, xl: "none" }}
        >
          <IconButton
            colSpan={5}
            py={4}
            px={2}
            icon={<HamburgerIcon />}
            variant="ghost"
            color="#f8f5f0"
            bg="#86654b"
            fontSize="2xl"
            onClick={onOpen}
            aria-label="Open menu"
          />
        </GridItem>

        <GridItem colSpan={6} py={6} px={2}>
          <Divider borderWidth="2px" borderColor="#86654b" />
        </GridItem>

        {/*Navigacija za veće ekrane uređaje */}

        <GridItem
          colSpan={{ base: 6, lg: 4, xl: 5 }}
          display={{ base: "none", lg: "none", xl: "flex" }}
          alignItems="center"
          justifyContent="center"
        >
          <Box px={12} py={2}>
            <Flex gap={{ base: 1, lg: 1, xl: 8 }} align="center">
              <Button
                as={Link}
                href="/"
                variant="ghost"
                fontSize="xl"
                fontWeight="semibold"
                _hover={{ color: "#86654b", fontWeight: "bold" }}
              >
                POČETNA
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  color="gray.700"
                  fontSize="xl"
                  fontWeight="semibold"
                  _hover={{ color: "#86654b", fontWeight: "bold" }}
                >
                  O ŽUPI
                </MenuButton>
                <MenuList bg="white" boxShadow="lg">
                  <MenuItem
                    as="a"
                    href="/povijest-zupe"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Povijest Župe
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/sv-petar"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Sv. Petar
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/raspored-bogosluzja"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Raspored bogoslužja
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/fotogalerija"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Fotogalerija
                  </MenuItem>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  color="gray.700"
                  fontSize="xl"
                  fontWeight="semibold"
                  _hover={{ color: "#86654b", fontWeight: "bold" }}
                >
                  ŽUPNE AKTIVNOSTI
                </MenuButton>
                <MenuList bg="white" boxShadow="lg">
                  <MenuItem
                    as="a"
                    href="/zupna-kateheza"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Kateheze za odrasle
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/djecji-zbor"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Dječji zbor
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/zupni-pjevacki-zbor"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Župni pjevački zbor
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/zupno-vijece"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Župno pastoralno i ekonomsko vijeće
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/poboznosti"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Pobožnosti
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/zupni-caritas"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Župni Caritas
                  </MenuItem>
                  <Divider></Divider>

                  <MenuItem
                    as="a"
                    href="/ministranti"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Ministranti
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/mladi"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Mladi
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/kazaliste"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Kršćansko kazalište župe sv. Petra
                  </MenuItem>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  color="gray.700"
                  fontSize="xl"
                  fontWeight="semibold"
                  _hover={{ color: "#86654b", fontWeight: "bold" }}
                >
                  ŽUPNA KATEHEZA
                </MenuButton>
                <MenuList bg="white" boxShadow="lg">
                  <MenuItem
                    as="a"
                    href="/krstenje"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Krštenje
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/sveta-pricest"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Sveta Pričest
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/sveta-potvrda"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Sveta Potvrda
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/euharistija"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Euharistija
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/ispovijed"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Ispovijed
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/bolesnicko-pomazanje"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Bolesničko pomazanje
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/zenidba"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Ženidba
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/sveti-red"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Sveti red
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/blagoslov-obitelji"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Blagoslov obitelji
                  </MenuItem>
                  <Divider></Divider>
                  <MenuItem
                    as="a"
                    href="/sprovod"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Sprovod
                  </MenuItem>
                </MenuList>
              </Menu>

              <Button
                as={Link}
                href="/hodocasca"
                variant="ghost"
                fontSize="xl"
                fontWeight="semibold"
                _hover={{ color: "#86654b", fontWeight: "bold" }}
              >
                HODOČAŠĆA
              </Button>

              <Button
                as={Link}
                href="/formulari"
                variant="ghost"
                fontSize="xl"
                fontWeight="semibold"
                _hover={{ color: "#86654b", fontWeight: "bold" }}
              >
                FORMULARI
              </Button>

              <Button
                as={Link}
                href="/kontakt"
                variant="ghost"
                fontSize="xl"
                fontWeight="semibold"
                _hover={{ color: "#86654b", fontWeight: "bold" }}
              >
                KONTAKT
              </Button>

              {isLoggedIn ? (
                <Link
                  href="/upute"
                  color="gray.700"
                  fontSize="xl"
                  fontWeight="semibold"
                  _hover={{ color: "#86654b", fontWeight: "bold" }}
                >
                  UPUTE
                </Link>
              ) : (
                <></>
              )}
            </Flex>
          </Box>
        </GridItem>

        {/* DRAWER ZA MOBILNI NAVBAR */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="white">
            <DrawerCloseButton />
            <DrawerHeader fontSize="xl" fontWeight="bold" color="#8b6f5e">
              Navigacija
            </DrawerHeader>
            <DrawerBody>
              <Box px={1} py={2}>
                <Flex direction="column" gap={4}>
                  <Link
                    href="/"
                    color="gray.700"
                    fontSize="xl"
                    fontWeight="semibold"
                    _hover={{ color: "#86654b", fontWeight: "bold" }}
                  >
                    <Icon as={FiHome} boxSize={5} mr={2} color="black" />
                    POČETNA
                  </Link>

                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      color="gray.700"
                      w="full"
                      textAlign="left"
                      fontSize="xl"
                      fontWeight="semibold"
                      _hover={{ color: "#86654b", fontWeight: "bold" }}
                    >
                      <Box px={3} py={5}>
                        <Icon
                          as={InfoOutlineIcon}
                          boxSize={5}
                          mr={2}
                          color="#black"
                        />
                        <Text as="span" mr={2}>
                          O ŽUPI
                        </Text>
                        <ArrowRightIcon />
                      </Box>
                    </MenuButton>
                    <MenuList bg="white" boxShadow="lg">
                      <MenuItem
                        as="a"
                        href="/povijest-zupe"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Povijest Župe
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/sv-petar"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Sv. Petar
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/raspored-bogosluzja"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Raspored bogoslužja
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/fotogalerija"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Fotogalerija
                      </MenuItem>
                    </MenuList>
                  </Menu>

                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      color="gray.700"
                      w="full"
                      textAlign="left"
                      fontSize="xl"
                      fontWeight="semibold"
                      _hover={{ color: "#86654b", fontWeight: "bold" }}
                    >
                      <Box px={3} py={5}>
                        <Icon
                          as={FaPrayingHands}
                          boxSize={5}
                          mr={2}
                          color="#black"
                        />
                        <Text as="span" mr={2}>
                          ŽUPNE AKTIVNOSTI
                        </Text>
                        <ArrowRightIcon />
                      </Box>
                    </MenuButton>
                    <MenuList bg="white" boxShadow="lg">
                      <MenuItem
                        as="a"
                        href="/zupna-kateheza"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Kateheze za odrasle
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/djecji-zbor"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Dječji zbor
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/zupni-pjevacki-zbor"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Župni pjevački zbor
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/zupno-vijece"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Župno pastoralno i ekonomsko vijeće
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/poboznosti"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Pobožnosti
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/zupni-caritas"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Župni Caritas
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/ministranti"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Ministranti
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/mladi"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Mladi
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/kazaliste"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Kršćansko kazalište župe sv. Petra
                      </MenuItem>
                    </MenuList>
                  </Menu>

                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      color="gray.700"
                      w="full"
                      textAlign="left"
                      fontSize="xl"
                      fontWeight="semibold"
                      _hover={{ color: "#86654b", fontWeight: "bold" }}
                    >
                      <Box px={3} py={5}>
                        <Icon as={FaBook} boxSize={5} mr={2} color="black" />
                        <Text as="span" mr={2}>
                          ŽUPNA KATEHEZA
                        </Text>
                        <ArrowRightIcon />
                      </Box>
                    </MenuButton>
                    <MenuList bg="white" boxShadow="lg">
                      <MenuItem
                        as="a"
                        href="/krstenje"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Krštenje
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/sveta-pricest"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Sveta Pričest
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/sveta-potvrda"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Sveta Potvrda
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/euharistija"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Euharistija
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/ispovijed"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Ispovijed
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/bolesnicko-pomazanje"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Bolesničko pomazanje
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/zenidba"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Ženidba
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/sveti-red"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Sveti red
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/blagoslov-obitelji"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Blagoslov obitelji
                      </MenuItem>
                      <Divider></Divider>
                      <MenuItem
                        as="a"
                        href="/sprovod"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Sprovod
                      </MenuItem>
                    </MenuList>
                  </Menu>

                  <Link
                    href="/hodocasca"
                    color="gray.700"
                    fontSize="xl"
                    fontWeight="semibold"
                    _hover={{ color: "#86654b", fontWeight: "bold" }}
                  >
                    <Icon as={FaRoute} boxSize={5} mr={2} color="black" />
                    HODOČAŠĆA
                  </Link>
                  <Link
                    href="/formulari"
                    color="gray.700"
                    fontSize="xl"
                    fontWeight="semibold"
                    _hover={{ color: "#86654b", fontWeight: "bold" }}
                  >
                    <Icon as={FaWpforms} boxSize={5} mr={2} color="black" />
                    FORMULARI
                  </Link>
                  <Link
                    href="/kontakt"
                    color="gray.700"
                    fontSize="xl"
                    fontWeight="semibold"
                    _hover={{ color: "#86654b", fontWeight: "bold" }}
                  >
                    <Icon as={FaEnvelope} boxSize={5} mr={2} color="black" />
                    KONTAKT
                  </Link>
                  {isLoggedIn ? (
                    <Link
                      href="/upute"
                      color="gray.700"
                      fontSize="xl"
                      fontWeight="semibold"
                      _hover={{ color: "#86654b", fontWeight: "bold" }}
                    >
                      UPUTE
                    </Link>
                  ) : (
                    <></>
                  )}
                </Flex>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Grid>
    </Box>
  );
};

export default Navbar;
