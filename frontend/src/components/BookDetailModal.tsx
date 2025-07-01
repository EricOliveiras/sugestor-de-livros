import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Image,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import type { BookSuggestion } from "../services/bookService";

interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: BookSuggestion | null;
  onSave: (book: BookSuggestion) => Promise<void>;
  isSaving: boolean;
  showSaveButton?: boolean;
}

export const BookDetailModal = ({
  isOpen,
  onClose,
  book,
  onSave,
  isSaving,
  showSaveButton = true,
}: BookDetailModalProps) => {
  if (!book) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent borderRadius="lg" overflow="hidden">
        <ModalCloseButton />
        <ModalBody p={0}>
          <Grid templateColumns={{ base: "1fr", md: "30% 70%" }} w="100%">
            <GridItem>
              <Image
                src={book.coverUrl}
                alt={`Capa do livro ${book.title}`}
                w="100%"
                h="100%"
                objectFit="contain"
                maxH="500px"
                mx="auto"
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
                <Box flex="1" mt={6} minH="200px">
                  <Heading size="md" mb={2} color="brand.espresso">
                    Sinopse
                  </Heading>
                  <Text maxH="200px" overflowY="auto" pr="4" /*...*/>
                    {book.synopsis}
                  </Text>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter bg="gray.50">
          <Button variant="ghost" mr={3} onClick={onClose}>
            Fechar
          </Button>
          {showSaveButton && (
            <Button
              // CORREÇÃO DO BOTÃO: Garantindo que a cor é a 'brand.sage'
              bgColor="brand.sage"
              color="white"
              _hover={{ bgColor: "brand.olive" }}
              onClick={() => onSave(book)}
              isLoading={isSaving}
            >
              Salvar na minha lista
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
