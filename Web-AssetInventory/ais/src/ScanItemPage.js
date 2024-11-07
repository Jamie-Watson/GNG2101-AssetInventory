
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import "./SearchPage.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function ScanItemPage({username, handleSignOut, handleSearchPage, handleScanPage}){

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
    
    useEffect(() => {

        //fetching data from API
        const fetchData = async() => {
            try {
                //collect data from this endpoint
                const res = await axios.get(`${process.env.REACT_APP_API_URL}assets/`);
                
                //set fetched items
                setItems(res.data);

            } catch (error) {
                console.error('Data could not be fetched', error);
            }
        }

        fetchData();

    }, [])

    // handle employee data from api
    useEffect (() => {
        // fetch data from API
        const fetchData = async() => {
            try {
                // collect data
                const res = await axios.get(`${process.env.REACT_APP_API_URL}employees/`);

                // set 
                setEmployees(res.data);

            } catch (error) {
                console.error('Data could not be fetched', error);
            }
        }
        fetchData();

    }, [])

    //try this by character implementation function
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
                    //barcode not found
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

    return(
        <div className="container searchPageContainer mb-5">
             <Navbar username={username} handleSignOut={handleSignOut} handleSearch={handleSearchPage} handleScanPage={handleScanPage}/>
             <div className="container blueContainer">
                <div className="row">
                    SCANNNNN
                    <p>Scanned Barcode: {barcode}</p>
                    <p>Scanned Asset Barcode: {assetCode}, Asset: {!selectedItem ? null : selectedItem.itemName}</p>
                    <p>Scanned Employee Barcode: {employeeCode}, Employee: {!selectedEmployee ? null : selectedEmployee.firstName + " " + selectedEmployee.lastName}</p>
                </div>
            </div>    
        </div>
        
    );

}
