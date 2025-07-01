import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  Button,
  Flex,
  Spacer,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import type { Book } from "../services/bookService";

interface BookCardProps {
  book: Book;
  onRemove: (bookId: string) => Promise<void>;
  onRate: (bookId: string, rating: number) => Promise<void>;
  onCardClick: (book: Book) => void;
}

export const BookCard = ({
  book,
  onRemove,
  onRate,
  onCardClick,
}: BookCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const initialRating =
    book.ratings && book.ratings.length > 0 ? book.ratings[0].value : 0;

  const handleRating = (rate: number) => {
    onRate(book.id, rate);
  };

  const handleRemoveClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    await onRemove(book.id);
  };

  return (
    <Flex
      direction="column"
      p={4}
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      h="100%"
      cursor="pointer"
      onClick={() => onCardClick(book)}
      transition="all 0.2s"
      _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
    >
      {/* IMAGEM MAIS LARGA, COMO SOLICITADO */}
      <Image
        src={book.coverUrl}
        alt={`Capa do livro ${book.title}`}
        borderRadius="md"
        h="280px"
        w="100%"
        objectFit="contain"
      />

      <Flex direction="column" flex="1" mt={4}>
        <Box>
          <Heading size="sm" noOfLines={2}>
            {book.title}
          </Heading>
          <Text fontSize="sm" color="gray.600" noOfLines={1} mb={2}>
            {book.authors}
          </Text>
        </Box>

        <Spacer />

        {/* SUA SOLUÇÃO CORRETA PARA AS ESTRELAS NA HORIZONTAL */}
        <HStack
          spacing={1}
          pt={2}
          onMouseLeave={() => setHoverRating(0)}
          onClick={(e) => e.stopPropagation()}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              as={StarIcon}
              boxSize={6}
              color={
                star <= (hoverRating || initialRating) ? "gold" : "gray.300"
              }
              cursor="pointer"
              onMouseEnter={() => setHoverRating(star)}
              onClick={() => handleRating(star)}
            />
          ))}
        </HStack>
      </Flex>

      <Button
        mt={4}
        colorScheme="red"
        variant="outline"
        size="sm"
        isLoading={isDeleting}
        onClick={handleRemoveClick}
      >
        Remover
      </Button>
    </Flex>
  );
};
