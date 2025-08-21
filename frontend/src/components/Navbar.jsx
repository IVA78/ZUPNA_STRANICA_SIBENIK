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

import { useEffect, useState } from "react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // provjera na mount
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
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
            src="src\assets\logo.jpg"
            alt="Logo"
            maxWidth={{ base: "3em", lg: "10em", xl: "10em" }}
            maxHeight={{ base: "3em", lg: "5em", xl: "5em" }}
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
            colSpan={6}
            py={4}
            px={2}
            marginLeft={3}
            marginRight={3}
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
            <Flex gap={{ base: 1, lg: 1, xl: 10 }} align="center">
              <Link
                href="/"
                color="gray.700"
                fontSize="xl"
                fontWeight="semibold"
                _hover={{ color: "#86654b", fontWeight: "bold" }}
              >
                POČETNA
              </Link>

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
                  <MenuItem
                    as="a"
                    href="/sv-petar"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Sv. Petar
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/raspored-bogosluzja"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Raspored bogoslužja
                  </MenuItem>
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
                  <MenuItem
                    as="a"
                    href="/djecji-zbor"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Dječji zbor
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/zupni-pjevacki-zbor"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Župni pjevački zbor
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/zupno-vijece"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Župno pastoralno i ekonomsko vijeće
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/poboznosti"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Pobožnosti
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/zupni-caritas"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Župni Caritas
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/ministranti"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Ministranti
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/mladi"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Mladi
                  </MenuItem>
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
                  <MenuItem
                    as="a"
                    href="/sveta-pricest"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Sveta Pričest
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/sveta-potvrda"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Sveta Potvrda
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/euharistija"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Euharistija
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/ispovijed"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Ispovijed
                  </MenuItem>

                  <MenuItem
                    as="a"
                    href="/bolesnicko-pomazanje"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Bolesničko pomazanje
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/zenidba"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Ženidba
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/sveti-red"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Sveti red
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/blagoslov-obitelji"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    Blagoslov obitelji
                  </MenuItem>
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
                HODOČAŠĆA
              </Link>
              <Link
                href="/formulari"
                color="gray.700"
                fontSize="xl"
                fontWeight="semibold"
                _hover={{ color: "#86654b", fontWeight: "bold" }}
              >
                FORMULARI
              </Link>
              <Link
                href="/kontakt"
                color="gray.700"
                fontSize="xl"
                fontWeight="semibold"
                _hover={{ color: "#86654b", fontWeight: "bold" }}
              >
                KONTAKT
              </Link>
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  color="gray.700"
                  fontSize="xl"
                  fontWeight="semibold"
                  _hover={{ color: "#86654b", fontWeight: "bold" }}
                >
                  KONTROLNA PLOČA
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
                      <MenuItem
                        as="a"
                        href="/sv-petar"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Sv. Petar
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/raspored-bogosluzja"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Raspored bogoslužja
                      </MenuItem>
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
                      <MenuItem
                        as="a"
                        href="/djecji-zbor"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Dječji zbor
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/zupni-pjevacki-zbor"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Župni pjevački zbor
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/zupno-vijece"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Župno pastoralno i ekonomsko vijeće
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/poboznosti"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Pobožnosti
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/zupni-caritas"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Župni Caritas
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/ministranti"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Ministranti
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/mladi"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Mladi
                      </MenuItem>
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
                      <MenuItem
                        as="a"
                        href="/sveta-pricest"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Sveta Pričest
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/sveta-potvrda"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Sveta Potvrda
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/euharistija"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Euharistija
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/ispovijed"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Ispovijed
                      </MenuItem>

                      <MenuItem
                        as="a"
                        href="/bolesnicko-pomazanje"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Bolesničko pomazanje
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/zenidba"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Ženidba
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/sveti-red"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Sveti red
                      </MenuItem>
                      <MenuItem
                        as="a"
                        href="/blagoslov-obitelji"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        Blagoslov obitelji
                      </MenuItem>
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
                    HODOČAŠĆA
                  </Link>
                  <Link
                    href="/formulari"
                    color="gray.700"
                    fontSize="xl"
                    fontWeight="semibold"
                    _hover={{ color: "#86654b", fontWeight: "bold" }}
                  >
                    FORMULARI
                  </Link>
                  <Link
                    href="/kontakt"
                    color="gray.700"
                    fontSize="xl"
                    fontWeight="semibold"
                    _hover={{ color: "#86654b", fontWeight: "bold" }}
                  >
                    KONTAKT
                  </Link>
                  {isLoggedIn ? (
                    <Link
                      href="/dashboard"
                      color="gray.700"
                      fontSize="xl"
                      fontWeight="semibold"
                      _hover={{ color: "#86654b", fontWeight: "bold" }}
                    >
                      KONTROLNA PLOČA
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
