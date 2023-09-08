import React from "react";
import { Link } from "react-router-dom";
import './Registrar.css'
const Registrar = () => {
  return (
    <div>
      <div className="login-page">
      <h1 className="my-favorite-videos-title"><Link to="/" className='text-style-none'>My Favorite<span> Videos</span></Link></h1>
        <form className="container login-page-box">
          <div className="row">
            <div className="col-md-12">
              <h1>Registrar-se</h1>
              <label className="mt-5">Email</label>
              <input
                className="form-control form-control-lg mt-3"
                type="text"
                name="email"
                placeholder="Seu Email"
              />
              <label className="mt-4">Password</label>
              <input
                className="form-control form-control-lg mt-3"
                type="password"
                placeholder="Senha"
              />
              <div className="text-center mt-4 ou-border-register">
                <div></div>
              </div>
              <button type="submit" className="btn btn-entrar mt-4 disabled-link">
                <Link to="/registrar" className="registrar-button-link">Registrar</Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrar;
