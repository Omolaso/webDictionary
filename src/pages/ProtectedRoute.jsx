import { Navigate } from "react-router-dom";
import { dictionaryURLs } from "../URLS";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;

  if (user) return children;

  return <Navigate to={dictionaryURLs.login} />;
};

export default ProtectedRoute;
