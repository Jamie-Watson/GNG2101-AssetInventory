
import 'bootstrap/dist/css/bootstrap.min.css';
import ScanPageNavbar from "./ScanPageNavbar";
import "./SearchPage.css";
import "./ScanPage.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScanPageToggler from './ScanPageToggler';

export default function ScanItemPage({handleSignOut}){


    //states for saving barcode
    const [assetCode, setAssetCode] = useState("");
    const [employeeCode, setEmployeeCode] = useState("");

    //barcode holder after scan
    const [barcode, setBarcode] = useState("");
    const [isSignIn, setIsSignIn]=useState(false);
    const [itemNumber, setItemNumber]=useState("");
    
    const[process, setProcess] = useState(0);
    
    let signInInstructionText=[   "Welcome, the system is ready to sign in items. If you wish to sign out items, click the \"Sign Out Items\" button above.",
        "Please Scan your badge to start.",
        "You have scanned your badge, please scan the item you wish to sign in.",
        "You have scanned item: "+{itemNumber}+". Please scan your badge again to confirm.",
        "Item has been signed in. You are good to go."
    ];

    let signOutInstructionText=[   "Welcome, the system is ready to sign out items. If you wish to sign in items, click the \"Sign In Items\" button above.",
        "Please Scan your badge to start.",
        "You have scanned your badge, please scan the item you wish to sign out.",
        "You have scanned item: "+{itemNumber}+". Please scan your badge again to confirm.",
        "Item has been signed out. You are good to go."
    ];

    //try this by character implementation function

    const handleSignItemIn =()=>{
        setIsSignIn(true);
        setProcess(0);
    }

    const handleSignItemOut =()=>{
        setIsSignIn(false);
        setProcess(0);
    }
    useEffect(() => {

     

        const handleInput = (e) => {

            //scan and put each character into barcode temp variable
            if (e.key !== "Enter") {
                setBarcode((prevBarcode) => prevBarcode + e.key);
            }

            //when enter is pressed, barcode is done scanning
            if (e.key === "Enter") {
                //based on starting value, save it to correct variable
                if (barcode.startsWith("1")) {
                    setAssetCode(barcode);
                } else if (barcode.startsWith("2")) {
                    setEmployeeCode(barcode);
                }

                //reset holder state
                setBarcode("");
            }
        };

        // listens for keydown event
        window.addEventListener('keydown', handleInput)

        // clean up event listener, ready for next key
        return () => {
            window.removeEventListener('keydown', handleInput)
        }

    }, [barcode]);

    return(
        <div className="container searchPageContainer mb-5">
            <ScanPageNavbar handleSignOut={handleSignOut}/>
            <div className="container backgroundContainer justify-content-center">
                <div className="row justify-content-center">
                    <ScanPageToggler handleSignItemIn={handleSignItemIn} handleSignItemOut={handleSignItemOut}/>
                </div>
                <div className="row justify-content-center align-items-center h-100" style={{minHeight:"80vh"}}>
                    
                    <div className="col-sm-5 scanContainer mx-5 text-center" style={{minHeight:"50vh"}}>

                        {isSignIn? <p className="display-5 scanText">{signInInstructionText[process]}</p>:<p>{signOutInstructionText[process]}</p> }
                    </div>
                    <div className="col-sm-5 scanContainer mx-5" style={{minHeight:"50vh"}}>
                        <p>Scanned Barcode: {barcode}</p>
                        <p>Scanned Asset Barcode: {assetCode}</p>
                        <p>Scanned Employee Barcode: {employeeCode}</p>     
                    </div>
                </div>
            </div>  
        </div>
        
    );

}

