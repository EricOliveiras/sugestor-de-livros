import { useState } from "react";
import Slider from "react-slick";
import { Box, Heading, Text, VStack, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

// Dados para cada slide do carrossel
const slidesData = [
  {
    image:
      "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=800&q=80",
    title: "Descubra o Inesperado",
    text: "O Oráculo encontra livros que você não sabia que precisava ler.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
    title: "Construa sua Estante",
    text: "Salve suas descobertas e crie uma coleção pessoal de futuras leituras.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?w=800&q=80",
    title: "Deixe sua Marca",
    text: "Avalie suas jornadas e transforme cada livro em uma memória duradoura.",
  },
];

// Componente de seta customizado para o carrossel
const CustomArrow = (props: any) => {
  const { onClick, direction } = props;
  return (
    <IconButton
      aria-label={direction === "left" ? "Slide anterior" : "Próximo slide"}
      icon={direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      onClick={onClick}
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      left={direction === "left" ? { base: "2", md: "8" } : undefined}
      right={direction === "right" ? { base: "2", md: "8" } : undefined}
      zIndex="2"
      borderRadius="full"
      size="lg"
      bgColor="whiteAlpha.400"
      color="white"
      _hover={{ bgColor: "whiteAlpha.600" }}
    />
  );
};

// Animação para o texto
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
};

export const AuthCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    afterChange: (current: number) => setActiveSlide(current),
  };

  return (
    <Box
      position="relative"
      h="100vh"
      w="100%"
      overflow="hidden"
      bg="brand.espresso"
    >
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <Box key={slide.title}>
            <Flex
              h="100vh"
              bgImage={`url(${slide.image})`}
              bgSize="cover"
              bgPosition="center"
              position="relative"
            >
              <Box position="absolute" inset="0" bg="blackAlpha.600" />
              <AnimatePresence>
                {index === activeSlide && (
                  <Flex
                    position="relative"
                    w="100%"
                    h="100%"
                    direction="column"
                    justify="center"
                    align="center"
                    textAlign="center"
                    p={10}
                    color="white"
                    as={motion.div}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    variants={textVariants}
                  >
                    <VStack spacing={4} maxW="lg">
                      <Heading size="3xl">{slide.title}</Heading>
                      <Text fontSize="xl">{slide.text}</Text>
                    </VStack>
                  </Flex>
                )}
              </AnimatePresence>
            </Flex>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
