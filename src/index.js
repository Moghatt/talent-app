import React from "react";
import ReactDOM from "react-dom/client";


import { AppProvider } from "./context/appContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";

import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    
        <AppProvider>
            {/* <React.StrictMode> */}
            <RouterProvider router={router} />
            {/* </React.StrictMode> */}
        </AppProvider>
);

