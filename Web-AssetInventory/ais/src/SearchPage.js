
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import "./SearchPage.css"
import SearchPageItemBar from './SearchPageItemBar';
import SearchBox from './SearchBox';
import { useState } from 'react';
import RemoveItem from './RemoveItem';
import AddItem from './AddItem';

export default function SearchPage({username, handleSignOut, handleSearchPage, handleScanPage}){

    const [isRemove, setRemove]= useState(false);
    const [isAdd, setAdd]= useState(false);
    
    const handleRemove = () => {
        setRemove(!isRemove);
        setAdd(false);
    };

    const handleAdd = () => {
        setAdd(!isAdd);
        setRemove(false);
    };

    const handleSearch = () => {
        setAdd(false);
        setRemove(false);
    };
    return(
        <div className="container searchPageContainer mb-5">
             <Navbar username={username} handleSignOut={handleSignOut} handleSearch={handleSearchPage} handleScanPage={handleScanPage}/>
             <div className="container blueContainer">
                <div className="row">
                    <SearchPageItemBar handleAdd={handleAdd} handleRemove={handleRemove}/>
                </div>
                
                {!isRemove && !isAdd ? (
                    <SearchBox/>
                ) : (
                    <></>
                )}

                {isRemove ? (
                    <RemoveItem/>
                ) : (
                    <></>
                )}

                {isAdd ? (
                   <AddItem/>
                ) : (
                    <></>
                )}
                
             </div>
        </div>
        
    );

}

