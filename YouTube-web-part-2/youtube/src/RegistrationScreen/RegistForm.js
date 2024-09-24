import React from "react";
import './DesignRegist.css';

//function that activates on click and validates the fields

function RegistForm() {
  return (
    <div>
      {/* enter username */}
      <div className="form-floating mb-3">
        <input type="email" className="form-control" id="username" placeholder="name@example.com" />
        <label htmlFor="floatingInput">Username</label>
      </div>
      {/* enter password */}
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
        Password must be 8 characters long, and contain numbers, English letters, uppercase letters and symbols.
        <label htmlFor="floatingPassword">Password</label>
      </div>
      {/* password verification */}
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword2" placeholder="Password" />
        <label htmlFor="floatingPasswor">Password verification</label>
      </div>
      {/* Nickname */}
      <div className="form-floating mb-3">
        <input type="email" className="form-control" id="nickname" placeholder="name@example.com" />
        <label htmlFor="floatingInput">Nickname</label>
        {/* text */}
      </div>
      Signing up constitutes your agreement to our terms, privacy policy, and cookies policy.
    </div>
  );

}

export default RegistForm;
