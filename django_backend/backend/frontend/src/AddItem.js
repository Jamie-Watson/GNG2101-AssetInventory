import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import { useState , useEffect } from 'react';
import axios from 'axios';

export default function AddItem(){

    const [itemName, setItemName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [status, setStatus] = useState('Available');
    const [date, setDate] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [holder, setHolder] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const [employees, setEmployees] = useState([]);

    // handle employee data from api
    useEffect (() => {
        // fetch data from API
        const fetchData = async() => {


            try{
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

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };
    
    const handleAdd = async () => {

        // create item
        const itemToAdd = {
            itemName,
            serialNumber: parseInt(serialNumber, 10),
            status,
            // only include these if they have a value
            ...(date && {dateTaken : date}),
            ...(manufacturer && { manufacturer }),
            ...(holder && { holder }),
            ...(location && { location }),
            ...(notes && { notes }),
        };

        // use FormData because want to send both item details and image file
        const formData = new FormData();

        // append item data
        Object.keys(itemToAdd).forEach(key => {
            formData.append(key, itemToAdd[key]);
        });

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            // send POST request to django
            await axios.post(`${process.env.REACT_APP_API_URL}assets/`, formData);
            setVerificationMessage(`Item "${itemName}" was added.`);

            // reset fields
            setItemName('');
            setSerialNumber('');
            setStatus('Available');
            setDate('');
            setManufacturer('');
            setHolder('');
            setLocation('');
            setNotes('');
            setImageFile(null);

        } catch (error){
            setVerificationMessage(`Error adding asset.', ${error.response?.data?.detail || error.message}`);
        }
    }; 

    return( 
        <div className="row">
            <div className="col-lg-6 px-5 pb-5">
                <div className="container searchBox p-5 d-flex flex-column align-items-center" style={{ borderRadius: '5px'}}>
                    <h6 className="display-6 text-center removeItemLabel pt-2"><strong>{itemName || "You are Adding an Asset"}</strong></h6>
                    <div className = "input-container" style = {{overflowY: 'auto', overflowX: 'hidden', maxHeight: '60vh', width: '100%'}}>
                        <div className="row">
                            <div className="text-start w-100">
                            <p className="mb-0 px-3">
                                    Image:
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) => setImageFile(e.target.files[0])} 
                                    />
                                </p>
                                <p className="mb-0 px-3">
                                    Asset Name: 
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)} 
                                    />
                                </p>
                                <p className="mb-0 px-3">
                                    Serial Number: 
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={serialNumber}
                                        onChange={(e) => setSerialNumber(e.target.value)} 
                                    />
                                </p>
                                <p className="mb-0 px-3">
                                    Status: 
                                    <select
                                        className="form-control"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)} 
                                    >
                                        <option value="Checked Out">Checked Out</option>
                                        <option value="Available">Available</option>
                                        <option value="Needs Repair">Needs Repair</option>
                                        <option value="Lost">Lost</option>
                                    </select>
                                </p>
                                <p className="mb-0 px-3">
                                    Date: 
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={date} 
                                        onChange={(e) => setDate(e.target.value)} 
                                    />
                                </p>
                                <p className="mb-0 px-3">
                                    Manufacturer: 
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={manufacturer}
                                        onChange={(e) => setManufacturer(e.target.value)} 
                                    />
                                </p>
                                <p className="mb-0 px-3">
                                    Holder: 
                                    <select
                                        className="form-control"
                                        value={holder}
                                        onChange={(e) => setHolder(e.target.value)} 
                                    >
                                        <option value="">Select Holder</option>
                                        {employees.map((employee) => (
                                            <option key = {employee.id} value = {employee.id}>
                                                {employee.firstName} {employee.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p className="mb-0 px-3">
                                    Location: 
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)} 
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="row my-3 justify-content-center">
                            <textarea
                                className="form-control"
                                rows="4"
                                value={notes}
                                onChange={handleNotesChange} 
                                style={{ maxHeight: '10vh', resize: 'none', maxWidth: '45vh' }} 
                                placeholder='Notes:'
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <button className="btn btn-primary lightBlueButton my-3" onClick={handleAdd}>
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
        </div>
    
    );
}