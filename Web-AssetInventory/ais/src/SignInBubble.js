import React from 'react';
import logo from './Images/logo-no-text.jpg';
import './App.css';
import { useState , useEffect } from 'react';
import axios from 'axios';

export default function SignInBubble({ onSignIn }) {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    // store fetched admins in here
    const [admins, setAdmins] = useState([]);

    const imgStyle = {
        objectFit: 'cover',  
        maxHeight: '200px',  
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 

        //for each admin in admins
        for (var admin of admins) {
            if (email==admin.email && password==admin.password) {
                onSignIn(email);
            }
        }
    };

    // handle admin data from api
    useEffect (() => {
        // fetch data from API
        const fetchData = async() => {

            // ADDING TEST ADMIN ACCOUNT, CAN BE USED WHEN BACKEND IS OFFLINE
            const testEmployee = {firstName: 'Test', lastName: 'Account'};
            const testAdmin = {employee: testEmployee, email: 'admin@hospital.com', username: 'test', password: '123'};
            
            try{
                // collect data
                const res = await axios.get(`${process.env.REACT_APP_API_URL}admins/`);

                // set 
                setAdmins(res.data);

            } catch {
                setAdmins([testAdmin]);
            }
        }

        fetchData();

    }, [])



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
