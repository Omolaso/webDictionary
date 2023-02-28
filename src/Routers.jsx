import React from "react";
import { dictionaryURLs } from "./URLS";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/SignUp";
import Dictionary from "./pages/Dictionary";
import ProtectedRoute from "./pages/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

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
      element: (
        <ProtectedRoute onAuthStateChanged={onAuthStateChanged}>
          <Dictionary onAuthStateChanged={onAuthStateChanged} />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
