import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import { useState } from 'react';

export default function AddItem(){

    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [status, setStatus] = useState('Available');
    const [date, setDate] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [holder, setHolder] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    return(<div className="row">
        <div className="col-lg-6 px-5 pb-5">
        <div className="container searchBox p-5 d-flex align-items-center justify-content-center" style={{flexDirection:"column"}}>
                <div className="row mb-3">
                    <h6 className="display-6 text-center removeItemLabel pt-2"><strong>{itemName || "You are Adding an Asset"}</strong></h6>
                </div>
                <div className="row">
                    <div className="text-start">
                        <p className="mb-0 px-5">
                            Asset Name: 
                            <input
                                type="text"
                                className="form-control d-inline-block"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)} 
                            />
                        </p>
                        <p className="mb-0 px-5">
                            Asset Code: 
                            <input
                                type="text"
                                className="form-control d-inline-block"
                                value={itemCode}
                                onChange={(e) => setItemCode(e.target.value)} 
                            />
                        </p>
                        <p className="mb-0 px-5">
                            Status: 
                            <select
                                className="form-control d-inline-block"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)} 
                            >
                                <option value="Checked Out">Checked Out</option>
                                <option value="Available">Available</option>
                                <option value="Needs Repair">Needs Repair</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </p>
                        <p className="mb-0 px-5">
                            Date: 
                            <input
                                type="date"
                                className="form-control d-inline-block"
                                value={date} 
                                onChange={(e) => setDate(e.target.value)} 
                            />
                        </p>
                        <p className="mb-0 px-5">
                            Manufacturer: 
                            <input
                                type="text"
                                className="form-control d-inline-block"
                                value={manufacturer}
                                onChange={(e) => setManufacturer(e.target.value)} 
                            />
                        </p>
                        <p className="mb-0 px-5">
                            Holder: 
                            <input
                                type="text"
                                className="form-control d-inline-block"
                                value={holder}
                                onChange={(e) => setHolder(e.target.value)} 
                            />
                        </p>
                        <p className="mb-0 px-5">
                            Location: 
                            <input
                                type="text"
                                className="form-control d-inline-block"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)} 
                            />
                        </p>
                    </div>
                </div>
                <div className="row my-3">
                    <textarea
                        className="form-control"
                        rows="4"
                        value={notes}
                        onChange={handleNotesChange} 
                        style={{ maxHeight: '10vh', resize: 'none' }} 
                        placeholder='Notes:'
                    />
                </div>
            <div className="row mb-3">
                <button className="btn btn-primary lightBlueButton my-3" href="#" >Confirm</button>
            </div>
            </div>
        </div>


    </div>)
}