import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";
import Calendario from "./Calendario";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={App} path="/" exact />
            <Route component={Calendario} path="/calendario" />
        </BrowserRouter>
    );
};

export default Routes;