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
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const backgroundColor = useSelector((state) => state.colorReducer.color)
  console.log(backgroundColor, "color")
  
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
