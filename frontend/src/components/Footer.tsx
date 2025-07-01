import { Box, Text, Flex, Link as ChakraLink, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" bg="brand.footerBg" color="brand.cream" py={4} px={8}>
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        gap={{ base: 2, md: 0 }}
      >
        <Text textAlign="center">
          &copy; {currentYear} Oráculo Literário. Todos os direitos reservados.
        </Text>
        <Spacer />
        <Flex>
          {/* ADICIONAMOS O NOVO LINK AQUI */}
          <ChakraLink
            as={RouterLink}
            to="/about"
            mr={4}
            _hover={{ color: "white" }}
          >
            Sobre
          </ChakraLink>
          <ChakraLink
            as={RouterLink}
            to="/changelog"
            mr={4}
            _hover={{ color: "white" }}
          >
            Novidades
          </ChakraLink>
          <ChakraLink
            as={RouterLink}
            to="/terms-of-use"
            mr={4}
            _hover={{ color: "white" }}
          >
            Termos de Uso
          </ChakraLink>
          <ChakraLink
            as={RouterLink}
            to="/privacy-policy"
            _hover={{ color: "white" }}
          >
            Política de Privacidade
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
};
