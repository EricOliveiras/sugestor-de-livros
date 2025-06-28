import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box as="main" flex="1" bg="brand.cream">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};
