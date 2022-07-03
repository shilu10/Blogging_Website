import React, { useState, createContext } from 'react';
import LoginButton from '../../Components/loginbutton/LoginButton';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import './register.css';
import { useDispatch } from 'react-redux';
import { registerActions } from '../../Components/store/store';

const Register = () => {
  const [passwordtyperegister, setpasswordTypeRegister] = useState("password")
  const [passwordiconregister, setPasswordIconRegister] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHW4dLCtZVbBZtk2J_sGHtU9Q4ksoDRwQqmg&usqp=CAU');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const navigateLoginRegister = useNavigate(null);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
 
  const handleToggleRegister = () => {
    if (passwordtyperegister==="password"){ 
      setPasswordIconRegister("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXknxQVM8LB58CWUwnWZaBc4YmA0-gEOGw2g&usqp=CAU")
      setpasswordTypeRegister("text")
    }
    else{
      setPasswordIconRegister("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHW4dLCtZVbBZtk2J_sGHtU9Q4ksoDRwQqmg&usqp=CAU")
      setpasswordTypeRegister("password")
    }
    };

    const handleSubmitRegister = async (e) => {  
      console.log("clicked")   
      e.preventDefault();
      if(email === '' || password === '' || username === ''){
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
              'http://localhost:8000/api/auth/register',
              {
                email: email,
                username: username,
                password: password,
              }   
          )
          dispatch(registerActions.setCurrentRegister(true));
          navigateLoginRegister('/login')
        }
        catch(err){
          toast.error("Wrong Credentials try it with correct credentials!! ")
       }}};


  return (
      <div className='register-page'>
        <div className="register-wrapper">
          <div className='website-logo-register' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

          </div>
          <Toaster />
          <div className='register-container' style={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
              <h2>Signup Here</h2>
              <LoginButton />
              <h2 className='or-class-register'>or</h2>
              <input type="Enter your Email" required 
                placeholder="Enter your email" 
                className='register-email-input'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value); 
                    }}
              />

              <input type="text" required 
                  placeholder="Enter your username" 
                  className='register-username-input'
                  value={username}
                  onChange={(e) => {
                  setUsername(e.target.value); 
                    }}
              />

              <div className='password-div-register'>
                <input type={passwordtyperegister} required 
                  placeholder="Enter Your Password" 
                  className='register-password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value); 
                  }}
                />
                <img src={passwordiconregister} alt="" className='password-image-register' onClick={handleToggleRegister}/>
              </div>

              <div className='checkbox-wrapper-register' style={{display: "flex"}}>
                <input type="checkbox" className="register-checkbox"/>
                <p className='checkbox-text'>Remember Me!</p>
              </div>
              <button className='register-submit-button' onClick={handleSubmitRegister}>Sign up</button>
              <p className='signin-footer'>Already have an account? <Link to={"/login"}>Signin here</Link></p>
          </div>
        </div>
      </div>
  )
}

export default Register;