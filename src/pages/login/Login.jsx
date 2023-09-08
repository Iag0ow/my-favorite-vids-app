import React from 'react'
import './Login.css'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from "../../utils/config";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credentiais, setCredentiais] = useState(false);

  const [error, setError] = useState('');

  
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password
    }
    const result = await login(loginData);
    if (result.auth == false) {
      setError(result.message)
    } else {
      setCredentiais(true);
    }
    
  }

  return (
    <div className="login-page">
          <h1 className="my-favorite-videos-title">My Favorite<span> Videos</span></h1>
          <form className="container login-page-box" onSubmit={handleLogin}>
            <div className="row">
              <div className='col-md-12'>
                <h1 className='mb-5'>Entrar</h1>
                {error && error.map((e,i) => <p key={i} className='text-danger' >{e}</p>)}
                <label>Email</label>
                <input required className="form-control form-control-lg mt-3" type="email" name="email" placeholder="Seu Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label className='mt-4'>Password</label>
                <input required className="form-control form-control-lg mt-3" type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button type="submit" className="btn btn-entrar mt-4">Entrar</button>
                <div className="text-center mt-4 mb-4 ou-border">
                    <div></div>
                    <span>ou</span>
                    <div></div>
                </div>
                <Link to="/registrar" className="btn btn-registrar text-center"><span>Registra-se</span></Link>    
              </div>
            </div>
      </form>
      {credentiais && <Navigate to="/" />}
    </div>
  )
}

export default Login