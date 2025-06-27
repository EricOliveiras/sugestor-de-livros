import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <Box as="header" bg="brand.sage" color="white" py={4} px={8} boxShadow="md">
      <Flex alignItems="center">
        <Heading size="md" as={RouterLink} to="/">
          Oráculo Literário
        </Heading>
        <Spacer />
        <Flex alignItems="center">
          <ChakraLink as={RouterLink} to="/my-list" mr={6} fontWeight="bold">
            Minha Lista
          </ChakraLink>
          {/* ADICIONAMOS O LINK PARA CONFIGURAÇÕES */}
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
      </Flex>
    </Box>
  );
};
