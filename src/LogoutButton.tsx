import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';
import { Tooltip } from './components/ui/tooltip';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Tooltip content="Terminar sessão">
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
        Log Out
      </Button>
    </Tooltip>
  );
};

export default LogoutButton;
