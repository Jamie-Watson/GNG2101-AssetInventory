import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SignInPage from './SignInPage';
import SearchPage from './SearchPage';
import InstructionPage from './InstructionPage';
import React from 'react';
import { useState } from 'react';

function App() {
  const[username, setUsername]=useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isScanPage, setIsScanPage] = useState(false);


  const handleSignIn = (currentUsername) => {
    setIsSignedIn(true);
    setUsername(currentUsername);
    console.log(currentUsername);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setIsScanPage(false);
    setIsSearchPage(false);
  };

  const handleSearchPage=()=>{
    setIsSearchPage(true);
    setIsSignedIn(true);
    setIsScanPage(false);
  }

  return (
    <>
      {!isSignedIn? <SignInPage onSignIn={handleSignIn}/>:<></> }
      {isSignedIn && isSearchPage ?<SearchPage username={username} handleSignOut={handleSignOut} handleSearchPage={handleSearchPage}/>:<></> }
      {isSignedIn && !isScanPage && !isSearchPage? <InstructionPage username={username} handleSignOut={handleSignOut} handleSearch={handleSearchPage}/> : <></>}

    </>
  );

}

export default App;
