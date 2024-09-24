import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import './DesignRegist.css';
import RegistForm from './RegistForm';
import RegistButton from './RegistButton';
import RegistLogo from './RegistLogo';
import RegistUpload from './RegistUpload';
import RegistLoginButton from './RegistLoginButton';

function RegistrationContainer({ users, addUser }) {
  const [avatar, setAvatar] = useState("/localPhotos/defualtAvatar.png");

  const handleImageUpload = (imageData) => {
    setAvatar(imageData);
  };

    return(
      <div className="container-rec">
      <div className="inner-container form-container">
        <RegistForm/>
        <RegistButton users ={ users } addUser = { addUser } avatar={avatar}/>
      </div>
      <div className="image-container">
        <RegistLogo/>
        <RegistUpload imageUpload={handleImageUpload}/>
        <RegistLoginButton/>
      </div>
    </div>
  );
}

export default RegistrationContainer;