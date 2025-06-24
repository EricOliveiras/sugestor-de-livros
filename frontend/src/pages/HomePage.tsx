import React, { useState } from "react";
import {
  getSuggestion,
  saveBook,
  type BookSuggestion,
} from "../services/bookService";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { Header } from "../components/Header";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const HomePage = () => {
  const toast = useToast();

  const [book, setBook] = useState<BookSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const suggestedBook = await getSuggestion();
      setBook(suggestedBook);
    } catch (err: any) {
      setError("Não foi possível buscar uma sugestão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBook = async () => {
    if (!book) return;

    setIsSaving(true);
    try {
      await saveBook(book);
      toast({
        title: "Livro Salvo!",
        description: `'${book.title}' foi adicionado à sua lista.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      toast({
        title: "Erro ao Salvar",
        description:
          "Não foi possível salvar o livro. Você já pode ter salvo este livro.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      <Header />

      <Box
        as="main"
        bg="brand.cream"
        p={8}
        flex="1"
        display="flex"
        alignItems="center"
      >
        <Container maxW="container.md">
          <VStack spacing={8}>
            {!isLoading && !book && !error && (
              <Box
                textAlign="center"
                p={10}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
              >
                <VStack spacing={4}>
                  <QuestionOutlineIcon w={12} h={12} color="brand.sage" />
                  <Heading size="lg" color="brand.espresso">
                    Encontre sua próxima leitura
                  </Heading>
                  <Text>Clique no botão abaixo para receber uma sugestão.</Text>
                </VStack>
              </Box>
            )}

            {book && (
              <Box
                as={motion.div}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                w="100%"
              >
                <Flex
                  direction={{ base: "column", md: "row" }}
                  p={6}
                  borderWidth={1}
                  borderRadius="lg"
                  boxShadow="xl"
                  bg="white"
                  borderColor="gray.200"
                >
                  <Image
                    src={book.coverUrl}
                    alt={`Capa do livro ${book.title}`}
                    borderRadius="md"
                    boxSize={{ base: "150px", md: "200px" }}
                    mx={{ base: "auto", md: "0" }}
                    objectFit="contain"
                    mr={{ md: 6 }}
                    mb={{ base: 4, md: 0 }}
                  />
                  <Box flex="1">
                    <Heading size="lg" color="brand.espresso">
                      {book.title}
                    </Heading>
                    <Text fontSize="lg" color="gray.600" mt={1}>
                      por {book.authors.join(", ")}
                    </Text>
                    <Text
                      fontWeight="bold"
                      mt={4}
                      mb={2}
                      color="brand.espresso"
                    >
                      Sinopse:
                    </Text>
                    <Text noOfLines={6}>{book.synopsis}</Text>
                    <Button
                      mt={4}
                      colorScheme="green"
                      onClick={handleSaveBook}
                      isLoading={isSaving}
                    >
                      Salvar na minha lista
                    </Button>
                  </Box>
                </Flex>
              </Box>
            )}

            {isLoading && (
              <Spinner size="xl" color="brand.sage" thickness="4px" />
            )}

            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Button
              onClick={handleGetSuggestion}
              isLoading={isLoading}
              bgColor="brand.sage"
              color="white"
              size="lg"
              _hover={{ bgColor: "brand.olive" }}
              px={10}
              py={6}
              mt={!book && !isLoading && !error ? 8 : 4}
            >
              {!book
                ? "Receber minha primeira sugestão!"
                : "Quero outra sugestão"}
            </Button>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
};
