
import React from 'react';
import logo from './Images/logo-no-text.jpg';
import './App.css';


export default function SignInBubble() {

    
    const imgStyle = {
        objectFit: 'cover',  // Or 'contain', depending on your needs
        maxHeight: '200px',  // Optional: set a max height if needed
    };
    
    return (
        <div className="container justify-content-center noCursor " style={{borderColor:'#d6d6d6', border:'2px solid', borderRadius:'10px', backgroundColor:"#fcfcfc"}}>
            <div className="row justify-content-center">
                <div class="col-sm-6 justify-content-center colour-style-2 pt-5">
                    <div class="text-center">
                        <img src={logo} class="img-fluid rounded-circle" alt="" style={imgStyle}/>
                        
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-6"><p className="display-5 textStyle text-center">Sign in to Asset Inventory System</p></div>
            </div>
            <div className="container justify-content-center">
                <form className= "justify-content-center">
                    <div className="form-group my-2">
                        <input 
                            type="email" 
                            className="form-control lightBlueBackground" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Username" 
                        />
                    </div>
                    <div className="form-group my-5">
                        <input 
                            type="password" 
                            className="form-control lightBlueBackground" 
                            id="exampleInputPassword1" 
                            placeholder="Password" 
                        />
                    </div>
                    <div className="row justify-content-center my-2">
                        <div className="col-sm-12 text-center justify-content-center">
                            <button type="submit" className="btn btn-primary lightBlueButton" onClick="">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

