
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import "./SearchPage.css"
import SearchPageItemBar from './SearchPageItemBar';
import SearchBox from './SearchBox';

export default function SearchPage({username}){
    return(
        <div className="container searchPageContainer">
             <Navbar username={username}/>
             <div className="container blueContainer">
                <div className="row">
                    <SearchPageItemBar/>
                </div>
                <div className="row">
                   <SearchBox/>
                </div>
             </div>
        </div>
        
    );

}

