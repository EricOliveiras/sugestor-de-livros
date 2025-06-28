import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Avatar,
  Flex, // Importamos Flex
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "../services/userService";

export const SettingsPage = () => {
  const { user, updateUserData } = useAuth();
  const toast = useToast();

  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setAvatarUrl(user?.avatarUrl || "");
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const updatedUser = await updateProfile({ name, avatarUrl });
      updateUserData(updatedUser);
      toast({
        title: "Perfil Atualizado!",
        description: "Suas informações foram salvas com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar seu perfil.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack
        spacing={6}
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="md"
        align="stretch"
      >
        <Heading as="h1" size="xl" color="brand.espresso">
          Configurações de Perfil
        </Heading>

        <VStack as="form" spacing={4} onSubmit={handleSubmit}>
          {/* AQUI ESTÁ A MUDANÇA: Envolvemos em um Flex para centralizar */}
          <FormControl>
            <FormLabel>Avatar</FormLabel>
            <Flex justify="center" align="center" direction="column">
              <Avatar size="2xl" name={user?.name} src={avatarUrl} mb={4} />
              <Input
                type="url"
                placeholder="http://exemplo.com/sua-foto.jpg"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                focusBorderColor="brand.sage"
              />
            </Flex>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              focusBorderColor="brand.sage"
            />
          </FormControl>

          <Button
            type="submit"
            bgColor="brand.sage"
            color="white"
            size="lg"
            isLoading={isLoading}
            _hover={{ bgColor: "brand.olive" }}
            alignSelf="flex-end"
          >
            Salvar Alterações
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};
