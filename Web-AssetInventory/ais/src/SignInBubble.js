import React from 'react';
import logo from './Images/logo-no-text.jpg';
import './App.css';
import { useState } from 'react';

export default function SignInBubble({ onSignIn }) {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const imgStyle = {
        objectFit: 'cover',  
        maxHeight: '200px',  
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if(email=="admin@hospital.com" && password=="123"){
            onSignIn(); 
        }
        
    };

    return (
        <div className="container justify-content-center noCursor" style={{ borderColor: '#d6d6d6', border: '2px solid', borderRadius: '10px', backgroundColor: "#fcfcfc" }}>
            <div className="row justify-content-center">
                <div className="col-sm-6 justify-content-center colour-style-2 pt-5">
                    <div className="text-center">
                        <img src={logo} className="img-fluid rounded-circle" alt="" style={imgStyle} />
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    <p className="display-5 textStyle text-center">Sign in to Asset Inventory System</p>
                </div>
            </div>
            <div className="container justify-content-center">
                <form className="justify-content-center" onSubmit={handleSubmit}> 
                    <div className="form-group my-2">
                        <input
                            type="email"
                            className="form-control lightBlueBackground"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Username"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group my-5">
                        <input
                            type="password"
                            className="form-control lightBlueBackground"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="row justify-content-center my-2">
                        <div className="col-sm-12 text-center justify-content-center">
                            <button type="submit" className="btn btn-primary lightBlueButton">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
