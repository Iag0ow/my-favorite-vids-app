import React from "react";
import hamburger from "../../assets/images/icon/hamburguer.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="mb-5">
      <h5 className="my-favorite-videos-title">
        <Link className="navbar-brand" to="/">My Favorite<span> Videos</span></Link>
      </h5>
      <ul>
        <li>
          <a href="#">Geral</a>
        </li>
        <li>
          <a href="#">YouTube</a>
        </li>
        <li>
          <a href="#">TikTok</a>
        </li>
      </ul>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasDarkNavbar"
        aria-controls="offcanvasDarkNavbar"
        aria-label="Toggle navigation"
      >
        <img src={hamburger} className='class="navbar-toggler-icon"' />
      </button>
      <div className="search ms-auto me-5 pe-5 d-none d-lg-block">
        <input type="text" placeholder="Pesquisar"></input>
      </div>
      {/* Opções do menu hamburger */}
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="my-favorite-videos-title">
            My Favorite<span> Videos</span>
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav align-items-start flex-grow-1 pe-3">
            <h1>Menu</h1>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorias
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <a className="dropdown-item" href="#">
                    Geral
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    YouTube
                  </a>
                </li>
                {/* <li>
                        <hr className="dropdown-divider" />
                      </li> */}
                <li>
                  <a className="dropdown-item" href="#">
                    TikTok
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Comunidade
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Descobrir
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Videos
              </a>
            </li>
            <h1>Geral</h1>
            <li className="nav-item">
              <a className="nav-link" href="#">
              Perfil
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
              Sair  
              </a>
            </li>
          </ul>
          <form className="d-flex mt-3" role="search">
            <div className="search ms-auto me-5 pe-5">
              <input type="text" placeholder="Pesquisar"></input>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
