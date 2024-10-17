import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';

export default function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // will store fetched items
    const [items, setItems] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1200); 
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); 
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {

        // fetching data from API
        const fetchData = async() => {
            try {
                // collect data from this endpoint
                const res = await axios.get(`${process.env.REACT_APP_API_URL}assets/`);
                
                console.log("API URL:", process.env.REACT_APP_API_URL);
                console.log(res.data)
                // set fetched items
                setItems(res.data);

                //initialize filtered items, makes sure all items can be seen once loaded
                setFilteredItems(res.data);

            } catch (error) {
                console.error('Data could not be fetched', error)
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

    return (
        <div>
            <div className="col-sm-6 px-5">
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
                                    <button className="btn btn-primary mx-1 my-1 w-100">
                                        <div className="row w-100">
                                            {isSmallScreen ? (
                                                <div className="col-12">{item.itemName}</div>
                                            ) : (
                                                <>
                                                    <div className="col-3">{item.itemName}</div>
                                                    <div className="col-3">{item.manufacturer}</div>
                                                    <div className="col-3">{item.location}</div>
                                                    <div className="col-3">{item.available ? 'Available' : 'Unavailable'}</div>
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
            <div className="col-sm-6"></div>
        </div>
    );
}