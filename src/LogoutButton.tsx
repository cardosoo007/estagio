import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';
import { Tooltip } from './components/ui/tooltip';
import { useTranslation } from 'react-i18next';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { t } = useTranslation();
  return (
    <Tooltip content={t('terminarSessao')}>
      <Button
        colorPalette="red"
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        }
        className="button logout"
      >
        {t('sair')}
      </Button>
    </Tooltip>
  );
};

export default LogoutButton;
