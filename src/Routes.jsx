import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Calendario from "./Calendario";
import Equipas from "./Equipas";
import Torneios from "./Torneios";
import Classificacoes from "./Classificacoes";
import Marcadores from "./Marcadores";
import Configuracoes from "./Configuracoes";
import Jogador from "./Jogador";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Calendario />} path="/calendario" />
                <Route element={<Equipas />} path="/equipas" />
                <Route element={<Torneios />} path="/torneios" />
                <Route element={<Classificacoes />} path="/classificacoes" />
                <Route element={<Marcadores />} path="/marcadores" />
                <Route element={<Configuracoes />} path="/configuracoes" />
                <Route element={<Jogador />} path="/jogador/:id" />
                <Route element={<App />} path="/" />


            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;