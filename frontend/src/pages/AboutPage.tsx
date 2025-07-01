import { Container, Heading, Text, VStack, Divider } from "@chakra-ui/react";

export const AboutPage = () => {
  return (
    // O MainLayout já cuida do fundo da página, então só precisamos do Container
    <Container maxW="container.lg" py={10}>
      <VStack
        spacing={6}
        align="stretch"
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="md"
      >
        <Heading as="h1" size="2xl" color="brand.espresso" textAlign="center">
          Nossa História
        </Heading>
        <Divider />
        <Text fontSize="lg" lineHeight="tall">
          No universo infinito de livros, todo leitor já se sentiu perdido.
          Diante de prateleiras, físicas ou digitais, que se estendem até onde a
          vista não alcança, surge a mesma pergunta: "Por onde começar?". A
          paralisia da escolha é real, e grandes histórias acabam esquecidas na
          imensidão.
        </Text>
        <Text fontSize="lg" lineHeight="tall">
          Foi por isso que o Oráculo Literário nasceu. Ele não é apenas um site;
          é uma bússola para sua jornada literária. Acreditamos que para cada
          leitor existe um livro esperando para ser descoberto, uma história
          pronta para mudar seu dia, sua semana, sua vida.
        </Text>
        <Text fontSize="lg" lineHeight="tall">
          O Oráculo não te dá apenas um título aleatório. Ele te oferece um
          ponto de partida, um convite para o desconhecido. Ele te dá as
          ferramentas para que você construa sua própria biblioteca pessoal, um
          registro de suas viagens por outros mundos.
        </Text>
        <Text fontSize="lg" lineHeight="tall">
          Aqui, cada livro salvo é uma promessa de uma futura aventura. Cada
          avaliação de 5 estrelas é uma memória gravada. Cada sugestão é uma
          porta que se abre.
        </Text>
        <Heading as="h2" size="lg" color="brand.sage" textAlign="center" pt={4}>
          Nossa missão é simples: transformar a dúvida da escolha na alegria da
          descoberta.
        </Heading>
      </VStack>
    </Container>
  );
};
