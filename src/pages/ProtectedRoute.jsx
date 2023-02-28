import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { dictionaryURLs } from "../URLS";

const ProtectedRoute = ({ onAuthStateChanged, children }) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return children;
    }
  });

  return <Navigate to={dictionaryURLs.login} />;
};

export default ProtectedRoute;
