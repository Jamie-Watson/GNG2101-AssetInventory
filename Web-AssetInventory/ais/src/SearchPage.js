
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import "./SearchPage.css"
import SearchPageItemBar from './SearchPageItemBar';
import SearchBox from './SearchBox';

export default function SearchPage(){
    return(
        <div className="container searchPageContainer">
             <Navbar username="John Doe"/>
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

