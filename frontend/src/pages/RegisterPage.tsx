import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  Icon,
} from "@chakra-ui/react";
import { GiOpenBook } from "react-icons/gi";
import { register } from "../services/authService";

const imageUrl = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Mantemos este
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    // Validação de frontend
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      // Agora enviamos apenas os 3 campos necessários
      await register({ name, email, password });
      alert(
        "Cadastro realizado com sucesso! Por favor, faça o login para continuar."
      );
      navigate("/login");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Ocorreu um erro.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} h="100%" w="100%">
      <GridItem
        w="100%"
        h="100%"
        bgImage={`url(${imageUrl})`}
        bgPosition="center"
        bgSize="cover"
        display={{ base: "none", md: "block" }}
      />
      <GridItem w="100%" h="100%" bg="white" overflowY="auto">
        <Flex align="center" justify="center" h="100%" direction="column" p={8}>
          <Box width="100%" maxWidth="400px">
            <VStack spacing={2} mb={10} textAlign="center">
              <Icon as={GiOpenBook} boxSize={12} color="brand.sage" />
              <Heading as="h1" size="2xl" color="brand.espresso">
                Oráculo Literário
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Descubra livros que você não sabia que amava.
              </Text>
            </VStack>

            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
              <Heading as="h2" size="lg" color="brand.espresso">
                Criar Conta
              </Heading>

              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  focusBorderColor="brand.sage"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="brand.sage"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Senha (mínimo 6 caracteres)</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor="brand.sage"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirmar Senha</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                Cadastrar
              </Button>

              <Text color="brand.espresso">
                Já tem uma conta?{" "}
                <Link
                  as={RouterLink}
                  to="/login"
                  color="brand.sage"
                  fontWeight="bold"
                >
                  Faça o login
                </Link>
              </Text>
            </VStack>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};
