import React from "react";
import ReactDOM from "react-dom/client";

import { AppProvider } from "./context/appContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AppProvider>
            {/* <React.StrictMode> */}
            <RouterProvider router={router} />
            {/* </React.StrictMode> */}
        </AppProvider>
    </GoogleOAuthProvider>
);
