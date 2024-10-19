import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SignInPage from './SignInPage';
import SearchPage from './SearchPage';
import React from 'react';
import { useState } from 'react';

function App() {
  const[username, setUsername]=useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = (currentUsername) => {
    setIsSignedIn(true);
    setUsername(currentUsername);
    console.log(currentUsername);
  };


  return (
    <>
      {isSignedIn ? <SearchPage username={username}/> : <SignInPage onSignIn={handleSignIn} />}
    </>
  );

  return <SearchPage username="Blank"/>;
}

export default App;
