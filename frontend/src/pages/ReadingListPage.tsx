import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { getSavedBooks, removeBook, type Book } from "../services/bookService";
import { BookCard } from "../components/BookCard";
import { Header } from "../components/Header";

export const ReadingListPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchBooks = async () => {
    try {
      const savedBooks = await getSavedBooks();
      setBooks(savedBooks);
    } catch (err) {
      setError("Não foi possível carregar sua lista de livros.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // NOVA FUNÇÃO para lidar com a remoção
  const handleRemoveBook = async (bookId: string) => {
    try {
      await removeBook(bookId);
      // Atualiza o estado para remover o livro da tela instantaneamente
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      toast({
        title: "Livro Removido",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o livro.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="brand.cream" minH="100vh">
      <Header />
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="xl" color="brand.espresso" mb={8}>
          Minha Lista de Leitura
        </Heading>

        {/* ... (código para isLoading, error, e lista vazia) ... */}
        {isLoading && (
          <Flex justify="center" align="center" h="50vh">
            <Spinner size="xl" color="brand.sage" thickness="4px" />
          </Flex>
        )}

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {!isLoading && !error && books.length === 0 && (
          <Text fontSize="lg" color="brand.espresso">
            Sua lista está vazia. Volte para a página inicial e salve um livro
            para começar!
          </Text>
        )}

        {!isLoading && !error && books.length > 0 && (
          <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={6}>
            {books.map((book) => (
              // Passamos a função de remover para o BookCard
              <BookCard key={book.id} book={book} onRemove={handleRemoveBook} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};
