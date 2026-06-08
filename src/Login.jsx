import { Box, Button, Heading, Input, Text, VStack } from '@chakra-ui/react';
import './Login.css';

// Página de login da aplicação.
function Login() {
  return (
    <Box className="login-page">
      <VStack className="login-form">
        <Heading>Login</Heading>
        <Text>Entra na tua conta </Text>

        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />

        <Button colorPalette="green">Entrar</Button>
      </VStack>
    </Box>
  );
}

export default Login;
