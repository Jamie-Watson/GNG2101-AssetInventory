import './App.css';
import Navbar from './Navbar';
import InstructionPageBubble from './InstructionPageBubble';
import { useNavigate } from 'react-router-dom';

export default function InstructionPage({ username, handleSignOut }) {
  const navigate = useNavigate();

  const handleNavigateToSearch = () => navigate('/search');
  const handleNavigateToScan = () => navigate('/scan');

  return (
    <div className="instructionPageBackground">
      <div className="container-fluid align-items-center justify-content-center">
        <div className="row d-flex justify-content-center">
          <Navbar 
            username={username} 
            handleSignOut={handleSignOut} 
            handleSearch={handleNavigateToSearch} 
            handleScanPage={handleNavigateToScan} 
          />
        </div>
        
        <div 
          className="row d-flex justify-content-center align-items-center" 
          style={{ height: '70%' }}
        >
          <div className="col-sm-4 align-items-center">
            <InstructionPageBubble />
          </div>
        </div>
      </div>
    </div>
  );
}
