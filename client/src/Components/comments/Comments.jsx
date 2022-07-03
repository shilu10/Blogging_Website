import { useState, useEffect,  } from 'react';
import './comments.css';
import axios from 'axios';
import Comment from '../comment/Comment';
import CommentForm from '../comment/commentform';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions, userActions } from '../../Components/store/store';
import jwt_decode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
var access_token = sessionStorage.getItem("accessToken");
// we need a whle comment to get the last comment id value, so we can use it for new comments
// blogcomments - holds the current blog's all comments., backendcomments holds all the post commands
export default function Comments({ blogName, currentUsername, isUser, expDate }){
 
  const [backendComments, setBackendComments] = useState([]);
  const [blogComments, setBlogComments]  = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const dispatch = useDispatch();
  const axiosInt = axios.create();
  console.log(blogName);
  
  
  const fetchComment = async() =>{
    try{
      const response = await axios.get("http://localhost:8000/api/comments");
      setBackendComments(response.data);
      }
      catch(err){
        console.log(err);
    }};   


  const rootComments = blogComments.filter(comment => (
      comment.parentId === null 
    ));
    
    // all the comments
    useEffect(()=>{
      const currDate = Date.now();
      console.log("access", currDate>expDate*1000, currDate, expDate)
      if(access_token && (currDate>expDate*1000)){
        const fetchAccessToken = async() => {
            try{
              // Because access token is saved inmemory when user closes the tab it will be deleted.
              // so we are checking whether he has a refresh token which is valid, if then we know, user
              // should haved loggedin so we are generatinga new access token with some logic in the 
              // backend.
              const response = await axios.get('http://localhost:8000/api/auth/refresh_token', {
              withCredentials: true 
              });
              sessionStorage.setItem("accessToken", response.data.access_token);
            }
            catch(err){
          console.log(err, "while getting");
        }}
        fetchAccessToken();
        
      }  
  }, []);
  
  // for specific blog comments
  useEffect(()=>{
    try{
        const fetchComment = async () =>{
            const response = await axios.get(`http://localhost:8000/api/comments/${blogName}`);
            setBlogComments(response.data);
            }
            fetchComment();
        }   
    catch(err){
        console.log(err);
    }
}, []);
    
  const getReplies = (commentId) =>
       backendComments.filter((backendComment) => backendComment.parentId == commentId)

  axiosInt.interceptors.response.use(async(config) =>{
    console.log("interceptor")
          const currDate = Date.now();
          if(currDate > expDate*1000){
            console.log("axiosItn", currDate>expDate*1000)
            const response = await axios.get('http://localhost:8000/api/auth/refresh_token', {
                  withCredentials: true 
                  });
                  expDate = jwt_decode(response).exp;
                  sessionStorage.setItem("accessToken", response.data.access_token)
              }
        
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
      
  const addComment = async (text) => {
    console.log(blogName)
    if(isUser){
      let parentId = activeComment  ? activeComment.id : null;
    // only here we use all the comments, onlyto get the last comment id.
      try{
        console.log("started post comment")
        const response = await axios.post(`http://localhost:8000/api/comments/${blogName}`,
        {
          username: currentUsername,
          body: text,
          parentId: parentId,
        },
        {
          withCredentials: true,
        });
        console.log(response, "from add comments")
        window.location.reload();
        toast.success('Comment Posted successfully, Refresh the page to view the comment',
                  {
                    icon: '👏',
                    style: {
                      borderRadius: '10px',
                      background: '#333',
                      color: '#fff',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }}); 
                   
                  }
                    
      catch(err){
        console.log(err)
      }
        setActiveComment(null);
      }};
  
  const updateComment = async (text, commentId) => {
    try{
      const response = await axios.put(`http://localhost:8000/api/comments/${commentId}`,
      {
        body: text,
        accessToken: access_token,
      },
      {
        withCredentials: true,
      },
      );
      window.location.reload();
      toast.success('Comment Updated successfully, Refresh the page to view the comment',
      {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }}); }

    catch(err){
      console.log(err);
    }
      setActiveComment(null);
    }

  const deleteComment = (commentId) => {
      if (window.confirm("Are you sure you want to remove comment?")) {
        try{
          const response = axios.delete(`http://localhost:8000/api/comments//${commentId}`, {withCredentials: true});
          toast.success('Comment deleted successfully, Refresh the page to view the comment',
            {
              icon: '👏',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }});
          window.location.reload();

        }
        catch(err){
          window.alert("Error deleting comment");
        }
      }
    };

    useEffect(()=>{
      fetchComment();
    }, [])

    return (
      <div className='comments-container'>
        <Toaster />
        <div className="comments">
          <h3 className="comments-title">Comments</h3>
          <div className="comment-form-title">Write comment</div>
          <CommentForm submitLabel="Write" handleSubmit={addComment} isUser={isUser}/>
            <div className="comments-container">
              {rootComments.map((rootComment) => (
                <Comment
                  key={rootComment.id}
                  comment={rootComment}
                  replies={getReplies(rootComment.id)}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  addComment={addComment}
                  deleteComment={deleteComment}
                  updateComment={updateComment}
                  currentUsername={currentUsername}
                  getRepliesFunc={getReplies}
                  isUser={isUser}
                />
              ))}
            </div>
        </div>
    </div>
)}
