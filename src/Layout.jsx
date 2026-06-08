import { Link } from 'react-router-dom';
import { Outlet } from 'react-router';
import { Avatar, Button } from '@chakra-ui/react';

// Layout comum da app: menu de navegação e localização do conteúdo.
function Layout() {
  const loggedIn = true;
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
          {loggedIn ? (
            <Avatar.Root>
              <Avatar.Fallback name="Rodrigo Cardoso" />
            </Avatar.Root>
          ) : (
            <Link to="/login">
              <Button colorPalette="green">Login</Button>
            </Link>
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
