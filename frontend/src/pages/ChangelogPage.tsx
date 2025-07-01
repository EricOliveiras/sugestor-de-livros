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
import { StarIcon, CheckCircleIcon, SettingsIcon } from "@chakra-ui/icons";
import { MainLayout } from "../components/MainLayout";

export const ChangelogPage = () => {
  return (
    // Usando o MainLayout para ter Header e Footer automaticamente
    <MainLayout>
      <Box as="main" flex="1" bg="brand.cream" py={10}>
        <Container maxW="container.lg">
          <VStack spacing={10} align="stretch">
            <Heading
              as="h1"
              size="2xl"
              color="brand.espresso"
              textAlign="center"
            >
              Novidades do Oráculo
            </Heading>

            {/* VERSÃO 2.0 - ATUALIZAÇÕES RECENTES */}
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
                  borderBottomWidth="2px"
                  borderColor="brand.peach"
                  pb={2}
                >
                  🚀 Melhorias de Performance e Arquitetura
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    **Backend na Nuvem da Cloudflare:** Migramos toda a API para
                    os Cloudflare Workers! Isso significa que o site está mais
                    rápido do que nunca e o servidor não "dorme" mais,
                    garantindo uma resposta instantânea a qualquer hora do dia.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    **Banco de Dados Serverless com Neon.tech:** Acompanhando a
                    modernização do backend, o banco de dados agora roda em uma
                    infraestrutura serverless otimizada para o nosso novo
                    ambiente.
                  </ListItem>
                </List>

                <Heading
                  as="h3"
                  size="md"
                  color="brand.espresso"
                  borderBottomWidth="2px"
                  borderColor="brand.peach"
                  pb={2}
                  pt={4}
                >
                  ✨ Novas Funcionalidades e Melhorias de UX
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={StarIcon} color="yellow.500" />
                    **Filtros para Sugestões:** Agora você pode guiar o Oráculo!
                    Adicionamos filtros na página inicial para você pedir
                    sugestões por gênero e idioma.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={StarIcon} color="yellow.500" />
                    **Carrossel de Destaques:** A página inicial agora te recebe
                    com um carrossel dinâmico de "Destaques Literários" para
                    inspirar sua próxima leitura.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={StarIcon} color="yellow.500" />
                    **Modal de Detalhes na "Minha Lista":** Agora você pode
                    clicar em qualquer livro da sua lista de leitura para ver
                    seus detalhes em um modal, criando uma experiência mais rica
                    e consistente.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={SettingsIcon} color="gray.500" />
                    **Identidade Visual nas Páginas de Login:** As telas de
                    login e cadastro agora contam a história do Oráculo com um
                    carrossel automático, tornando a entrada no site uma
                    experiência muito mais imersiva.
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
              <VStack align="stretch" spacing={3}>
                <Text>🎉 Lançamento oficial do Oráculo Literário!</Text>
                <Text>
                  👤 Autenticação completa com cadastro e login por email e
                  senha.
                </Text>
                <Text>
                  🎨 Design responsivo e moderno com tema de cores e fontes
                  personalizadas.
                </Text>
                <Text>
                  ❤️ Funcionalidade de "Minha Lista" para salvar, ver e remover
                  livros.
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
          </VStack>
        </Container>
      </Box>
    </MainLayout>
  );
};
