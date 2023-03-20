import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import ErrorPage from "./Pages/ErrorPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryList from "./Routes/CategoryList";
import App from "./Routes/App";
import HomePage from "./Routes/HomePage";
import Wallet from "./Routes/Wallet";
import Admin from "./Routes/Admin";
import Dashboard from "./Routes/Dashboard";
import Details from "./Routes/Details";
import Login from "./Routes/Authentication/Login";
import Signup from "./Routes/Authentication/Signup";
import AuthProvider from "./Context/AuthProvider";
import About from "./Routes/About";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "categories",
        element: <HomePage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":id",
            element: <CategoryList />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "About",
    element: <About />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </React.StrictMode>
);
