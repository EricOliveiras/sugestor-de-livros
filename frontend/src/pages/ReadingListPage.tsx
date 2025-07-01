import { useEffect, useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import {
  getSavedBooks,
  removeBook,
  type Book,
  rateBook,
} from "../services/bookService";
import { BookCard } from "../components/BookCard";
import { BookDetailModal } from "../components/BookDetailModal";
import type { BookSuggestion } from "../services/bookService";

export const ReadingListPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  // Estado para o nosso modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBook, setSelectedBook] = useState<BookSuggestion | null>(null);

  const fetchBooks = async () => {
    setIsLoading(true);
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

  const handleRemoveBook = async (bookId: string) => {
    // A lógica de remover continua a mesma, mas agora ela também atualiza a lista na tela
    try {
      await removeBook(bookId);
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

  const handleCardClick = (book: Book) => {
    // O tipo 'Book' (do nosso DB) e 'BookSuggestion' (do modal) são um pouco diferentes.
    // Convertemos o formato dos autores aqui.
    const bookForModal = {
      ...book,
      authors: book.authors.split(", "),
    };
    setSelectedBook(bookForModal);
    onOpen();
  };

  return (
    <Box bg="brand.cream" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="xl" color="brand.espresso" mb={8}>
          Minha Lista de Leitura
        </Heading>

        {isLoading && (
          <Flex justify="center" align="center" h="50vh">
            <Spinner size="xl" color="brand.sage" />
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
            Sua estante digital aguarda a primeira história. Peça uma sugestão e
            salve seus livros favoritos!
          </Text>
        )}

        {!isLoading && !error && books.length > 0 && (
          <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={6}>
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onRemove={handleRemoveBook}
                onRate={handleRateBook}
                onCardClick={handleCardClick} // Passamos a função de clique
              />
            ))}
          </SimpleGrid>
        )}
      </Container>

      {/* Renderizamos nosso modal reutilizável */}
      <BookDetailModal
        isOpen={isOpen}
        onClose={onClose}
        book={selectedBook}
        onSave={() => Promise.resolve()} // O botão de salvar não precisa fazer nada aqui
        isSaving={false}
        showSaveButton={false} // Dizemos para o modal esconder o botão "Salvar"
      />
    </Box>
  );
};
