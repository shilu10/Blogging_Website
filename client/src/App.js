import Home from './Pages/home/Home';
import WritePage from './Pages/write_page/WritePage';
import Settings from './Pages/settings/Settings';
import Login from './Pages/login/Login';
import SinglePage from './Pages/single_page/SinglePage';
import About from './Pages/about/About';
import Contact from './Pages/contact/Contact';
import Logout from './Pages/logout/Logout';
import Register from './Pages/register/Register';
import { useSelector } from 'react-redux';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const backgroundColor = useSelector((state) => state.colorReducer.color)
  
  useEffect(()=>{
    gapi.load('client:auth2', () => {
      gapi.client.init({
        client_id: '418020920930-a54a5d5a26c9guqk0eh4cucrqd057gda.apps.googleusercontent.com',
        scope: ""
      });})
    
  });
  
  return (
    <div className="App" style={{height: "100%"}}>  
      
        <BrowserRouter>
            <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='/write' element={<WritePage />} />
              <Route path='/login' element={<Login /> } />
              <Route path='/settings' element={<Settings />} />
              <Route path='/post/:slug' element={<SinglePage />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/register' element={<Register />} />
              <Route path='/logout' element={<Logout />} />
            </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
