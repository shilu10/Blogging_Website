import "./topbar.css"
import {Link} from 'react-router-dom';
import { colorActions } from "../store/store";

export default function Topbar({ isUser, profilePicture }) {
 // const profilePicture = useSelector(state=>state.pictureReducer.profilePicture);
 // console.log(profilePicture, "topbar");
  return (
    <div className="topbar">
        <div className="top-left">
          <div className="topbar-logo">
            <i style={{fontSize:"32px"}} class="fa fa-cube"></i>
          </div>  
          <div className="topbar-list-item-wrapper">        
            <ul className="top-list">
              <li className="toplist-item" >
                <div className="li-box">
                  <Link className="link" to={"/"}>Home</Link> 
                </div>
              </li>
              <li className="toplist-item">
                <div className="li-box">
                  <Link className="link" to={"/about"} >
                  About
                  </Link>
                </div>
              </li>
              <li className="toplist-item">
                <div className="li-box-contact">
                  <Link className="link" to={"/contact"}>
                    Contact
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <a href="#" className="topbar-hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </a>
        <div className="top-right">
          <ul>
            <li className="toplist-item">
              <div className="li-box">
                {isUser ? <Link className="link" to={"/logout"}>Logout</Link> : 
                  <Link className="link" to={"/login"}>
                    Login
                  </Link> 
                }
              </div>
            </li>
          </ul>
          <Link className="link" to="settings">
            {profilePicture ? <img className="topbar-img"
              src={profilePicture}
              onClick={e=>{colorActions.setColor("#dad6fc")
                          console.log("setting page")
            }}
              alt=""
            /> :
            <img className="topbar-img"
              src="data:image/png;base64,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"
              alt=""
            /> 
            }
          </Link>
            
        </div>
    </div>
  )
}
