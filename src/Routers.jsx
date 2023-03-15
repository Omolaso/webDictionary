import React, { useState } from "react";
import { dictionaryURLs } from "./URLS";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/SignUp";
import Dictionary from "./pages/Dictionary";
import StoredWords from "./pages/StoredWords";
import ProtectedRoute from "./pages/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Routers = () => {
  const [bgToggle, setBgToggle] = useState(false);

  // ROUTES
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
      errorElement: <ErrorPage />,
    },
    {
      path: dictionaryURLs.dico,
      element: (
        <ProtectedRoute>
          <Dictionary bgToggle={bgToggle} setBgToggle={setBgToggle} />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: dictionaryURLs.storedWords,
      element: (
        <ProtectedRoute>
          <StoredWords bgToggle={bgToggle} />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
