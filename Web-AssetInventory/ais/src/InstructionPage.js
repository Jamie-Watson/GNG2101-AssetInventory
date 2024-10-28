import './App.css';
import Navbar from './Navbar';
import InstructionPageBubble from './InstructionPageBubble';
export default function InstructionPage({username, handleSearch, handleSignOut}){
    return(

        <div className="">
            
            <div className="container-fluid align-items-center justify-content-center instructionPageBackground">
                <div className="row d-flex justify-content-center"><Navbar username={username} handleSearch={handleSearch} handleSignOut={handleSignOut}></Navbar></div>
                
                <div className="row d-flex justify-content-center align-items-center"  style={{height: '70%'}}>
                    <div className="col-sm-4 align-items-center" >
                    <InstructionPageBubble></InstructionPageBubble>
                    </div>
                </div>
            </div>
        </div>
    );
    
}