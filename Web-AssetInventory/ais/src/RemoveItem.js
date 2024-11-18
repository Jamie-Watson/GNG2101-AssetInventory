import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import axios from 'axios';
import { useState , useEffect } from 'react';



export default function RemoveItem(){

    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [barcode, setBarcode] = useState('');

    // handle item data from API (grabbed from SearchBox.js file)
    useEffect(() => {

        // fetching data from API
        const fetchData = async() => {
            try {
                // collect data from this endpoint
                const res = await axios.get(`${process.env.REACT_APP_API_URL}assets/`);
                
                // set fetched items
                setItems(res.data);

            
            } catch (error) {
                console.error('Data could not be fetched', error);
            }
        }

        fetchData();

    }, [])

    // handle delete after submit is pressed
    const handleDelete = async () => {
        try {

            const idToDelete = parseInt(barcode, 10);
            if (isNaN(idToDelete) || idToDelete === null) {
                setVerificationMessage('Invalid ID.');
                return;
            }

            // find item
            console.log(idToDelete);
            const toDelete = items.find(item => parseInt(item.barcode, 10) === idToDelete);

            console.log(toDelete);

            if (!toDelete) {
                setVerificationMessage('Item not found.');
                return;
            }

            // save item name
            const nameOfItem = toDelete.itemName;
            
            // try delete
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}assets/${toDelete.id}/`);
            setVerificationMessage(`Item "${nameOfItem}" was deleted.`);

            // if error deleting
        } catch {
            setVerificationMessage('Error deleting asset.');
        }
    };


    return(<div className="row">
        <div className="col-lg-6 px-5 pb-5 align-items-center">
            <div className="container searchBox d-flex px-5 align-items-center justify-content-center" style={{flexDirection:"column"}}>
                <div className="row pt-4 w-100">
                    <h6 className="display-6 text-center removeItemLabel">
                        <strong>You are Removing an Asset</strong>
                    </h6>
                </div>
                <div className="row pt-2 w-100">

                    {/*
                    perhaps we want this but for now we will use just the id of the item

                    <div className="col-12 mb-2"> 
                        <p className="mb-0">
                            Asset Name: 
                            <input
                                type="text"
                                className="form-control d-inline-block"
                                placeholder='Enter Asset To Be Removed'
                            />        
                        </p>
                    </div>
                    */}
                    <div className="col-12 mb-2"> 
                        <p className="mb-0">
                            Asset Serial Number: 
                            <input
                                type="text"
                                className="form-control d-inline-block"
                                placeholder='Enter Serial Number'
                                value = {barcode}
                                onChange = {(e) => setBarcode(e.target.value)}
                            />        
                        </p>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary lightBlueButton my-3" onClick = {handleDelete}>
                        Confirm
                    </button>
                </div>
                {verificationMessage && (
                    <div className = "alert alert-info mt-0 ms-0" role = "alert" style={{width: '100%'}}>
                        {verificationMessage}
                    </div>
                )}
            </div>
        </div>
    </div>)
}