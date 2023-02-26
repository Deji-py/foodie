import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import ErrorPage from "./Pages/ErrorPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryList, { categoryLoader } from "./Routes/CategoryList";

import App from "./Routes/App";
import { catLoader } from "./Components/Categories";
import { CartCountContext } from "./Context/cartContext";
import HomePage, { homepageLoader } from "./Routes/HomePage";
import Wallet from "./Routes/Wallet";
import Admin from "./Routes/Admin";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        loader: homepageLoader,
        element: <HomePage />,
        children: [
          {
            path: "/home/categories/:id",
            element: <CategoryList />,
            loader: categoryLoader,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
