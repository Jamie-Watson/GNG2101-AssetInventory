import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SignInPage from './SignInPage';
import SearchPage from './SearchPage';
import InstructionPage from './InstructionPage';
import React from 'react';
import { useState } from 'react';
import ScanItemPage from './ScanItemPage';

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

  const handleScanPage=()=>{
    setIsScanPage(true);
    setIsSearchPage(false);
    setIsSignedIn(true)
  }
  return (
    <>
      {!isSignedIn? <SignInPage onSignIn={handleSignIn}/>:<></> }
      {isSignedIn && isSearchPage ?<SearchPage username={username} handleSignOut={handleSignOut} handleSearchPage={handleSearchPage} handleScanPage={handleScanPage}/>:<></> }
      {isSignedIn && !isScanPage && !isSearchPage? <InstructionPage username={username} handleSignOut={handleSignOut} handleSearch={handleSearchPage} handleScanPage={handleScanPage}/> : <></>}
      {isSignedIn && isScanPage ?<ScanItemPage username={username} handleSignOut={handleSignOut} handleSearchPage={handleSearchPage} handleScanPage={handleScanPage}/>:<></> }
    </>
  );

}

export default App;
