import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SinglePost from '../../Components/singlePost/SinglePost';
import './singlepage.css';
import Topbar from '../../Components/topbar/Topbar';
import Comments from '../../Components/comments/Comments';
import jwt_decode from "jwt-decode";
import client from '../../Assets/sanityClient';
import RingLoader from 'react-spinners/RingLoader';

export default function SinglePage() {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const [isLoading, setLoading] = useState(true);
  const { slug } = useParams();
  const id = useParams().id;
  const query = `*[slug.current == "${slug}"]{title, _id, slug, mainImage{ asset->{url}, alt},body,"name": author->name,"authorImage": author->image, "createdAt": _createdAt}`;
  const [blog, setBlog] = useState({});
  var access_token = sessionStorage.getItem("accessToken");
  var currentUsername = null;
  var profilePicture = null;
  var email = null;
  var expDate = null;
  var userId = null;
  var isUser = false;

  if(access_token){
    var decoded = jwt_decode(access_token);
    if(decoded._doc){
      decoded = decoded._doc;
    }
    currentUsername = decoded.username;
    profilePicture = decoded.profilePicture;
    email = decoded.email;
    expDate = decoded.exp;
    isUser = true;
};

if(userProfile){
  userId = userProfile.googleId;
  email = userProfile.email;
  currentUsername = userProfile.givenName;
  profilePicture = userProfile.imageUrl;
  isUser = true;
 // dispatch(pictureActions.setProfielPicture(profilePicture));
};

const user = {
  username: currentUsername,
  email: email,
  profilePicture: profilePicture,
  isUser: true
};

  useEffect(() => {
    client.fetch(query)
      .then(data => {
        setBlog(data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
      });
  }, [slug]);
  
  if(access_token){
    decoded = jwt_decode(access_token);
    if(decoded._doc){
      decoded = decoded._doc;
    }
    else{
      decoded = jwt_decode(access_token);
    }
    currentUsername = decoded.username;
    profilePicture = decoded.profilePicture;
  }

  if (isLoading) {
    return (
      <div className="loadingContainer">
        <RingLoader
          color="#5becd2"
          size={100}
        />
    </div>
    )
  }
  else{
    return (
      <div>
        <Topbar profilePicture={profilePicture} isUser={currentUsername?true:false}/>
        <br></br>
        <br></br>
        <div className='single-page-container'>
          <div className='single-page'>
              <SinglePost singleBlog={blog} />
              <div className='single-page-comment-wrapper'>
                <Comments blogName={slug} currentUsername={currentUsername} expDate={expDate} isUser={isUser}/>
              </div>
          </div>
        </div>
      </div>
    )
}};
