import React from "react";
import hamburger from "../../assets/images/icon/hamburguer.png";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getPlatforms, getPlatformsDiscover } from "../../utils/config";
import { useNavContext } from "../../context/NavBarInfContext";
const Navbar = () => {
  const { navBarData, updateNavBarData, updateComponentNav,updateSearch,discover } =
    useContext(useNavContext);
  const [platforms, setPlatforms] = useState([]);
  const [platformsDiscover, setPlatformsDiscover] = useState([]);
  const [plataformaAtiva, setPlataformaAtiva] = useState(null);
  // const [discover, setDiscover] = useState("");
  const handlePlataformaClick = (plataforma) => {
    updateNavBarData(plataforma);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataPlatform = await getPlatforms();
      setPlatforms(dataPlatform);
    };

    fetchData();
  }, [updateComponentNav]);

  useEffect(() => {
    const fetchData = async () => {
      const dataPlatform = await getPlatformsDiscover();
      setPlatformsDiscover(dataPlatform);
    };

    fetchData();
  }, [updateComponentNav]);


  // useEffect(() => {
  //   const currentUrl = window.location.href;
  //   const url = currentUrl.includes("descobrir") ? "descobrir" : "";
  //   setDiscover(url);    
  // },[plataformaAtiva, updateComponentNav, updateNavBarData]);
  return (
    <>
      {discover !== "descobrir" ? (
        <>
          <nav className="mb-5">
            <h5 className="my-favorite-videos-title">
              <Link
                className="navbar-brand"
                to={`/${navBarData ? navBarData : ""}`}
              >
                My Favorite<span> Videos</span>
              </Link>
            </h5>
            <ul>
              {platforms &&
                platforms.map((platform) => (
                  <li key={platform}>
                    <Link
                      to={`/${platform}`}
                      className={`nav-link-uppercase ${
                        platform == navBarData ? "active-platform" : ""
                      }`}
                      onClick={() => handlePlataformaClick(platform)}
                    >
                      {platform}
                    </Link>
                  </li>
                ))}
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
              <input onChange={(e) => updateSearch(e.target.value)} type="text" placeholder="Pesquisar"></input>
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
                    <input
                      type="text"
                      name="search"
                      placeholder="Pesquisar"
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="mb-5">
            <h5 className="my-favorite-videos-title">
              <Link
                className="navbar-brand"
                to={`/${navBarData ? navBarData : ""}`}
              >
                My Favorite<span> Videos</span>
              </Link>
            </h5>
            <ul>
              {platforms &&
                platforms.map((platform) => (
                  <li key={platform}>
                    <Link
                      to={`/descobrir/${platform}`}
                      className={`nav-link-uppercase ${
                        platform == navBarData ? "active-platform" : ""
                      }`}
                      onClick={() => handlePlataformaClick(platform)}
                    >
                      {platform}
                    </Link>
                  </li>
                ))}
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
              <input onChange={(e) => updateSearch(e.target.value)} type="text" placeholder="Pesquisar"></input>
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
                    <input
                      type="text"
                      name="search"
                      placeholder="Pesquisar"
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
