import { useState } from "react";
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
  Text,
  VStack,
  Alert,
  AlertIcon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

export const HomePage = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <Flex direction="column" minH="100vh" bg={"brand.cream"}>
      <Box as="main" p={8} flex="1" display="flex" alignItems="center">
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

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="lg" overflow="hidden">
          <ModalCloseButton />
          <ModalBody p={0}>
            {book && (
              <Grid templateColumns={{ base: "1fr", md: "30% 70%" }} w="100%">
                {" "}
                {/* ⬅️ REDUZIMOS A LARGURA DA IMAGEM PARA 30% */}
                <GridItem>
                  <Image
                    src={book.coverUrl}
                    alt={`Capa do livro ${book.title}`}
                    w="100%"
                    h="100%"
                    objectFit="contain"
                    maxH="400px" // Adicionamos uma altura máxima para evitar que fique muito grande
                    mx="auto" // Centralizamos a imagem horizontalmente
                  />
                </GridItem>
                <GridItem>
                  <Flex direction="column" p={6} h="100%">
                    <Heading as="h2" size="xl" color="brand.espresso">
                      {book.title}
                    </Heading>
                    <Text fontSize="lg" color="gray.600" mt={2}>
                      por {book.authors.join(", ")}
                    </Text>
                    <Box flex="1" mt={6}>
                      <Heading size="md" mb={2} color="brand.espresso">
                        Sinopse
                      </Heading>
                      <Text noOfLines={10}>{book.synopsis}</Text>
                    </Box>
                    <Flex justify="flex-end" mt={6}>
                      <Button variant="ghost" mr={3} onClick={onClose}>
                        Fechar
                      </Button>
                      <Button
                        bgColor="brand.sage"
                        color="white"
                        _hover={{ bgColor: "brand.olive" }}
                        onClick={handleSaveBook}
                        isLoading={isSaving}
                      >
                        Salvar na minha lista
                      </Button>
                    </Flex>
                  </Flex>
                </GridItem>
              </Grid>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
