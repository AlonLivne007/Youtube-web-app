import { useNavigate } from 'react-router-dom';

function MoveToRegistration() {
    //function to navigate to registration page
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/signup');
    };

    return (
        <>
            <div className="form-text mb-3 text-center">
                Not a member yet? Sign up today!
            </div>
            <div className="form-floating mb-3 text-center" onClick={handleButtonClick}>
                <button type="button" className="login-button">
                    Sign Up
                </button>
            </div>
        </>
    );
}

export default MoveToRegistration;