
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import "./SearchPage.css"

export default function ScanItemPage({username, handleSignOut, handleSearchPage, handleScanPage}){

    return(
        <div className="container searchPageContainer mb-5">
             <Navbar username={username} handleSignOut={handleSignOut} handleSearch={handleSearchPage} handleScanPage={handleScanPage}/>
             <div className="container blueContainer">
                <div className="row">SCANNNNN</div>
            </div>    
        </div>
        
    );

}

