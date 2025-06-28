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
      {/* Removemos o bg e o p daqui para que cada página controle seu estilo */}
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};
