import React from "react";
import { useNavigate } from 'react-router-dom';

function RegistLoginButton() {
  //function to navigate to login page
  const navigate = useNavigate();
  const handleButtonClick = () => {
  navigate('/');
    };
  
  //button 
  return (
    <>
      <div className="login-container">
        <button className="login-button" onClick={handleButtonClick}>Already Registered? Click Here</button>
      </div>
    </>
  );
};

export default RegistLoginButton;


