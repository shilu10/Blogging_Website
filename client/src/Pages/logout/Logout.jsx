import './logout.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { pictureActions } from '../../Components/store/store';
import { GoogleLogout } from "react-google-login";
import { useGoogleLogout } from 'react-google-login';


export default function Logout() {
  const accessToken = sessionStorage.getItem("accessToken");
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const clientId = "418020920930-a54a5d5a26c9guqk0eh4cucrqd057gda.apps.googleusercontent.com";
  const onLogoutSuccess = () => {
      console.log("logout success")
      };
  const { signOut, loaded } = useGoogleLogout({  
        clientId,
        onLogoutSuccess
    });
  const dispatch = useDispatch();
  const logoutNavigator = useNavigate();
  
  useEffect(()=>{
    if(userProfile || accessToken)
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("profilePicture");
      sessionStorage.removeItem("userProfile");
      dispatch(pictureActions.setProfielPicture(""));
      if(userProfile){
        signOut();
      }
      logoutNavigator('/');
  });
  return (
    <div>
     
    </div>
  )
}







    
