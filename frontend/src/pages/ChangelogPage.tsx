import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { StarIcon, CheckCircleIcon } from "@chakra-ui/icons";

export const ChangelogPage = () => {
  return (
    <Box as="main" flex="1" bg="brand.cream" py={10}>
      <Container maxW="container.lg">
        <VStack
          spacing={10}
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="md"
          align="stretch"
        >
          <Heading as="h1" size="2xl" color="brand.espresso" textAlign="center">
            Novidades do Oráculo
          </Heading>

          {/* VERSÃO 2.0 - COM O TEXTO CORRIGIDO */}
          <Box>
            <Heading as="h2" size="lg" color="brand.sage">
              Versão 2.0 - A Evolução
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              30 de Junho de 2025
            </Text>
            <VStack align="stretch" spacing={4}>
              <Heading
                as="h3"
                size="md"
                color="brand.espresso"
                borderBottomWidth="1px"
                borderColor="gray.200"
                pb={2}
              >
                🚀 Melhorias de Performance e Arquitetura
              </Heading>
              <List spacing={3} pl={2}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  <Text as="span" fontWeight="bold">
                    Backend na Nuvem da Cloudflare:
                  </Text>{" "}
                  Migramos toda a API para os Cloudflare Workers! Isso significa
                  que o site está mais rápido do que nunca e o servidor não
                  "dorme" mais.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  <Text as="span" fontWeight="bold">
                    Banco de Dados Serverless com Neon.tech:
                  </Text>{" "}
                  Acompanhando a modernização do backend, o banco de dados agora
                  roda em uma infraestrutura serverless otimizada.
                </ListItem>
              </List>

              <Heading
                as="h3"
                size="md"
                color="brand.espresso"
                borderBottomWidth="1px"
                borderColor="gray.200"
                pb={2}
                pt={4}
              >
                ✨ Novas Funcionalidades e Melhorias de UX
              </Heading>
              <List spacing={3} pl={2}>
                <ListItem>
                  <ListIcon as={StarIcon} color="yellow.400" />
                  <Text as="span" fontWeight="bold">
                    Carrossel de Destaques:
                  </Text>{" "}
                  A página inicial agora te recebe com um carrossel dinâmico
                  para inspirar sua próxima leitura.
                </ListItem>
                <ListItem>
                  <ListIcon as={StarIcon} color="yellow.400" />
                  <Text as="span" fontWeight="bold">
                    Modal de Detalhes na "Minha Lista":
                  </Text>{" "}
                  Agora você pode clicar em qualquer livro da sua lista para ver
                  seus detalhes em um modal.
                </ListItem>
                <ListItem>
                  <ListIcon as={StarIcon} color="yellow.400" />
                  <Text as="span" fontWeight="bold">
                    Identidade Visual nas Páginas de Login:
                  </Text>{" "}
                  As telas de autenticação agora contam a história do Oráculo
                  com um carrossel automático e imersivo.
                </ListItem>
              </List>
            </VStack>
          </Box>

          <Divider />

          {/* VERSÃO 1.0 */}
          <Box>
            <Heading as="h2" size="lg" color="brand.sage">
              Versão 1.0 - O Lançamento!
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              28 de Junho de 2025
            </Text>
            <List spacing={3} pl={2}>
              <ListItem>🎉 Lançamento oficial do Oráculo Literário!</ListItem>
              <ListItem>
                👤 Autenticação completa com cadastro e login por email e senha.
              </ListItem>
              <ListItem>
                🎨 Design responsivo e moderno com tema de cores e fontes
                personalizadas.
              </ListItem>
              <ListItem>
                ❤️ Funcionalidade de "Minha Lista" para salvar, ver e remover
                livros.
              </ListItem>
              <ListItem>
                ⭐ Sistema de avaliação com 5 estrelas para os livros da sua
                lista.
              </ListItem>
              <ListItem>
                ⚙️ Página de configurações para o usuário editar nome e avatar.
              </ListItem>
            </List>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
