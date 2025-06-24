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

// Podemos usar a mesma imagem ou outra, se preferir
const imageUrl = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
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
        <Flex align="center" justify="center" h="100%" direction="column" p={8}>
          <Box width="100%" maxWidth="400px">
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
              <Heading as="h1" size="xl" color="brand.espresso">
                Crie sua Conta
              </Heading>

              <FormControl isRequired>
                <FormLabel color="brand.espresso">Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  focusBorderColor="brand.sage"
                />
              </FormControl>

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
