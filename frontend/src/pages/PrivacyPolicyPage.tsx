import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { Header } from "../components/Header";

export const PrivacyPolicyPage = () => {
  return (
    <Box>
      <Header />
      <Container maxW="container.lg" py={10}>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl">
            Política de Privacidade do Oráculo Literário
          </Heading>
          <Text>Última atualização: 27 de Junho de 2025</Text>
          <Text fontStyle="italic" color="red.500">
            Atenção: Este é um documento de exemplo e não possui validade legal.
          </Text>

          <Heading as="h2" size="lg" mt={4}>
            1. Dados que Coletamos
          </Heading>
          <Text>
            Coletamos informações que você nos fornece diretamente, como: Seu
            nome, endereço de email e URL do avatar quando você se registra para
            uma conta. Livros que você salva em sua lista e avaliações que você
            fornece.
          </Text>

          <Heading as="h2" size="lg" mt={4}>
            2. Como Usamos Seus Dados
          </Heading>
          <Text>
            Usamos as informações que coletamos para operar, manter e fornecer a
            você os recursos e a funcionalidade do Serviço, bem como para nos
            comunicarmos diretamente com você.
          </Text>

          <Heading as="h2" size="lg" mt={4}>
            3. Armazenamento de Dados
          </Heading>
          <Text>
            Seus dados são armazenados de forma segura em nossos servidores e
            bancos de dados. Tomamos medidas razoáveis para proteger suas
            informações de perda, roubo, uso indevido e acesso não autorizado.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};
