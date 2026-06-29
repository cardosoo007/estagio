import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();
  return (
    <Button colorPalette="green" onClick={() => loginWithRedirect()}>
      {t('entrar')}
    </Button>
  );
};

export default LoginButton;
