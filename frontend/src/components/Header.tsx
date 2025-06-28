import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Hide,
  Show,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Header = () => {
  const { user, logout } = useAuth();
  // Hook para controlar a abertura/fechamento do menu lateral (Drawer)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    onClose(); // Fecha o menu se estiver aberto
    logout();
  };

  return (
    <Box
      as="header"
      bg="brand.sage"
      color="white"
      py={3}
      px={{ base: 4, md: 8 }}
      boxShadow="md"
    >
      <Flex alignItems="center">
        <Heading size="md" as={RouterLink} to="/">
          Oráculo Literário
        </Heading>
        <Spacer />

        {/* VERSÃO DESKTOP: Escondida em telas pequenas (< 'md') */}
        <Hide below="md">
          <Flex alignItems="center">
            <ChakraLink as={RouterLink} to="/my-list" mr={6} fontWeight="bold">
              Minha Lista
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/settings" mr={6} fontWeight="bold">
              Configurações
            </ChakraLink>
            {user && <Text mr={4}>Olá, {user.name}!</Text>}
            <Button
              onClick={logout}
              bgColor="brand.peach"
              color="brand.espresso"
              size="sm"
            >
              Sair
            </Button>
          </Flex>
        </Hide>

        {/* VERSÃO MOBILE: Mostrada apenas em telas pequenas (< 'md') */}
        <Show below="md">
          <IconButton
            aria-label="Abrir menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            color="white"
            fontSize="2xl"
            onClick={onOpen} // Abre o Drawer
          />
        </Show>
      </Flex>

      {/* O MENU LATERAL (DRAWER) PARA MOBILE */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="brand.cream">
          <DrawerCloseButton color="brand.espresso" />
          <DrawerHeader
            color="brand.espresso"
            borderBottomWidth="1px"
            borderColor="brand.sage"
          >
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch" mt={6}>
              <ChakraLink
                as={RouterLink}
                to="/my-list"
                fontSize="lg"
                color="brand.espresso"
                onClick={onClose}
              >
                Minha Lista
              </ChakraLink>
              <ChakraLink
                as={RouterLink}
                to="/settings"
                fontSize="lg"
                color="brand.espresso"
                onClick={onClose}
              >
                Configurações
              </ChakraLink>
              <Button
                onClick={handleLogout}
                bgColor="brand.peach"
                color="brand.espresso"
              >
                Sair
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
