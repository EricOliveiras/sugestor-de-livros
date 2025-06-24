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
} from "@chakra-ui/react";

const imageUrl = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f";

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
    // O Grid agora vai ocupar 100% da altura graças ao nosso estilo global
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} h="100%" w="100%">
      {/* LADO ESQUERDO: IMAGEM */}
      <GridItem
        w="100%"
        h="100%"
        bgImage={`url(${imageUrl})`}
        bgPosition="center"
        bgSize="cover"
        display={{ base: "none", md: "block" }}
      />

      {/* LADO DIREITO: FORMULÁRIO */}
      <GridItem w="100%" h="100%" bg="white">
        {" "}
        {/* 1. FUNDO BRANCO NA COLUNA INTEIRA */}
        <Flex align="center" justify="center" h="100%" direction="column" p={8}>
          {/* 2. O Box interno não precisa mais de estilo de fundo ou sombra */}
          <Box width="100%" maxWidth="400px">
            <VStack spacing={6} as="form" onSubmit={handleSubmit}>
              <Heading as="h1" size="xl" color="brand.espresso">
                Bem-vindo de volta!
              </Heading>

              <FormControl isRequired>
                <FormLabel color="brand.espresso">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="brand.sage"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="brand.espresso">Senha</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor="brand.sage"
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

              <Text color="brand.espresso">
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
