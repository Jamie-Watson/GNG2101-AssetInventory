
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
                    <div className="col-sm-6 px-5">
                    <SearchBox/>
                    </div>
                    <div className="col-sm-6">
                        <h1>hello</h1>
                    </div>
                </div>
             </div>
        </div>
        
    );

}

