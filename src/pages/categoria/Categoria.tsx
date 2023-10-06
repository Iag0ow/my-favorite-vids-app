import "./Categoria.css";
import React, { useState, useEffect } from "react";
import Aside from "../../components/Aside/Aside";
import { Link } from "react-router-dom";
import { getUser,updateUser,deleteUser,logOut} from "../../utils/config";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  color: 'white',
  backgroundColor: 'black',
  transform: 'translate(-50%, -50%)',
  width: 695,
  border: '2px solid #ffffff47',
  boxShadow: 24,
  borderRadius: 10,
  pt: 2,
  px: 4,
  pb: 3,
};
const responsiveStyle = {
  '@media (max-width: 998px)': {
    width: 351,
  },
}
const Categoria = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [privy, setPrivy] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageDelete, setMessageDelete] = useState(false);

  const [errorPassword, setErrorPassword] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const user = await getUser();
      setUsername(user.username);
      setEmail(user.email);
      setPrivy(user.privy);
    }
    fetchData();
  }, []);


  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const obj = {
      username,
      email,
      privy
    }
    const result = await updateUser(obj);
    setLoading(false);
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 3000);
  }
  const handleExclude = async () => {

    setLoading(true);
    if (password !== confirmPassword) {
      setMessageDelete(true);
      setTimeout(() => {
        setMessageDelete(false);
        setLoading(false);
      }, 3000);
      return;
    }

    const obj = {
      password
    }
    const result = await deleteUser(obj);
    if (result.hasOwnProperty("error")) {
      setErrorPassword(result.error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    logOut();
    window.location.reload();
  }
  return (
    <div className="home perfil">
      <Aside />
      <div className="container">
        <h2 className="text-center">Categoria</h2>

        <div className="login-page">
          <form className="container login-page-box editar-perfil" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <Link to="/criar/categoria" type="submit" className={`btn btn-entrar mt-4 ${loading ? 'disabled-link' : ''}`}>{loading ? 'Carregando...' : 'Criar categoria' }</Link>
                  <div className="text-center mt-4 ou-border-categoria">
                  <div></div>
              </div>
                <Link to="/editar/categoria" type="submit" className={`btn btn-entrar mt-4 ${loading ? 'disabled-link' : ''}`}>{loading ? 'Carregando...' : 'Editar categoria' }</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categoria;
