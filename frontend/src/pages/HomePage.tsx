import { useEffect, useState, type MouseEvent } from "react";
import {
  getFeaturedBooks,
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
  Text,
  VStack,
  Alert,
  AlertIcon,
  useToast,
  useDisclosure,
  useTheme,
  Spinner,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import { BookDetailModal } from "../components/BookDetailModal";

const subtlePatternUrl =
  'url(\'data:image/svg+xml,%3Csvg width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23c8c696" fill-opacity="0.4" fill-rule="evenodd"%3E%3Cpath d="M5 0h1L0 6V5zM6 5v1H5z"/%3E%3C/g%3E%3C/svg%3E\')';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
  ],
};

export const HomePage = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();

  const [book, setBook] = useState<BookSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [featuredBooks, setFeaturedBooks] = useState<BookSuggestion[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const books = await getFeaturedBooks();
        setFeaturedBooks(books);
      } catch (error) {
        console.error("Erro ao buscar livros em destaque:", error);
      }
    };
    fetchFeatured();
  }, []);

  const handleBookClick = (clickedBook: BookSuggestion) => {
    setBook(clickedBook);
    onOpen();
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setStartX(e.clientX);
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      if (Math.abs(e.clientX - startX) > 5) {
        setIsDragging(true);
      }
    }
  };

  const handleMouseUp = (book: BookSuggestion) => {
    if (!isDragging) {
      handleBookClick(book);
    }
    setIsDragging(false);
  };

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Chamada simplificada, sem filtros
      const suggestedBook = await getSuggestion();
      setBook(suggestedBook);
      onOpen();
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
      onClose();
    } catch (err) {
      toast({
        title: "Erro ao Salvar",
        description: "Não foi possível salvar o livro.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const backgroundStyle = `${subtlePatternUrl} ${theme.colors.brand.cream}`;

  return (
    <Flex direction="column" minH="100vh" background={backgroundStyle}>
      <Box
        as="main"
        p={{ base: 4, md: 8 }}
        flex="1"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={10}
      >
        {featuredBooks.length > 0 && (
          <Container maxW="container.xl" w="100%">
            <Heading size="lg" color="brand.espresso" mb={4}>
              Destaques Literários
            </Heading>
            <Slider {...sliderSettings}>
              {featuredBooks.map((featuredBook) => (
                <Box
                  key={featuredBook.googleBooksId}
                  px={2}
                  as={Flex}
                  justifyContent="center"
                  alignItems="center"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={() => handleMouseUp(featuredBook)}
                >
                  <Image
                    src={featuredBook.coverUrl}
                    h="200px"
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    transition="transform 0.2s"
                    _hover={{ transform: "scale(1.05)" }}
                    draggable="false"
                  />
                </Box>
              ))}
            </Slider>
          </Container>
        )}
        <Container maxW="container.md">
          <VStack spacing={8}>
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
            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}
            {isLoading && <Spinner size="xl" color="brand.sage" />}
            <Button
              onClick={handleGetSuggestion}
              isLoading={isLoading}
              bgColor="brand.sage"
              color="white"
              size="lg"
              _hover={{ bgColor: "brand.olive" }}
              px={10}
              py={6}
              mt={4}
            >
              Me dê uma sugestão!
            </Button>
          </VStack>
        </Container>
      </Box>

      <BookDetailModal
        isOpen={isOpen}
        onClose={onClose}
        book={book}
        onSave={handleSaveBook}
        isSaving={isSaving}
      />
    </Flex>
  );
};
