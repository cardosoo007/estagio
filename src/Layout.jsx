import { Link } from 'react-router-dom';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Página Principal</Link>
        <Link to="/calendario">Calendário</Link>
        <Link to="/classificacoes">Classificações</Link>
        <Link to="/equipas">Equipas</Link>
        <Link to="/jogadores">Jogadores</Link>
        <Link to="/marcadores">Marcadores</Link>
        <Link to="/torneios">Torneios</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
