import { Link } from 'react-router-dom';
import { Outlet } from 'react-router';

// Layout comum da app: menu de navegação e localização do conteúdo.
function Layout() {
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
      </nav>
      {/* Aqui o componente da rota atual é renderizado */}
      <Outlet />
      <footer className="footer">Construido por Rodrigo Cardoso</footer>
    </div>
  );
}

export default Layout;
