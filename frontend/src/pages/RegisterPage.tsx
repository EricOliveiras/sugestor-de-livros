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
  Icon,
  Show,
  useToast,
} from "@chakra-ui/react";
import { GiOpenBook } from "react-icons/gi";
import { AuthCarousel } from "../components/AuthCarousel";

// AQUI ESTÁ A LINHA QUE FALTAVA
const imageUrl =
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

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
      await register({ name, email, password });
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você será redirecionado para a página de login.",
        status: "success",
        duration: 2000, // A notificação some após 2 segundos
        isClosable: true,
        position: "top",
        // Esta é a parte mais importante:
        onCloseComplete: () => {
          // O redirecionamento só acontece DEPOIS que a notificação se fecha.
          navigate("/login");
        },
      });
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
      <GridItem display={{ base: "none", md: "block" }}>
        <AuthCarousel />
      </GridItem>

      <GridItem
        w="100%"
        h="100%"
        overflowY="auto"
        bg={{ base: "brand.espresso", md: "white" }}
        bgImage={{ base: `url('${imageUrl}')`, md: "none" }}
        bgSize="cover"
        bgPosition="center"
      >
        <Flex
          align="center"
          justify="center"
          minH="100%"
          direction="column"
          p={8}
        >
          <Box
            width="100%"
            maxWidth="400px"
            bg={{ base: "rgba(0, 0, 0, 0.7)", md: "transparent" }}
            p={{ base: 6, md: 0 }}
            borderRadius={{ base: "lg", md: "none" }}
            boxShadow={{ base: "lg", md: "none" }}
          >
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
              <Show below="md">
                <VStack spacing={2} mb={6} textAlign="center" color="white">
                  <Icon as={GiOpenBook} boxSize={12} />
                  <Heading as="h1" size="2xl">
                    Oráculo Literário
                  </Heading>
                </VStack>
              </Show>

              <Heading
                as="h2"
                size="lg"
                color={{ base: "white", md: "brand.espresso" }}
                textAlign="center"
              >
                Criar Conta
              </Heading>

              <FormControl isRequired>
                <FormLabel color={{ base: "white", md: "brand.espresso" }}>
                  Nome
                </FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  focusBorderColor="brand.sage"
                  bg="white"
                  color="black"
                />
              </FormControl>

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
                  Senha (mínimo 6 caracteres)
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

              <FormControl isRequired>
                <FormLabel color={{ base: "white", md: "brand.espresso" }}>
                  Confirmar Senha
                </FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                Cadastrar
              </Button>

              <Text color={{ base: "gray.200", md: "brand.espresso" }}>
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
