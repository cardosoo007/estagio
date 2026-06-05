import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';

// Página de configurações da aplicação.
function Configuracoes() {
  return (
    <Box>
      <Heading>Configurações</Heading>
      <Text>Aqui é onde podes mostrar opções e ajustes do site.</Text>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
    </Box>
  );
}

export default Configuracoes;
