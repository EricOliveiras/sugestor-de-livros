import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

export const TermsOfUsePage = () => {
  return (
    <Box>
      <Container maxW="container.lg" py={10}>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl">
            Termos de Uso do Oráculo Literário
          </Heading>
          <Text>Última atualização: 27 de Junho de 2025</Text>

          <Heading as="h2" size="lg" mt={4}>
            1. Aceitação dos Termos
          </Heading>
          <Text>
            Ao acessar e usar o Oráculo Literário ("Serviço"), você aceita e
            concorda em ficar vinculado aos termos e disposições deste acordo.
          </Text>

          <Heading as="h2" size="lg" mt={4}>
            2. Contas de Usuário
          </Heading>
          <Text>
            Para acessar certas funcionalidades do site, você deve se registrar
            e criar uma conta. Você é responsável por manter a confidencialidade
            de sua senha e conta.
          </Text>

          <Heading as="h2" size="lg" mt={4}>
            3. Conduta do Usuário
          </Heading>
          <Text>Você concorda em não usar o Serviço para:</Text>
          <UnorderedList pl={6}>
            <ListItem>
              Violar qualquer lei local, estadual, nacional ou internacional.
            </ListItem>
            <ListItem>
              Coletar ou armazenar dados pessoais sobre outros usuários.
            </ListItem>
            <ListItem>Personificar qualquer pessoa ou entidade.</ListItem>
          </UnorderedList>

          <Heading as="h2" size="lg" mt={4}>
            4. Propriedade Intelectual
          </Heading>
          <Text>
            O Serviço e seu conteúdo original, recursos e funcionalidades são e
            continuarão sendo propriedade exclusiva do Oráculo Literário e seus
            licenciadores.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};
