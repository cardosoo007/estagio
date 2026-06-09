import { Link } from 'react-router-dom';
import { Outlet } from 'react-router';
import { Avatar, Text } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

// Layout comum da app: menu de navegação e localização do conteúdo.
function Layout() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      <nav className="navbar">
        {/* Navegação principal do site */}
        <Link to="/">Página Principal</Link>
        <Link to="/calendario">Calendário</Link>
        <Link to="/classificacoes">Classificações</Link>
        <Link to="/equipas">Equipas</Link>
        <Link to="/jogadores">Jogadores</Link>
        <Link to="/marcadores">Marcadores</Link>
        <Link to="/torneios">Torneios</Link>
        <Link to="/configuracoes">Configurações</Link>
        <div className="login-button">
          {isAuthenticated ? (
            <>
              <div className="perfil-utilizador">
                <Avatar.Root>
                  <Avatar.Fallback name={user?.name} />
                  <Avatar.Image src={user?.picture} />
                </Avatar.Root>
                <Text>{user?.name}</Text>
              </div>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
      {/* Aqui o componente da rota atual é renderizado */}
      <Outlet />
      <footer className="footer">Construido por Rodrigo Cardoso</footer>
    </div>
  );
}

export default Layout;
