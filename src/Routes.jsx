import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Calendario from './Calendario';
import Equipas from './Equipas';
import Torneios from './Torneios';
import Classificacoes from './Classificacoes';
import Marcadores from './Marcadores';
import Configuracoes from './Configuracoes';
import Jogador from './Jogador';
import Equipa from './Equipa';
import Jogadores from './Jogadores.jsx';
import Admin from './admin/Admin';
import AdminJogador from './admin/AddJogador';
import Layout from './Layout.jsx';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Calendario />} path="/calendario" />
          <Route element={<Equipas />} path="/equipas" />
          <Route element={<Equipa />} path="/equipas/:id" />
          <Route element={<Torneios />} path="/torneios" />
          <Route element={<Classificacoes />} path="/classificacoes" />
          <Route element={<Marcadores />} path="/marcadores" />
          <Route element={<Jogadores />} path="/jogadores" />
          <Route element={<Configuracoes />} path="/configuracoes" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<AdminJogador />} path="/admin/adjogador" />
          <Route element={<Jogador />} path="/jogadores/:id" />
          <Route element={<App />} path="/" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
