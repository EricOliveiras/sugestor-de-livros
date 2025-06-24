import React, { useState } from "react";
import { Box, Image, Text, VStack, Heading, Button } from "@chakra-ui/react";
import type { Book } from "../services/bookService";

// O Card agora recebe uma função 'onRemove'
interface BookCardProps {
  book: Book;
  onRemove: (bookId: string) => Promise<void>;
}

export const BookCard = ({ book, onRemove }: BookCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemoveClick = async () => {
    setIsDeleting(true);
    await onRemove(book.id);
    // O estado de isDeleting não precisa ser revertido, pois o componente sumirá
  };

  return (
    <VStack
      p={4}
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      spacing={3}
      align="stretch"
      h="100%"
    >
      <Image
        src={book.coverUrl}
        alt={`Capa do livro ${book.title}`}
        borderRadius="md"
        h="250px"
        w="100%"
        objectFit="contain"
      />
      <VStack flex="1" spacing={1} align="stretch">
        <Heading size="sm" noOfLines={2}>
          {book.title}
        </Heading>
        <Text fontSize="sm" color="gray.600" noOfLines={1}>
          {book.authors}
        </Text>
      </VStack>
      <Button
        colorScheme="red"
        variant="outline"
        size="sm"
        isLoading={isDeleting}
        onClick={handleRemoveClick}
      >
        Remover
      </Button>
    </VStack>
  );
};
