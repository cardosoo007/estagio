import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";
import Calendario from "./Calendario";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route element={<Calendario />} path="/calendario" />
            <Route element={<App />} path="/" />
        </BrowserRouter>
    );
};

export default Routes;