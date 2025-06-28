import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";

export const ChangelogPage = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Box as="main" flex="1" bg="brand.cream" py={10}>
        <Container maxW="container.lg">
          <VStack spacing={8} align="stretch">
            <Heading
              as="h1"
              size="2xl"
              color="brand.espresso"
              textAlign="center"
            >
              Novidades do Oráculo
            </Heading>

            {/* VERSÃO 1.0 */}
            <Box>
              <Heading as="h2" size="lg" color="brand.sage">
                Versão 1.0 - O Lançamento!
              </Heading>
              <Text fontSize="md" color="gray.600" mb={4}>
                28 de Junho de 2025
              </Text>
              <VStack align="stretch" spacing={3}>
                <Text>🎉 Lançamento oficial do Oráculo Literário!</Text>
                <Text>
                  ✨ Sistema de sugestão de livros com base em gêneros e
                  idiomas.
                </Text>
                <Text>
                  👤 Autenticação completa com cadastro e login por email e
                  senha.
                </Text>
                <Text>
                  🎨 Design responsivo e moderno com tema de cores
                  personalizado.
                </Text>
                <Text>
                  ❤️ Funcionalidade de "Minha Lista" para salvar, ver e remover
                  livros preferidos.
                </Text>
                <Text>
                  ⭐ Sistema de avaliação com 5 estrelas para os livros da sua
                  lista.
                </Text>
                <Text>
                  ⚙️ Página de configurações para o usuário editar nome e
                  avatar.
                </Text>
              </VStack>
            </Box>

            <Divider />

            {/* Aqui você pode adicionar futuras atualizações */}
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
};

// Precisamos adicionar o Flex aqui para o layout funcionar
import { Flex } from "@chakra-ui/react";
