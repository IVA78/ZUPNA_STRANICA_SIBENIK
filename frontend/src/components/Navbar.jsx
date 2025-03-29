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
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

const Navbar = () => {
  return (
    <div>
      <Grid
        templateColumns="repeat(6,1fr)"
        as="nav"
        p="5px"
        alignItems="center"
        justifyContent="space-between"
        paddingBottom=".5em"
        fontFamily="revert-layer"
        bg="#f8f5f0"
        padding="1em"
      >
        <GridItem
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="src\assets\logo.jpg"
            alt="Logo"
            maxWidth="10em"
            maxHeight="5em"
            marginRight="2em"
          />
          <Flex direction="column" align="left" justify="center" gap={1}>
            <Text fontSize="s" fontWeight="semibold">
              Šibenska biskupija
            </Text>
            <Text
              fontSize="4xl"
              fontWeight="bold"
              color="#8b6f5e"
              whiteSpace="nowrap"
            >
              ŽUPA SV. PETRA
            </Text>
            <Text fontSize="s" fontWeight="semibold">
              Župa Sv. Petra, Vidici, Šibenik
            </Text>
          </Flex>
        </GridItem>
        <GridItem colSpan={6} py={6} px={2}>
          <Divider borderWidth="2px" borderColor="#86654b" />
        </GridItem>

        <GridItem
          colSpan={{ base: 6, lg: 4, xl: 5 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box px={12} py={2}>
            <Flex gap={{ base: 1, lg: 10, xl: 20 }} align="center">
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
                    Župna kateheza za odrasle
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
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Navbar;
