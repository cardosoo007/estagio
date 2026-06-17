import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Calendario from './Calendario';
import Equipas from './Equipas';
import Classificacoes from './Classificacoes';
import Configuracoes from './Configuracoes';
import Equipa from './Equipa';
import Liga from './Liga';
import Admin from './admin/Admin';
import Layout from './Layout.jsx';

// Roteador principal da aplicação.
// Define as rotas e qual componente renderiza para cada caminho.
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* O layout comum é renderizado para todas as rotas filhas */}
        <Route element={<Layout />}>
          <Route element={<Calendario />} path="/calendario" />
          <Route element={<Equipas />} path="/equipas" />
          <Route element={<Equipa />} path="/equipas/:id" />
          <Route element={<Classificacoes />} path="/classificacoes" />
          <Route element={<Configuracoes />} path="/configuracoes" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<Liga />} path="/ligas/:codigo" />
          <Route element={<App />} path="/" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
