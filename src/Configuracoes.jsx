import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

function Configuracoes() {
  const { t } = useTranslation();

  return (
    <Box>
      <Heading>{t('configuracoes')}</Heading>
      <Text>{t('textoConfiguracoes')}</Text>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
    </Box>
  );
}

export default Configuracoes;
