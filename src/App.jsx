import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  BrowserRouter,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar/Navbar";
import Perfil from "./pages/perfil/Perfil";
import Registrar from "./pages/registrar/Registrar";
import Categoria from "./pages/categoria/Categoria";
import CriarCategoria from "./pages/categoria/subcategoria/CriarCategoria";
import EditarCategoria from "./pages/categoria/subcategoria/EditarCategoria";
import Video from "./pages/videos/Video";

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
        {auth && <Navbar />}
        <Routes>
          <Route
            path="/login"
            element={
              !auth ? (
                <Login handleFunc={handleUpdateAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/perfil"
            element={auth ? <Perfil /> : <Navigate to="/login" />}
          />
          <Route
            path="/categoria"
            element={auth ? <Categoria /> : <Navigate to="/login" />}
          />
          <Route
            path="/registrar"
            element={!auth ? <Registrar /> : <Navigate to="/" />}
          />
          <Route
            path="/editar/categoria"
            element={auth ? <EditarCategoria /> : <Navigate to="/login" />}
          />
          <Route
            path="/criar/categoria"
            element={auth ? <CriarCategoria /> : <Navigate to="/login" />}
          />
          <Route
            path="/videos"
            element={auth ? <Video /> : <Navigate to="/login" />}
          />
          <Route
            path="/:platformParam?"
            element={auth ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
