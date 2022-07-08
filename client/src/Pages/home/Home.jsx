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
import ReactPaginate from 'react-paginate';
import RingLoader from "react-spinners/RingLoader";

const Home = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  var profilePicture = useSelector(state=>state.pictureReducer.profilePicture);
  const access_token = sessionStorage.getItem("accessToken");
  const currentLogin = useSelector(state=>state.loginReducer.currentLogin);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const query = '*[_type == "post"]{title, slug, body, mainImage{asset ->{url}, alt}, "authorName": author->name, "authorImage": author->image, "categories": categories[]->title, "createdAt": _createdAt}';
  const postPerPage = 10;
  const postVisited = pageNumber * postPerPage;
  const [isFetching, setIsFetching] = useState(true);
  var userId = null;
  var username = null;
  var email = null;
  var expDate = null;

  console.log(isFetching)
  const onFilterClick = (e) => {
    setSearchValue(e.currentTarget.id)
  };

  const sortByDate = arr => {
    const sorter = (a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return arr.sort(sorter);
  };

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
      console.log(response, response.data.image)
      if(response.data.image.data){
        const url = `data:image/png;base64,${toBase64(response.data.image.data.data)}`;
        sessionStorage.setItem("profilePicture", url);
        dispatch(pictureActions.setProfielPicture(url));
      }
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
        
        setPosts(sortByDate(data));
        setIsFetching(false)
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
      };
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
  
  const displayPosts = posts
    .filter(post => post.categories.toString().includes(searchValue) || post.title.includes(searchValue))
    .slice(postVisited, postVisited + postPerPage)
    .map(post => (
      <Post key={ post.title } blogpost = {post} />
    ));
  
  const pageCount = Math.ceil(posts.length / postPerPage);
  
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected)
  };

  if(isFetching){
   return (
    <div className="loadingContainer">
      <RingLoader
        color="#5becd2"
        size={100}
      />
    </div>
   )
  }
  return (
        <div className='body-container'>
          <Topbar isUser={username?true:false} profilePicture={profilePicture}/>
          <div className='search'>
            <div className='top-wrapper' style={{display: "flex", alignItems:"center"}}>
              <h2 className="website-title" style={{fontWeight: "bolder", marginRight:" 5px", color: "#1F2937", fontSize: "2.6rem",position: "relative", top: "5%", marginTop: "12px"}}>ClassLine Blog's</h2>
              <img style={{height: "50px", width: "50px", objectFit:"cover"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ55nYpKkeJIgNSRPl0DKhHCTRioYXIk-rAjQ&usqp=CAU" />
             
            </div>
            
             <p className="author-desc">You can find blog's on topics ML,DL,NLP,RL,Web developement,Cloud,Devops</p>
            <div className='search-wrapper'style={{marginLeft: "5px"}}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" class="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g fill="#616161"><rect x="34.6" y="28.1" transform="matrix(.707 -.707 .707 .707 -15.154 36.586)" width="4" height="17"></rect><circle cx="20" cy="20" r="16"></circle></g><rect x="36.2" y="32.1" transform="matrix(.707 -.707 .707 .707 -15.839 38.239)" fill="#37474F" width="4" height="12.3"></rect><circle fill="#64B5F6" cx="20" cy="20" r="13"></circle><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1 C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path></svg>
              <input style={{marginLeft:"5px"}} placeholder="search for posts" className="home-search" type="search" onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} />
            </div>
            <div className='filter-button-wrapper'>
                <button onClick={onFilterClick} id="aws" className='filter-button'>Aws</button>
                <button onClick={onFilterClick} id="ml"  className='filter-button'>ML</button>
                <button onClick={onFilterClick} id="dl" className='filter-button'>DL</button>
                <button onClick={onFilterClick} id="nlp" className='filter-button'>NLP</button>
                <button onClick={onFilterClick} id="python" className='filter-button'>Python</button>
                <button onClick={onFilterClick} id="react" className='filter-button'>React</button>
            </div>
          </div>
          <Toaster />
          <Header title="Simple Blogging Website" />
          <div className="home">
            <div className='posts-wrapper'>
              <Posts>
                {displayPosts.length>0 ? displayPosts : <p className='no-post'>Sorry!! There is no posts </p>}
              </Posts>
              <Sidebar />
            </div>
            <ReactPaginate 
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"previousButton"}
              nextLinkClassName={"nextButton"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
        )};

export default Home;