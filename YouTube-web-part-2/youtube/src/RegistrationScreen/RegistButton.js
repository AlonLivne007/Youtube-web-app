import React from 'react';
import confetti from 'canvas-confetti';
import { verifyRegistration } from './validation.js';
import { useNavigate } from 'react-router-dom';

function RegistButton({ users, addUser, avatar }) {
  const handleClick = () => {
    //first check if valid
    var valid = verifyRegistration();
    if (valid) {
      const newUser = createNewUser();
      //check if unique
      if (isUniqueUser(newUser)) {
        //add user, celebrate and go to sign up
        addUser(newUser);
        confetti();
        navigateToLogin();
        window.location.reload();
      }
    };
  };

  //function to create new user
  const createNewUser = () => {
    var username = document.getElementById("username").value;
    var password = document.getElementById("floatingPassword").value;
    var nickname = document.getElementById("nickname").value;
    return { username, password, nickname, avatar };
  };

  //fuction to check if new user is unique in list
  const isUniqueUser = (newUser) => {
    for (let user of users) {
      if (user.username === newUser.username) {
        alert("Username already taken!");
        return false;
      }
      if (user.password === newUser.password) {
        alert("Password already used by another user!");
        return false;
      }
      if (user.nickname === newUser.nickname) {
        alert("Nickname already taken!");
        return false;
      }
    }
    return true;
  };

  //function to navigate to login page
  const navigate = useNavigate();
  const navigateToLogin = () => {
  navigate('/');
    };

  return (
    <div className="Dubi">
      <button className="confetti-button" onClick={handleClick}>Sign Up</button>
      <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    </div>
  );
}

export default RegistButton;