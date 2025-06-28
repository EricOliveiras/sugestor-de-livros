import { Box, Text, Flex, Link as ChakraLink, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Usamos a nova cor de fundo
    <Box as="footer" bg="brand.footerBg" color="brand.cream" py={4} px={8}>
      {/* A MÁGICA DA RESPONSIVIDADE:
        - direction: muda para 'column' em telas pequenas (base) e 'row' em telas maiores (md)
        - alignItems: centraliza os itens quando está em modo coluna
        - gap: adiciona um espaçamento entre os itens quando estão em modo coluna
      */}
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        gap={{ base: 2, md: 0 }}
      >
        <Text textAlign="center">
          &copy; {currentYear} Oráculo Literário. Todos os direitos reservados.
        </Text>

        {/* O Spacer só é útil em telas grandes, mas não atrapalha no mobile */}
        <Spacer />

        <Flex>
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
