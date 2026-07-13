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
// Este ficheiro serve como o mapa da navegação do projeto: cada caminho da URL aponta para uma vista específica.
// Quando se quiser adicionar uma nova página, este é um dos locais principais onde ela deve ser ligada ao sistema de rotas.
// Também ajuda a perceber rapidamente qual componente corresponde a cada secção da aplicação.
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* O layout comum é aplicado a todas as rotas filhas, o que garante uma navbar, um footer e uma estrutura visual constante em todas as páginas. */}
        {/* Todas as páginas da app passam por este ponto, o que faz com que a navegação e a experiência geral fiquem unificadas. */}
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
