import React from 'react';
import './SignInBubble';
import SignInBubble from './SignInBubble';

export default function SignInPage({ onSignIn }) {
  return (
    <div
      className="container-fluid align-items-center justify-content-center signInPageBackground noCursor"
      style={{ paddingLeft: '5rem', paddingRight: '5rem', backgroundColor: '#fcfcfc' }}
    >
      <div className="row d-flex align-items-center" style={{ height: '100%' }}>
        <div className="col-sm-5 align-items-center">
        
          <SignInBubble onSignIn={onSignIn} />
        </div>
        <div className="col-sm-1"></div>
        <div className="col-sm-6 justify-content-center">
          <h1 className="display-7 text-center">Sign Out Items With One Scan</h1>
        </div>
      </div>
    </div>
  );
}
