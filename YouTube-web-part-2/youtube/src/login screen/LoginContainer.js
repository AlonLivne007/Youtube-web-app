import React from 'react';
import Logo from './Logo.js'
import LoginForm from './LoginForm.js'
import MoveToRegistration from './MoveToRegistration.js';
import './Login.css';

function LoginContainer({ users, onLogin }) {
  return (
    <div className="container form-container">
      <div className="rectangle">
        <Logo></Logo>
        <LoginForm users = { users } onLogin = { onLogin }></LoginForm>
        <MoveToRegistration></MoveToRegistration>
      </div>
    </div>
  );
}

export default LoginContainer;
