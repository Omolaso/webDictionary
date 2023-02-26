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
      errorElement: <ErrorPage />,
    },
    {
      path: dictionaryURLs.signUp,
      element: <SignUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: dictionaryURLs.dico,
      element: <Dictionary />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
