import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function RemoveItem() {
    const [items, setItems] = useState([]);
    const [verificationMessage, setVerificationMessage] = useState('');
    const [barcode, setBarcode] = useState('');
    const [isPopUpOpen, setIsPopupOpen] = useState(false);
    const [canDelete, setCanDelete] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // handle item data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}assets/`);
                setItems(res.data);
            } catch (error) {
                console.error('Data could not be fetched', error);
            }
        };
        fetchData();
    }, []);

    // Validate the barcode input
    const validateInput = (barcode) => {
        const idToDelete = parseInt(barcode, 10);
        if (isNaN(idToDelete) || idToDelete === null || barcode === '') {
            setVerificationMessage('Invalid ID.');
            return null;
        }
        return idToDelete;
    };

    // Check if the item exists in the inventory
    const findItemToDelete = (idToDelete) => {
        const toDelete = items.find(item => parseInt(item.barcode, 10) === idToDelete);
        if (!toDelete) {
            setVerificationMessage('Item not found.');
            return null;
        }
        setItemToDelete(toDelete);
        setCanDelete(true);
        openPopup(); // Open the confirmation popup if the item exists
        setVerificationMessage('');
        return toDelete;
    };

    // Handle the delete process after confirmation
    const handleDelete = async () => {
        closePopup();
        try {
            const nameOfItem = itemToDelete.itemName;
            await axios.delete(`${process.env.REACT_APP_API_URL}assets/${itemToDelete.id}/`);
            setVerificationMessage(`Item "${nameOfItem}" was deleted.`);
        } catch {
            setVerificationMessage('Error deleting asset.');
        }
        
    };

    return (
        <div className="container noCursor">
            <div className="row">
                <div className="col-lg-6 px-5 pb-5 align-items-center">
                    <div className="container searchBox d-flex px-5 align-items-center justify-content-center" style={{ flexDirection: "column" }}>
                        <div className="row pt-4 w-100">
                            <h6 className="display-6 text-center removeItemLabel">
                                <strong>You are Removing an Asset</strong>
                            </h6>
                        </div>
                        <div className="row pt-2 w-100">
                            <div className="col-12 mb-2">
                                <p className="mb-0">
                                    Asset Serial Number:
                                    <input
                                        type="text"
                                        className="form-control d-inline-block"
                                        placeholder='Enter Serial Number'
                                        value={barcode}
                                        onChange={(e) => setBarcode(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <button className="btn btn-primary lightBlueButton my-3" onClick={() => findItemToDelete(validateInput(barcode))}>
                                Confirm
                            </button>
                        </div>
                        {verificationMessage && (
                            <div className="alert alert-info alert-dark mt-0 ms-0" role="alert" style={{ width: '100%' }}>
                                {verificationMessage}
                            </div>
                        )}
                    </div>
                </div>
                {isPopUpOpen && canDelete && (
                    <div className="col-lg-6 px-5 pb-5">
                        <div className="overlay text-currentUsername">
                            <div className="popup text-center">
                                <h6 className="display-6 removeItemLabel pb-3">
                                    <strong>Are you sure?</strong>
                                </h6>
                                <p>This action cannot be undone. Do you want to proceed?</p>
                                <div className="popup-actions">
                                    <button className="btn btn-dark" onClick={closePopup}>No</button>
                                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
