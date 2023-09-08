import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  BrowserRouter,
  Routes,
  useLocation
} from "react-router-dom";
import './App.css'
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Navbar from './components/Navbar/Navbar';
import Perfil from './pages/perfil/Perfil';
import Registrar from './pages/registrar/Registrar';

function App() {
  const user = localStorage.getItem("token");
  const [auth, setAuth] = useState(false);
  const handleUpdateAuth = (value) => {
    setAuth(value);
  };
  useEffect(() => {
    if (user) {
      setAuth(true);
    }
  }, []);
  return (
    <div>
      <BrowserRouter>
        {auth ? <Navbar/> : <Navigate to="/login" />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
