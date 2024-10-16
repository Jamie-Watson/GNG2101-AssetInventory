import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SignInPage from './SignInPage';
import SearchPage from './SearchPage';
import React from 'react';
import { useState } from 'react';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  return (
    <>
      {isSignedIn ? <SearchPage /> : <SignInPage onSignIn={handleSignIn} />}
    </>
  );
}

export default App;
