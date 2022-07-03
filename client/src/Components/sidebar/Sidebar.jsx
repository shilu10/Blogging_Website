import './sidebar.css';

export default function Sidebar() {
  return (
    
        <div className='sidebar'>
          <div className="sidebar-container" style={{borderRadius: "10px", height: "320px", width:"320px", backgroundColor:"#3e403e", display: "flex", flexDirection: "column"}}>
            <div className='sidebar-img-wrapper' style={{justifyContent: "center", display: "flex", alignItems: "center", margin: "20px"}}>
              <img 
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
                alt=""
                className="sidebar-img"
                style={{borderRadius: "100%", height: "140px", width: "140px", objectFit: "cover"}}
              />
            </div>
            <div className='sidebar-details'>
              <h className='sidebar-details-authorname'>Shilash M</h>
              <h className='sidebar-details-authorwork'>Work Type</h>

              <div className='sidebar-details-social-items-wrapper'>
                <ul className='sidebar-details-social-items'>
                  <li className='sidebar-details-social-item'>
                    <i class="fa-brands fa-linkedin sidebar-social-icon"></i>
                  </li>
                  <li className='sidebar-details-social-item'>
                    <i class="fa-brands fa-github sidebar-social-icon"></i>
                  </li>
                  <li className='sidebar-details-social-item'>
                    <i class="fa-brands fa-twitter sidebar-social-icon"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>          
          
        </div>
  
  )
}


