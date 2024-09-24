import React from 'react';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';

function RegistLogo() {
  //function to navigate to home page
  const navigate = useNavigate();
  const handleMoveToHome = () => {
    navigate('/home');
  }

  return (
    <img src={logo} alt="logo" className="my-image" onClick={handleMoveToHome} />
  );
}

export default RegistLogo;
