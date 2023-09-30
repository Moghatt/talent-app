import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Customer from "../pages/customer-page/Customer";
import Product from "../pages/product-page/Product";
import Sale from "../pages/sale-page/Sale";
import Store from "../pages/store-page/Store";
import Landing from "../pages/landing-page/Landing";
import NotFound from "../components/error/NotFound";
import Stat from "../pages/stat/Stat";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "customer",
                element: <Customer />,
            },
            {
                path: "",
                element: <Landing />,
            },
            {
                path: "product",
                element: <Product />,
            },
            {
                path: "sale",
                element: <Sale />,
            },
            {
                path: "store",
                element: <Store />,
            },
            {
                path: "stat",
                element: <Stat />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
