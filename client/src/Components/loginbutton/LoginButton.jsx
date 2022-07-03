import { useGoogleLogin, GoogleLogin } from 'react-google-login';
import './loginbutton.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/store';

const clientId = "418020920930-a54a5d5a26c9guqk0eh4cucrqd057gda.apps.googleusercontent.com";

const LoginButton = () => {
    const LoginNavigator = useNavigate();
    const dispatch = useDispatch();

    const onSuccess = (res) =>{
        console.log(res.profileObj, JSON.stringify(res.profileObj))
        sessionStorage.setItem("userProfile", JSON.stringify(res.profileObj));
        LoginNavigator("/");
        dispatch(loginActions.setCurrentLogin());
    }

    return(
        <div className='login-button'>
            <GoogleLogin 
                onSuccess={onSuccess}
                buttonText="Continue with Google"
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                style={{style: "none"}}
                className="login-button-oauth"
                scope=""
                clientId={clientId}
            />
        </div>
    )};
export default LoginButton;