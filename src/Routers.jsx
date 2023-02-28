import React from "react";
import { dictionaryURLs } from "./URLS";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/SignUp";
import Dictionary from "./pages/Dictionary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: dictionaryURLs.home,
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: dictionaryURLs.login,
      element: <Login />,
    },
    {
      path: dictionaryURLs.signUp,
      element: <SignUp />,
    },
    {
      path: dictionaryURLs.dico,
      element: <Dictionary />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
