import './home.css';
import Sidebar from '../../Components/sidebar/Sidebar';
import Header from '../../Components/header/Header'
import Posts from '../../Components/posts/Posts';
import Post from '../../Components/post/Post';
import Topbar from '../../Components/topbar/Topbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast,{ Toaster } from 'react-hot-toast';
import client from '../../Assets/sanityClient';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions, userActions, pictureActions } from '../../Components/store/store';
import jwt_decode from 'jwt-decode';

const Home = () => {

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  var profilePicture = useSelector(state=>state.pictureReducer.profilePicture);
  const access_token = sessionStorage.getItem("accessToken");
  const currentLogin = useSelector(state=>state.loginReducer.currentLogin);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const query = '*[_type == "post"]{title, slug, body, mainImage{asset ->{url}, alt}, "authorName": author->name, "authorImage": author->image, "categories": categories[]->title, "createdAt": _createdAt}';
  
  var userId = null;
  var username = null;
  var email = null;
  var expDate = null;

  if(access_token){
    var decoded = jwt_decode(access_token);
    if(decoded._doc){
      decoded = decoded._doc;
    }
    username = decoded.username;
  //  profilePicture = decoded.profilePicture;
    userId = decoded._id;
    email = decoded.email;
    expDate = decoded.exp;
}

  if(userProfile){
    userId = userProfile.googleId;
    email = userProfile.email;
    username = userProfile.givenName;
    profilePicture = userProfile.imageUrl;
    dispatch(pictureActions.setProfielPicture(profilePicture));
  }

const fetchProfile = async() => {
  if(access_token){
    try{
        const response = await axios.get(`http://localhost:8000/upload/images/${userId}`);
        // this function used for converting an array buffer into base64.. ( very important function)
        function toBase64(arr) {
          arr = new Uint8Array(arr) 
          return btoa(
            arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
      } ;
        const url = `data:image/png;base64,${toBase64(response.data.image.data.data)}`;
      
        sessionStorage.setItem("profilePicture", url);
        dispatch(pictureActions.setProfielPicture(url));
      }
    catch(err){
      console.log(err);
    }}};
    
  if(username){
    fetchProfile();
  }
  useEffect(()=>{
    client.fetch(query)
      .then(data => {
        setPosts(data);
       
      })
      .catch(err => {
        console.log(err)
      });
    
    if(Date.now()>expDate*1000 && access_token){

      const fetchAccessToken = async() => {
          try{
            // Because access token is saved inmemory when user closes the tab it will be deleted.
            // so we are checking whether he has a refresh token which is valid, if then we know, user
            // should haved loggedin so we are generatinga new access token with some logic in the 
            // backend.
            const response = await axios.get('http://localhost:8000/api/auth/refresh_token', {
            withCredentials: true 
            });
            
            sessionStorage.setItem("accessToken", response.data.access_token)
            dispatch(loginActions.setAccessToken(response.data.access_token));
          }
          catch(err){
        console.log();
      }}
      fetchAccessToken();};
     
      if(currentLogin){
        toast.success("You are Successfully Login!!!", {
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined, 
      }); }
      if(currentLogin){
        dispatch(loginActions.setCurrentLogin());
      }
     
  }, []);

  useEffect(()=>{
    const user = {
      username: username,
      email: email,
      profilePicture: profilePicture,
      isUser: true
    };
    userActions.setUser(user);
  }, []);
  
  return (
        <div className='body-container'>
            <Topbar isUser={username?true:false} profilePicture={profilePicture}/>
            <Toaster />
            <Header title="Simple Blogging Website" />
            <div className="home">
              {posts ? 
              <>
                <Posts>
                  {posts.map((post) => (
                      <Post key={ post.title } blogpost = {post} />
                  ))}
                </Posts>
                <Sidebar />
              </>
              : <p>No blogpost</p>}
            </div>
        </div>
  )};

export default Home;