import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { gapi } from "gapi-script";
import LoginButton from '../../Components/loginbutton/LoginButton';
import { useSelector, useDispatch } from 'react-redux';
import { registerActions, loginActions } from '../../Components/store/store';
import jwt_decode from 'jwt-decode';


export default function Login() {
  const [passwordtype, setpasswordType] = useState("password")
  const [passwordicon, setPasswordIcon] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHW4dLCtZVbBZtk2J_sGHtU9Q4ksoDRwQqmg&usqp=CAU');
  const [identity, setIdentity] = useState('');
  const [password1, setPassword1] = useState(''); 
  const navigateLogin = useNavigate(null);
  const currentregister = useSelector((state)=>state.registerReducer.currentRegister);
  const dispatch = useDispatch();
  
  useEffect(() => {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '418020920930-a54a5d5a26c9guqk0eh4cucrqd057gda.apps.googleusercontent.com',
      });})
    
    if(currentregister){
      toast.success("You are Successfully registered, Please Login to continue!!!", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined, 
      });
    }      
      dispatch(registerActions.setCurrentRegister(false));
    
}, []);

  const handleToggleLogin = () => {
    if (passwordtype==="password"){ 
      setPasswordIcon("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXknxQVM8LB58CWUwnWZaBc4YmA0-gEOGw2g&usqp=CAU")
      setpasswordType("text")
    }
    else{
      setPasswordIcon("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHW4dLCtZVbBZtk2J_sGHtU9Q4ksoDRwQqmg&usqp=CAU")
      setpasswordType("password")
    }
    };

    const handleSubmit = async (e) => {     
      e.preventDefault();
      if(identity === '' || password1 === ''){
        toast.error("Please fill in all fields", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else{
        try{
          const response = await axios.post(
              'http://localhost:8000/api/auth/login',
              {
                identity: identity,
                password: password1,
              },
              { withCredentials: true }
          );
          
          var userId = jwt_decode(response.data.access_token);
          console.log(userId, "userId")
          userId = userId._id;
          console.log(userId)
          const profilePictureResponse = await axios.post(
            `http://localhost:8000/upload/images/uploadProfile/${userId}`
          );
          console.log(profilePictureResponse, "proflilepicture")
          const data = response.data;
          console.log(data, "data")
          sessionStorage.setItem("accessToken", data.access_token)
          dispatch(loginActions.setCurrentLogin()); 
          navigateLogin("/")
        }
        catch(err){
          console.log(err, "err")
          toast.error("Wrong Credentials try it with correct credentials!!")
       }}};
     
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className='website-logo' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        </div>
        <div className='login-container' style={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <h2 className='login-header'>Sign in</h2>
            <LoginButton />
            <h2 className='or-class'>or</h2>
            <input type="text" required 
              placeholder="Email or UserName" 
              className='login-email-input'
              value={identity}
              onChange={(e) => {
                setIdentity(e.target.value); 
                  }}
            />
             <Toaster />
            <div className='password-div'>
              <input type={passwordtype} required 
                placeholder="Enter Your Password" 
                className='login-password'
                value={password1}
                onChange={(e) => {
                  setPassword1(e.target.value); 
                }}
              />
              <img src={passwordicon} alt="" className='password-image' onClick={handleToggleLogin}/>
            </div>
            <div className='checkbox-wrapper' style={{display: "flex"}}>
              <input type="checkbox" className="login-checkbox"/>
              <p className='checkbox-text'>Remember Me!</p>
            </div>
            <button className='login-submit-button' onClick={handleSubmit}>Sign In</button>
            <p className='signup-footer'>Don't have an account <Link to={"/register"}>Signup here</Link></p>
        </div>
    </div>
  </div>
  )
};
