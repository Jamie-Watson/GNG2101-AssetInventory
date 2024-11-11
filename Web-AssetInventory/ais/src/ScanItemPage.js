
import 'bootstrap/dist/css/bootstrap.min.css';
import ScanPageNavbar from "./ScanPageNavbar";
import "./SearchPage.css";
import "./ScanPage.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScanPageToggler from './ScanPageToggler';

export default function ScanItemPage({handleSignOut}){

    //database info storage
    const [items, setItems] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    //states for saving barcode
    const [assetCode, setAssetCode] = useState(null);
    const [employeeCode, setEmployeeCode] = useState("");

    //barcode holder after scan
    const [barcode, setBarcode] = useState("");

    const [isSignIn, setIsSignIn]=useState(false);
    const [itemNumber, setItemNumber]=useState("");
    
    const[process, setProcess] = useState(0);
    let signInInstructionText=[   "Welcome, the system is ready to sign out items. If you wish to sign in items, click the \"Sign In Items\" button above.",
        "Please Scan your badge to start.",
        "You have scanned your badge, please scan the item you wish to sign out.",
        "You have scanned item: "+{itemNumber}+". Please scan your badge again to confirm.",
        "Item has been signed out. You are good to go."
    ];

    //try this by character implementation function

    const handleSignItemIn =()=>{

    }

    const handleSignItemOut =()=>{

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

            //scan and put each character into barcode temp variable
            if (e.key !== "Enter") {
                setBarcode((prevBarcode) => prevBarcode + e.key);
            }

            //when enter is pressed, barcode is done scanning
            if (e.key === "Enter") {

                //take only last 8 inputted values, ensures that if other buttons are pressed they are ignored
                const accBarcode = barcode.slice(-8);

                //based on existing barcodes, save it to correct variable
                if (items.includes(items.find(item => item.barcode === accBarcode))) {
                    setAssetCode(accBarcode);
                    setSelectedItem(items.find(item => item.barcode === accBarcode));

                } else if (employees.includes(employees.find(employee => employee.barcode === accBarcode))) {
                    setEmployeeCode(accBarcode);
                    setSelectedEmployee(employees.find(employee => employee.barcode === accBarcode));

                } else {
                    console.log("not found");
                }

                //reset holder state
                setBarcode("");

            }
        };

        // listens for keydown event
        window.addEventListener('keydown', handleInput);
        
        // clean up event listener, ready for next key
        return () => {
            window.removeEventListener('keydown', handleInput);
        };

    }, [barcode]);

    //check if can try item assignment
    useEffect(() => {
        if (assetCode !== "" && employeeCode !== "") { //if two valid codes were found
            if(selectedEmployee.heldItem === null) { //if selected employee is not holding an item
                if(selectedItem.holder === null) { //if item is not held by another employee can do assignment
                    setTryAssignment(true);
                    handleAssignment();
                    console.log("1");
                } else {
                    //error message: item held by another employee
                    //this is most likely a mistake as if the asset is able to be scanned, then an another employee should not have it checked out
                    //when this happens, maybe make option to remove it from them
                    clearFields();
                    console.log("2");
                }
            } else { //selected employee is holding an item
                if (selectedItem.id === selectedEmployee.heldItem) { //if that item is same as selected item, option to uncheckout
                    setTryUncheckout(true);
                    handleUncheckout();
                    console.log("3");
                } else {
                    //error message: employee is holding a different item
                    clearFields()
                    console.log("4");
                }
            }
        } 
    });

    // handle item assignment
    const handleAssignment = async() => {

        try {
            //new data for asset
            const newAsset = {
                itemName: selectedItem.itemName,
                serialNumber: selectedItem.serialNumber,
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

        clearFields();
    }

    const handleUncheckout = async() => {

        try {
            //new data for asset
            const newAsset = {
                itemName: selectedItem.itemName,
                serialNumber: selectedItem.serialNumber,
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

        clearFields();
    }

    const clearFields = async() => {
        setAssetCode("");
        setEmployeeCode("");
        setBarcode("");
        setTryAssignment(false);
        setTryUncheckout(false);

        // refresh item list
        const res1 = await axios.get(`${process.env.REACT_APP_API_URL}assets/`);
        setItems(res1.data);

        // refresh employee list
        const res2 = await axios.get(`${process.env.REACT_APP_API_URL}employees/`);
        setEmployees(res2.data);
    }
    

    /**
     * need to add assignment for when both an asset and employee are scanned
     * check for if the employee already has asset, if it is that asset, if so then option to un check out
     */

    return(
        <div className="container searchPageContainer mb-5">
            <ScanPageNavbar handleSignOut={handleSignOut}/>
            <div className="container backgroundContainer justify-content-center">
                <div className="row justify-content-center">
                    <ScanPageToggler handleSignItemIn={handleSignItemIn} handleSignItemOut={handleSignItemOut}/>
                </div>
                <div className="row justify-content-center align-items-center h-100" style={{minHeight:"80vh"}}>
                    
                    <div className="col-sm-5 scanContainer mx-5 " style={{minHeight:"50vh"}}>
                        <p>{signInInstructionText[process]}</p>
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
