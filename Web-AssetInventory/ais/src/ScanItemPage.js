
import 'bootstrap/dist/css/bootstrap.min.css';
import ScanPageNavbar from "./ScanPageNavbar";
import "./SearchPage.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function ScanItemPage({handleSignOut}){


    //states for saving barcode
    const [assetCode, setAssetCode] = useState("");
    const [employeeCode, setEmployeeCode] = useState("");

    //barcode holder after scan
    const [barcode, setBarcode] = useState("");
    

    //try this by character implementation function
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
             <div className="container blueContainer">
                <div className="row">
                    SCANNNNN
                    <p>Scanned Barcode: {barcode}</p>
                    <p>Scanned Asset Barcode: {assetCode}</p>
                    <p>Scanned Employee Barcode: {employeeCode}</p>
                </div>
            </div>    
        </div>
        
    );

}

