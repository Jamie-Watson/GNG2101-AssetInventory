
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import "./SearchPage.css"
import SearchPageItemBar from './SearchPageItemBar';
import SearchBox from './SearchBox';
import { useState } from 'react';

export default function SearchPage({username}){

    const [isRemove, setRemove]= useState(false);
    const [isAdd, setAdd]= useState(false);
    
    const handleRemove = () => {
        setRemove(!isRemove);
    };

    const handleAdd = () => {
        setAdd(!isAdd);
    };
    return(
        <div className="container searchPageContainer mb-5">
             <Navbar username={username}/>
             <div className="container blueContainer">
                <div className="row">
                    <SearchPageItemBar handleAdd={handleAdd} handleRemove={handleRemove}/>
                </div>
                
                {!isRemove && !isAdd ? (
                    <SearchBox/>
                ) : (
                    <></>
                )}

                {!isRemove && !isAdd ? (
                    <SearchBox/>
                ) : (
                    <></>
                )}

                {!isRemove && !isAdd ? (
                    <SearchBox/>
                ) : (
                    <></>
                )}
                
             </div>
        </div>
        
    );

}

