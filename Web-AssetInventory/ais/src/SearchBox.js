import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import default_image from './Images/no_image.png'

export default function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [showEditOption, setShowEditOption] = useState(false); 
    const [notes, setNotes] = useState(''); 
    const [itemName, setItemName] = useState('Item Name (#123456)'); 
    const [manufacturer, setManufacturer] = useState('Drive DeVilbiss Healthcare'); 
    const [holder, setHolder] = useState('John Smith (#74626190)'); 
    const [location, setLocation] = useState('Room 123'); 
    const [status, setStatus] = useState("Checked Out"); 
    const [date, setDate] = useState("2024-09-26"); 
    const [itemId, setItemId] = useState("");

    // hold image url
    const [imageUrl, setImageUrl] = useState('');

    //image if no image attached to item

    // will store fetched items and employees
    const [items, setItems] = useState([]);
    const [employees, setEmployees] = useState([]);

    // will store selected/clicked item and an employee who may be holding it
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1200); 
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); 
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // handle item data from API
    useEffect(() => {

        // fetching data from API
        const fetchData = async() => {
            try {
                // collect data from this endpoint
                const res = await axios.get(`${process.env.REACT_APP_API_URL}assets/`);
                
                // set fetched items
                setItems(res.data);

                //initialize filtered items, makes sure all items can be seen once loaded
                setFilteredItems(res.data);

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

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = items.filter(item =>
            item.itemName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    // function to collect item data from clicked item
    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setItemName(item.itemName);
        setItemId(item.itemId);
        setManufacturer(item.manufacturer);
        setHolder(item.holder);
        setLocation(item.location);
        setStatus(item.status);
        setDate(item.dateTaken || "");
        setNotes(item.notes || "");
        setImageUrl(item.image || default_image);
        setSelectedEmployee(employees.find(employee => employee.id === parseInt(item.holder)));
        console.log(imageUrl);
    }


    const handleEditButton = () => {
        setShowEditOption(!showEditOption); 
    };

    const handleEditSubmit = async () => {

        // updated asset
        try {
            const updated = {
                itemName,
                itemId: parseInt(itemId, 10),
                status,
                // only include these if they have a value
                ...(date && {dateTaken : date}),
                ...(manufacturer && { manufacturer }),
                ...(holder && { holder }),
                ...(location && { location }),
                ...(notes && { notes }),
            };

            // make put requeest to try replacing old asset with new one
            await axios.put(`${process.env.REACT_APP_API_URL}assets/${selectedItem.id}/`, updated);

            // refresh item list
            const res = await axios.get(`${process.env.REACT_APP_API_URL}assets/`);
            setItems(res.data);
            setFilteredItems(res.data);

            // reset selected item
            setSelectedItem(null);

        } catch (error) {
            console.error('Error updating asset:', error);
        }
        setShowEditOption(!showEditOption); 
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value); 
    };

    return (
        <div className="row">
            <div className="col-lg-6 px-5 pb-2">
                <div className="container searchBox py-5">
                    <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    {!isSmallScreen && (
                        <div className="row mb-2">
                            <div className="col-3"><strong>Item Name</strong></div>
                            <div className="col-3"><strong>Manufacturer</strong></div>
                            <div className="col-3"><strong>Location</strong></div>
                            <div className="col-3"><strong>Status</strong></div>
                        </div>
                    )}

                    <div className="result-container">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <div key={index} className="row w-100">

                                    <button className="btn btn-primary mx-1 my-1 w-100" onClick={() => handleItemSelect(item)}>

                                        <div className="row w-100">
                                            {isSmallScreen ? (
                                                <div className="col-12">{item.itemName}</div>
                                            ) : (
                                                <>
                                                    <div className="col-3">{item.itemName}</div>
                                                    <div className="col-3">{item.manufacturer}</div>
                                                    <div className="col-3">{item.location}</div>
                                                    <div className="col-3">{item.status}</div>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="row w-100">
                                <div className="col-12 text-center">No items found</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-lg-6 px-5 pb-5">
                <div className="container searchBox py-5 justify-content-center" style = {{overflowY: 'auto', overflowX: 'hidden', maxHeight: '60vh', width: '100%'}}> 
                    <div className="row justify-content-end">
                        <div className="col-sm-2 justify-content-end">
                            <button className="btn btn-primary editButton" onClick={showEditOption ? handleEditSubmit : handleEditButton}>
                                {showEditOption ? (
                                    <span>Submit</span>
                                ):(
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{ minHeight: '20vh', alignItems: 'center' }}>
                        <div className="col-sm-10 d-flex justify-content-center" style={{ height: '100%' }}>
                            <img
                                src={imageUrl}
                                className="img-fluid itemImage"
                                alt="Item"
                                style={{ height: '100%', maxHeight: '20vh', width: 'auto' }} 
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        {showEditOption ? (
                           <></>
                        ) : (
                            <h4 className="display-6 text-center pt-2"><strong>{itemName}</strong></h4>
                        )}
                    </div>
                    <div className="row">
                        <div className="text-start">
                            <p className="mb-0 px-5">
                                {showEditOption && <span>Asset Name: </span>}
                                {showEditOption ? (
                                        <input
                                            type="text"
                                            className="form-control d-inline-block"
                                            value={itemName}
                                            onChange={(e) => setItemName(e.target.value)} 
                                        />
                                    ) : 
                                        null
                                    }
                            </p>
                            <p className="mb-0 px-5">
                                Asset ID: {showEditOption ? (
                                        <input
                                            type="text"
                                            className="form-control d-inline-block"
                                            value={itemId}
                                            onChange={(e) => setItemId(e.target.value)} 
                                        />
                                    ) : (
                                        itemId
                                )}
                            </p>
                            <p className="mb-0 px-5">
                                Status: {showEditOption ? (
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
                                ) : (
                                    status
                                )}
                            </p>
                            <p className="mb-0 px-5">
                                Date: {showEditOption ? (
                                    <input
                                        type="date"
                                        className="form-control d-inline-block"
                                        value={date} 
                                        onChange={(e) => setDate(e.target.value)} 
                                    />
                                ) : (
                                    date 
                                )}
                            </p>
                            <p className="mb-0 px-5">
                                Manufacturer: {showEditOption ? (
                                    <input
                                        type="text"
                                        className="form-control d-inline-block"
                                        value={manufacturer}
                                        onChange={(e) => setManufacturer(e.target.value)} 
                                    />
                                ) : (
                                    manufacturer
                                )}
                            </p>
                            <p className="mb-0 px-5">
                                Holder: {showEditOption ? (
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
                                ) : (
                                    selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName} (#${selectedEmployee.id})` : "N/A"
                                )}
                            </p>
                            <p className="mb-0 px-5">
                                Location: {showEditOption ? (
                                    <input
                                        type="text"
                                        className="form-control d-inline-block"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)} 
                                    />
                                ) : (
                                    location
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <h5 className="text-center">Notes</h5>
                        <textarea
                            className="form-control"
                            rows="4"
                            value={notes}
                            onChange={handleNotesChange} 
                            style={{ maxHeight: '20vh' , resize:'none', maxWidth: '45vh'}} 
                            placeholder='Notes:'
                        />
                    </div>
                </div>
            </div>


        </div>
    );
}