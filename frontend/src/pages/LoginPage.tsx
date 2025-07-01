import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  Alert,
  AlertIcon,
  Grid,
  GridItem,
  Flex,
  Hide,
  Show,
  Icon,
} from "@chakra-ui/react";
// 1. Importando um ícone de livro da nova biblioteca
import { AuthCarousel } from "../components/AuthCarousel";
import { GiOpenBook } from "react-icons/gi";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate("/");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Ocorreu um erro.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "50% 50%" }}
      h="100vh"
      overflow="hidden"
    >
      {/* LADO ESQUERDO: O CARROSSEL (só aparece no desktop) */}
      <GridItem display={{ base: "none", md: "block" }}>
        <AuthCarousel />
      </GridItem>

      {/* LADO DIREITO: O FORMULÁRIO (com estilos responsivos) */}
      <GridItem
        w="100%"
        h="100%"
        overflowY="auto"
        // 2. APLICAMOS ESTILOS DIFERENTES PARA MOBILE E DESKTOP
        bg={{ base: "brand.espresso", md: "white" }}
        bgImage={{
          base: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80')`,
          md: "none",
        }}
        bgSize="cover"
        bgPosition="center"
      >
        <Flex
          align="center"
          justify="center"
          minH="100%" // Garante que o Flex ocupe a altura toda
          direction="column"
          p={8}
        >
          {/* 3. CARD COM FUNDO SEMI-TRANSPARENTE (só no mobile) */}
          <Box
            width="100%"
            maxWidth="400px"
            bg={{ base: "rgba(0, 0, 0, 0.7)", md: "transparent" }} // Fundo do card
            p={{ base: 6, md: 0 }}
            borderRadius={{ base: "lg", md: "none" }}
            boxShadow={{ base: "lg", md: "none" }}
          >
            {/* Escondemos o título principal no mobile, pois ele já está no topo do card */}
            <Hide below="md">
              <Heading
                as="h2"
                size="xl"
                color="brand.espresso"
                textAlign="center"
                mb={6}
              >
                Bem-vindo de volta!
              </Heading>
            </Hide>

            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
              {/* Mostramos o logo e título apenas no mobile */}
              <Show below="md">
                <VStack spacing={2} mb={6} textAlign="center" color="white">
                  <Icon as={GiOpenBook} boxSize={12} />
                  <Heading as="h1" size="2xl">
                    Oráculo Literário
                  </Heading>
                </VStack>
              </Show>

              <FormControl isRequired>
                <FormLabel color={{ base: "white", md: "brand.espresso" }}>
                  Email
                </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="brand.sage"
                  bg="white"
                  color="black"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={{ base: "white", md: "brand.espresso" }}>
                  Senha
                </FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor="brand.sage"
                  bg="white"
                  color="black"
                />
              </FormControl>

              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                bgColor="brand.sage"
                color="white"
                width="full"
                size="lg"
                isLoading={isLoading}
                _hover={{ bgColor: "brand.olive" }}
              >
                Entrar
              </Button>

              <Text color={{ base: "gray.200", md: "brand.espresso" }}>
                Não tem uma conta?{" "}
                <Link
                  as={RouterLink}
                  to="/register"
                  color="brand.sage"
                  fontWeight="bold"
                >
                  Crie uma agora
                </Link>
              </Text>
            </VStack>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};
