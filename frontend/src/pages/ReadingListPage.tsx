import { useEffect, useState } from "react";
import {
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
import {
  getSavedBooks,
  rateBook,
  removeBook,
  type Book,
} from "../services/bookService";
import { BookCard } from "../components/BookCard";

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

  const handleRateBook = async (bookId: string, rating: number) => {
    try {
      await rateBook(bookId, rating);
      // Atualiza a nota localmente para uma resposta visual imediata
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, ratings: [{ value: rating }] } : book
        )
      );
      toast({
        title: "Avaliação Salva!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar sua avaliação.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
            <BookCard
              key={book.id}
              book={book}
              onRemove={handleRemoveBook}
              onRate={handleRateBook}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};
