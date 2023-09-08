import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className="login-page">
          <h1 className="my-favorite-videos-title">My Favorite<span> Videos</span></h1>
          <form className="container login-page-box">
            <div className="row">
              <div className='col-md-12'>
                <h1>Entrar</h1>
                <label className='mt-5'>Email</label>
                <input className="form-control form-control-lg mt-3" type="text" name="email" placeholder="Seu Email" />
                <label className='mt-4'>Password</label>
                <input className="form-control form-control-lg mt-3" type="password" placeholder="Senha" />
                <button type="submit" className="btn btn-entrar mt-4">Entrar</button>
                <div className="text-center mt-4 mb-4 ou-border">
                    <div></div>
                    <span>ou</span>
                    <div></div>
                </div>
                <Link to={"/register"} className="btn btn-registrar text-center"><span>Registra-se</span></Link>    
              </div>
            </div>
          </form>
    </div>
  )
}

export default Login