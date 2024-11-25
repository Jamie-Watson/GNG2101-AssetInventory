import React, { useState, useEffect } from "react";
import {
  HashRouter as Router, // Use HashRouter instead of BrowserRouter
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SignInPage from "./SignInPage";
import SearchPage from "./SearchPage";
import InstructionPage from "./InstructionPage";
import ScanItemPage from "./ScanItemPage";

function App() {
  const [username, setUsername] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = (currentUsername) => {
    setIsSignedIn(true);
    setUsername(currentUsername);
    console.log(currentUsername);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? (
              <Navigate to="/instructions" />
            ) : (
              <SignInPage onSignIn={handleSignIn} />
            )
          }
        />
        <Route
          path="/instructions"
          element={
            isSignedIn ? (
              <InstructionPage
                username={username}
                handleSignOut={handleSignOut}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/search"
          element={
            isSignedIn ? (
              <SearchPage
                username={username}
                handleSignOut={handleSignOut}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/scan"
          element={
            isSignedIn ? (
              <ScanItemPageWithLock
                username={username}
                handleSignOut={handleSignOut}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

function ScanItemPageWithLock({ username, handleSignOut }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.replaceState(null, "", window.location.href);

    const handlePopState = (e) => {
      navigate("/scan");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <ScanItemPage
      username={username}
      handleSignOutApp={handleSignOut}
    />
  );
}

export default App;
