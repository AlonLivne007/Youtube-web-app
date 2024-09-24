import YoutubeLogo from './logo.png'
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Logo() {
    //function to navigate to home page
    const navigate = useNavigate();
    const handleMoveToHome = () => {
        navigate('/home');
    }

    return (
        <>
            <img src={YoutubeLogo} alt="Logo" className="login-image" onClick={handleMoveToHome} />
        </>
    );
}

export default Logo;