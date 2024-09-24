import verifyCredentials from "./verifyCredentials";
import { useNavigate } from 'react-router-dom';

function LoginButton({ users, onLogin }) {

    //function to navigate to video page
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/home');
    };

    //verify credentials
    const handleClick = () => {
        var loggedInUser = verifyCredentials({ users });
        //log in
        if(loggedInUser != null){
            onLogin(loggedInUser);
            handleButtonClick();
        }
    }
    return (
        <div className="form-floating mb-3 text-center">
            <button type="button" className="btn btn-danger" onClick={handleClick}>
                Sign In
            </button>
        </div>
    );
}

export default LoginButton;
