import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';


const items = [
    { id: 1, name: 'Wheelchair', manufacturer: 'Company A', location: 'Warehouse 1', status: 'In' },
    { id: 2, name: 'Wheelchair', manufacturer: 'Company B', location: 'Warehouse 2', status: 'Out' },
    { id: 3, name: 'Walker', manufacturer: 'Company C', location: 'Warehouse 3', status: 'In' },
    { id: 4, name: 'Cane', manufacturer: 'Company A', location: 'Warehouse 1', status: 'In' },
    { id: 5, name: 'Crutches', manufacturer: 'Company B', location: 'Warehouse 2', status: 'Out' },
    { id: 6, name: 'Hospital Bed', manufacturer: 'Company D', location: 'Warehouse 4', status: 'In' },
    { id: 7, name: 'Wheelchair', manufacturer: 'Company A', location: 'Warehouse 3', status: 'Out' },
    { id: 8, name: 'Oxygen Tank', manufacturer: 'Company C', location: 'Warehouse 5', status: 'In' },
    { id: 9, name: 'Wheelchair', manufacturer: 'Company B', location: 'Warehouse 2', status: 'Out' },
    { id: 10, name: 'Walker', manufacturer: 'Company D', location: 'Warehouse 1', status: 'In' },
    { id: 11, name: 'Cane', manufacturer: 'Company A', location: 'Warehouse 1', status: 'Out' },
    { id: 12, name: 'Crutches', manufacturer: 'Company C', location: 'Warehouse 3', status: 'In' },
    { id: 13, name: 'Oxygen Tank', manufacturer: 'Company B', location: 'Warehouse 4', status: 'Out' },
    { id: 14, name: 'Defibrillator', manufacturer: 'Company D', location: 'Warehouse 5', status: 'In' },
    { id: 15, name: 'Stretcher', manufacturer: 'Company A', location: 'Warehouse 2', status: 'In' },
];


export default function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1200); 
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); 
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = items.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    return (
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
                {filteredItems.map(item => (
                    <div key={item.id} className="row w-100">
                        <button className="btn btn-primary mx-1 my-1 w-100">
                            <div className="row w-100">
                                {isSmallScreen ? (
                                    <div className="col-12">{item.name}</div> 
                                ) : (
                                    <>
                                        <div className="col-3">{item.name}</div>
                                        <div className="col-3">{item.manufacturer}</div>
                                        <div className="col-3">{item.location}</div>
                                        <div className="col-3">{item.status}</div>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
