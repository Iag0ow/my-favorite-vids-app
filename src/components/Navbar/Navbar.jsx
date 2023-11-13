import React from "react";
import hamburger from "../../assets/images/icon/hamburguer.png";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getPlatforms, getPlatformsDiscover, getPlatformsPublic,logOut } from "../../utils/config";
import { useNavContext } from "../../context/NavBarInfContext";
const Navbar = () => {
  const { navBarData,updateNavOptions, updateNavBarData, updateComponentNav,updateSearch,discover,id } =
    useContext(useNavContext);
  const [platforms, setPlatforms] = useState([]);
  const [platformsDiscover, setPlatformsDiscover] = useState([]);
  const [platformsPublic, setPlatformsPublic] = useState([]);

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

  useEffect(() => {
    if(discover == "perfil-publico"){
      const fetchData = async () => {
        const dataPlatform = await getPlatformsPublic(id);
        setPlatformsPublic(dataPlatform);
      };
  
      fetchData();
    }
  },[updateComponentNav,updateNavOptions])

  const closeHamburguer = ()=> {
    document.getElementById("btn-close-hamburguer").click();
  }
  const handleLogout = () => {
    const result = logOut();
    if(result) {
      window.location.reload();
    }
  }
  return (
    <>
    {discover == "perfil-publico" ? (  <>
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
        {platformsPublic &&
          platformsPublic.map((platform) => (
            <li key={platform}>
              <Link
                to={`/perfil-publico/${platform}/${id}`}
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
          <Link
          className="navbar-brand"
          onClick={() => { closeHamburguer(); }}
          to={`/${navBarData ? navBarData : ""}`}
        >
          My Favorite<span> Videos</span>
        </Link>
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id="btn-close-hamburguer"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav align-items-start flex-grow-1 pe-3">
            <h1>Menu</h1>
            <li className="nav-item">
              <Link onClick={() => {closeHamburguer(); updateNavOptions("")}} to={`/${navBarData ? navBarData : ""}`} className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Plataformas
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
              {platformsPublic &&
          platformsPublic.map((platform) => (
            <li key={platform}>
              <Link
                onClick={() => {closeHamburguer(); handlePlataformaClick(platform);}}
                to={`/perfil-publico/${platform}/${id}`}
                className={`dropdown-item`}
              >
                {platform}
              </Link>
            </li>
          ))}
              </ul>
            </li>
            <li className="nav-item">
              <NavLink onClick={() => { closeHamburguer(); updateNavOptions('descobrir'); }} to={'/descobrir'} className="nav-link">
                Descobrir
              </NavLink>
            </li>
            <li className="nav-item">
              <Link onClick={() => { closeHamburguer(); }} to="/videos" className="nav-link">
                Videos
              </Link>
            </li>
            <h1>Geral</h1>
            <li className="nav-item">
              <Link onClick={() => { closeHamburguer(); }} to="/perfil" className="nav-link">
                Perfil
              </Link>
            </li>
            <li onClick={handleLogout} className="nav-item">
              <a href="#" className="nav-link">
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
  </>) :(

discover !== "descobrir" ? (
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
        {platformsDiscover &&
          platformsDiscover.map((platform) => (
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
          <Link
          className="navbar-brand"
          onClick={() => { closeHamburguer(); }}
          to={`/${navBarData ? navBarData : ""}`}
        >
          My Favorite<span> Videos</span>
        </Link>
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id="btn-close-hamburguer"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav align-items-start flex-grow-1 pe-3">
            <h1>Menu</h1>
            <li className="nav-item">
              <Link onClick={() => {closeHamburguer(); updateNavOptions("")}} to={`/${navBarData ? navBarData : ""}`} className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Plataformas
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
              {platformsDiscover &&
                platformsDiscover.map((platform) => (
                  <li key={platform}>
                    <Link
                      to={`/${platform}`}
                      className={`dropdown-item`}
                      onClick={() => {closeHamburguer(); handlePlataformaClick(platform)}}
                    >
                      {platform}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <NavLink onClick={() => { closeHamburguer(); updateNavOptions('descobrir'); }} to={'/descobrir'} className="nav-link">
                Descobrir
              </NavLink>
            </li>
            <li className="nav-item">
              <Link onClick={() => { closeHamburguer(); }} to="/videos" className="nav-link">
                Videos
              </Link>
            </li>
            <h1>Geral</h1>
            <li className="nav-item">
              <Link onClick={() => { closeHamburguer(); }} to="/perfil" className="nav-link">
                Perfil
              </Link>
            </li>
            <li onClick={handleLogout} className="nav-item">
              <a href="#" className="nav-link">
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
            <Link className="navbar-brand"
              onClick={() => { closeHamburguer(); }}
              to={`/${navBarData ? navBarData : ""}`}>
              My Favorite<span> Videos</span>
            </Link>
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id="btn-close-hamburguer"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav align-items-start flex-grow-1 pe-3">
            <h1>Menu</h1>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                onClick={() => {closeHamburguer(); updateNavOptions("")}} 
                to={`/${navBarData ? navBarData : ""}`}
              >
                Home
              </Link>
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
              {platforms &&
                platforms.map((platform) => (
            <li key={platform}>
              <Link
                to={`/descobrir/${platform}`}
                className={`dropdown-item`}
                onClick={() => {handlePlataformaClick(platform); closeHamburguer()}}
              >
                {platform}
              </Link>
            </li>
          ))}
              </ul>
            </li>
            <li className="nav-item">
              <NavLink onClick={() => { closeHamburguer(); updateNavOptions('descobrir'); }} to={'/descobrir'} className="nav-link">
                Descobrir
              </NavLink>
            </li>
            <li className="nav-item">
              <Link onClick={() => { closeHamburguer(); }} to="/videos" className="nav-link">
                Videos
              </Link>
            </li>
            <h1>Geral</h1>
            <li className="nav-item">
              <Link onClick={() => { closeHamburguer(); }} to="/perfil" className="nav-link">
                Perfil
              </Link>
            </li>
            <li onClick={handleLogout} className="nav-item">
              <a href="#" className="nav-link">
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
)


    ) }

    </>
  );
};

export default Navbar;
