
import 'bootstrap/dist/css/bootstrap.min.css';
import ScanPageNavbar from "./ScanPageNavbar";
import "./SearchPage.css";
import "./ScanPage.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScanPageToggler from './ScanPageToggler';

export default function ScanItemPage({username, handleSignOutApp}){

    //database info storage
    const [items, setItems] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    //states for saving barcode
    const [assetCode, setAssetCode] = useState("");
    const [employeeCode, setEmployeeCode] = useState("");

    //barcode holder after scan
    const [barcode, setBarcode] = useState("");

    const [isSignIn, setIsSignIn]=useState(false);
    
    const[scanProcess, setScanProcess] = useState(0);

    const[trySignOut, setTrySignOut]=useState(false);

    let mistakeText=["Please ensure that you are scanning your badge",
         "Please ensure that you are scanning your asset",
          "Your asset has already been signed out",
           "Your asset has already been signed in"];
    
        let signInInstructionText = [
            `Welcome, the system is ready to sign in items. If you wish to sign out items, click the "Sign Out Items" button above. <br><br>Please scan your badge to start.`,
            `You have scanned your badge, please scan the item you wish to sign in.`,
            `You have scanned item: ${barcode}. Please scan your badge again to confirm.`,
            `Item has been signed in. You are good to go.`
        ];
        
        let signOutInstructionText = [
            `Welcome, the system is ready to sign out items. If you wish to sign in items, click the "Sign In Items" button above. <br><br>Please scan your badge to start.`,
            `You have scanned your badge, please scan the item you wish to sign out.`,
            `You have scanned item: ${barcode}. Please scan your badge again to confirm.`,
            `Item has been signed out. You are good to go.`
        ];

    const[currentInstrcutions, setCurrentInstructions]=useState(signOutInstructionText[0]);
    //try this by character implementation function

    const handleSignItemIn =()=>{
        setIsSignIn(true);
        setScanProcess(0);
        setCurrentInstructions(signInInstructionText[0]);
        clearFields();    
    }

    const handleSignItemOut =()=>{
        setIsSignIn(false);
        setScanProcess(0);
        setCurrentInstructions(signOutInstructionText[0]);    
        clearFields();
    }

    useEffect(() => {

        //fetching data from API
        const fetchDataAsset = async() => {
            try {
                //collect data from this endpoint
                const res = await axios.get(`${process.env.REACT_APP_API_URL}assets/`);
                
                //set fetched items
                setItems(res.data);

            } catch (error) {
                console.error('Data could not be fetched', error);
            }
        }

        fetchDataAsset();

    }, [])

    // handle employee data from api
    useEffect (() => {
        // fetch data from API
        const fetchDataEmployee = async() => {
            try {
                // collect data
                const res = await axios.get(`${process.env.REACT_APP_API_URL}employees/`);

                // set 
                setEmployees(res.data);

            } catch (error) {
                console.error('Data could not be fetched', error);
            }
        }

        fetchDataEmployee();

    }, [])

    useEffect(() => {
        const handleInput = (e) => {
            if (e.key !== "Enter") {
                setBarcode((prevBarcode) => prevBarcode + e.key);
            }
    
            if (e.key === "Enter") {
                const accBarcode = barcode.slice(-8);
    
                if (items.find((item) => item.barcode === accBarcode)) {
                    // Item barcode scanned
                    if (scanProcess === 1) {
                        const item = items.find((item) => item.barcode === accBarcode);
                        if (isSignIn && item.status === "Checked Out") {
                            setAssetCode(accBarcode);
                            setSelectedItem(item);
                            setScanProcess(2);
                            setCurrentInstructions(signInInstructionText[2]);
                        } else if (!isSignIn && item.status === "Available") {
                            setAssetCode(accBarcode);
                            setSelectedItem(item);
                            setScanProcess(2);
                            setCurrentInstructions(signOutInstructionText[2]);
                        } else {
                            // Handle cases when item is already signed in or out incorrectly
                            setCurrentInstructions(
                                isSignIn ? mistakeText[3] : mistakeText[2]
                            );
                        }
                    } else {
                        // Item scanned out of order
                        setCurrentInstructions(mistakeText[1]);
                    }
                } else if (employees.find((employee) => employee.barcode === accBarcode)) {
                    // Employee badge scanned
                    const employee = employees.find((employee) => employee.barcode === accBarcode);
                    if (scanProcess === 0) {
                        setEmployeeCode(accBarcode);
                        setSelectedEmployee(employee);
                        setScanProcess(1);
                        setCurrentInstructions(
                            isSignIn ? signInInstructionText[1] : signOutInstructionText[1]
                        );
                    } else if (scanProcess === 2) {
                        // Final confirmation with badge
                        if (isSignIn) {
                            handleUncheckout();
                        } else {
                            handleAssignment();
                        }
                        setScanProcess(0);
                        endText();
                    } else {
                        // Badge scanned out of order
                        setCurrentInstructions(mistakeText[0]);
                    }
                } else {
                    // Barcode not recognized
                    setCurrentInstructions("This barcode is not recognized.");
                }
                setBarcode(""); // Reset barcode holder
            }
        };
    
        window.addEventListener("keydown", handleInput);
        return () => {
            window.removeEventListener("keydown", handleInput);
        };
    }, [barcode]);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function endText(){
        if(isSignIn===false){
            setCurrentInstructions(signOutInstructionText[3]);
            await delay(5000);
            setCurrentInstructions(signOutInstructionText[0]);
        }
        else{
            setCurrentInstructions(signInInstructionText[3]);
            await delay(5000);
            setCurrentInstructions(signInInstructionText[0]);

        }
        clearFields();
    }

    useEffect(() => {
        if (selectedItem) {

            if(selectedItem.status=="Available"){

                if(isSignIn===false){
                    setCurrentInstructions(`You have scanned item: ${selectedItem.barcode}. Please scan your badge again to confirm.`)
;                }
                else{
                    setCurrentInstructions(`Item: ${selectedItem.barcode} has already been brought back.`);
                    setSelectedItem(null);
                    setScanProcess(1);
                }
                
            }

            else{

                if(isSignIn){
                    setCurrentInstructions(`You have scanned item: ${selectedItem.barcode}. Please scan your badge again to confirm.`);
                }
                else{
                    setCurrentInstructions(`Item: ${selectedItem.barcode} has already been taken out.`);
                    setSelectedItem(null);
                    setScanProcess(1);
                }
            }
            
        }
    }, [selectedItem, isSignIn]);
    
    const handleSignOutButton =()=>{
        setTrySignOut(true); 
    }
    
    const handleSignOut=()=>{
        handleSignOutApp();
    }

    // handle item assignment
    const handleAssignment = async() => {

        try {
            //new data for asset
            const newAsset = {
                itemName: selectedItem.itemName,
                status: "Checked Out",
                holder: selectedEmployee.id,
            };

            console.log("new asset: ", newAsset);

            //asset put request
            await axios.put(`${process.env.REACT_APP_API_URL}assets/${selectedItem.id}/`, newAsset);

            //new data for employee
            const newEmployee = {
                heldItem: selectedItem.id,  
            };

            //employee put request
            await axios.put(`${process.env.REACT_APP_API_URL}employees/${selectedEmployee.id}/`, newEmployee);


        } catch (error) {
            console.log("error assigning");
        }

    }

    const handleUncheckout = async() => {

        try {
            //new data for asset
            const newAsset = {
                itemName: selectedItem.itemName,
                status: "Available",
                holder: null,  
            };

            //asset put request
            await axios.put(`${process.env.REACT_APP_API_URL}assets/${selectedItem.id}/`, newAsset);

            //new data for employee
            const newEmployee = {
                heldItem: null,  
            };

            //employee put request
            await axios.put(`${process.env.REACT_APP_API_URL}employees/${selectedEmployee.id}/`, newEmployee);


        } catch (error) {
            console.log("error un checking out");
        }

    }

    const clearFields = async() => {
        setAssetCode("");
        setEmployeeCode("");
        setBarcode("");
        setSelectedEmployee(null);
        setSelectedItem(null);
     

        // refresh item list
        const res1 = await axios.get(`${process.env.REACT_APP_API_URL}assets/`);
        setItems(res1.data);

        // refresh employee list
        const res2 = await axios.get(`${process.env.REACT_APP_API_URL}employees/`);
        setEmployees(res2.data);
    }
    
    const killProcess=()=>{
        isSignIn? handleSignItemIn():handleSignItemOut();
    }


    //shortcutsss woowoo
    useEffect(() => {
        const handleShortcut = (e) => {
            if (e.ctrlKey && e.key === "x") {
                e.preventDefault(); 
                killProcess();
            }

            else if (e.ctrlKey && e.shiftKey && e.key === "+") {
                e.preventDefault();
                handleSignItemIn();
            }
    
            else if (e.ctrlKey && e.key === "-") {
                e.preventDefault();
                handleSignItemOut();
            }
        };
    
        window.addEventListener("keydown", handleShortcut);
        return () => {
            window.removeEventListener("keydown", handleShortcut);
        };
    }, []);
    
    /**
     * need to add assignment for when both an asset and employee are scanned
     * check for if the employee already has asset, if it is that asset, if so then option to un check out
     */

    return(
        <div className="container searchPageContainer mb-5" style={{caretColor: "transparent"}}>
            <ScanPageNavbar handleSignOut={handleSignOutButton}/>
            <div className="container backgroundContainer justify-content-center">
                <div className="row justify-content-center">
                    <ScanPageToggler handleSignItemIn={handleSignItemIn} handleSignItemOut={handleSignItemOut} isSignIn={isSignIn}/>
                </div>
                <div className="row justify-content-center align-items-center h-100" style={{minHeight:"80vh"}}>

                <div className="col-sm-5 scanContainer mx-5 text-center align-items-center" style={{ minHeight: "50vh", position: "relative" }}>
                <button className="btn btn-danger position-absolute top-0 start-0 m-2" onClick={killProcess}>{isSignIn? "Cancel Asset Sign In": "Cancel Asset Sign Out"}</button>
                    <p
                        className="display-5 scanText"
                        dangerouslySetInnerHTML={{ __html: currentInstrcutions }}
                    />
                </div>

                    {selectedItem!==null?<div className="col-sm-5 mx-5 scanContainer justify-content-center" style={{maxHeight:"60vh", caretColor: 'transparent'}}>
                        <div className="container">
                            <div className="row justify-content-center" style={{ minHeight: '20vh', alignItems: 'center' }}>
                                <div className="col-sm-10 d-flex justify-content-center" style={{ height: '100%' }}>
                                    <img
                                        src={selectedItem.image}
                                        className={`img-fluid itemImage`}
                                        alt="Item"
                                        style={{ height: '100%', maxHeight: '20vh', width: 'auto' }} 
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <h4 className="display-6 text-center pt-2"><strong>{selectedItem.itemName}</strong></h4>
                            </div>
                            <div className="row">
                                <div className="text-start">
                                <p className="mb-0 px-5">Status:  {selectedItem.status}</p>
                                <p className="mb-0 px-5"> Date:  {selectedItem.dateTaken}</p>
                                <p className="mb-0 px-5">Manufacturer:  {selectedItem.manufacturer}</p>
                                <p className="mb-0 px-5">Holder:  {selectedItem.holder}</p>
                                <p className="mb-0 px-5">Location:  {selectedItem.location}</p>
                                </div>
                            </div>
        
                            <div className="row mb-3 justify-content-center">
                                <h5 className="text-center">Notes</h5>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={selectedItem.notes}
                                    style={{ maxHeight: '20vh' , resize:'none', maxWidth: '45vh', caretColor: 'transparent'}} 
                                    placeholder='Notes:'
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    
                    :<div className="col-sm-5 mx-5"></div>
                    }
                    
                </div>
                {trySignOut && (
                    <div className="col-lg-6 px-5 pb-5">
                        <div className="overlay text-currentUsername">
                            <div className="popup text-center">
                                <h6 className="display-6 removeItemLabel pb-3">
                                    <strong>Are you sure?</strong>
                                </h6>
                                <p>This action can only be undone by an admin. Do you want to proceed?</p>
                                <div className="popup-actions">
                                    <button className="btn btn-dark" onClick={() => setTrySignOut(false)}>No</button>
                                    <button className="btn btn-danger" onClick={handleSignOut}>Sign Out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>  
        </div>
        
    );

}
