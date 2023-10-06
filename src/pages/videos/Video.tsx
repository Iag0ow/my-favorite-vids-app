import React, { useState, useEffect } from "react";
import "./Video.css";
import Aside from "../../components/Aside/Aside";
import { Link } from "react-router-dom";
import { createVideo,deleteUser,logOut} from "../../utils/config";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  color: 'white',
  backgroundColor: 'black',
  transform: 'translate(-50%, -50%)',
  width: 1080,
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
const Video = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [privy, setPrivy] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageDelete, setMessageDelete] = useState(false);

  const [errorPassword, setErrorPassword] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const user = await getUser();
//       setTitle(user.username);
//       setDescription(user.email);
//       setPrivy(user.privy);
//     }
//     fetchData();
//   }, []);


  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    const user_id = localStorage.getItem("user_id");
    e.preventDefault();
    setLoading(true);
    const obj = {
        user_id,
        title,
        description,
        url,
        privy
    }
    if(url.includes("youtube")){
        obj.url = url.replace("/shorts/", "/embed/");
    }
    const result = await createVideo(obj);
    console.log(result);
    if (result.hasOwnProperty("error")) {
      setErrorPassword(result.error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
      setTitle('');
      setDescription('');
      setUrl('');
      setPrivy('');
    }, 2000);
  }
//   const handleExclude = async () => {

//     setLoading(true);

//     const obj = {
//       password
//     }
//     const result = await deleteUser(obj);
//     if (result.hasOwnProperty("error")) {
//       setErrorPassword(result.error.message);
//       setLoading(false);
//       return;
//     }
//     setLoading(false);
//     logOut();
//     window.location.reload();
//   }
  return (
    <div className="home perfil">
      <Aside />
      <div className="container">
        <h2 className="text-center">Cadastrar Video</h2>

        <div className="login-page">
          <form className="container login-page-box editar-video" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                { message && <h3 className="text-success">Atualizado com sucesso!</h3> }
                <label className="mt-2">Título</label>
                <input
                  className="form-control form-control-lg mt-3"
                  type="text"
                  name="email"
                  value={title}
                  placeholder="Nome do Video"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className="mt-4">Descrição</label>
                <textarea
                  className="form-control form-control-lg mt-3 videos-page-box"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrição do Video"
                />
                <label className="mt-3">Url</label>
                <input
                  className="form-control form-control-lg mt-3"
                  type="text"
                  name="email"
                  placeholder="Url do Video"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <label className="mt-3">
                <div>Privacidade</div>
                <select className="privacy-select" name="privacidade" value={privy} onChange={(e) => setPrivy(e.target.value)}>
                  <option value="true">Privado</option>
                  <option value="false">Público</option>
                </select>
                </label>
                <button type="submit" className={`btn btn-entrar mt-4 ${loading ? 'disabled-link' : ''}`}>{loading ? 'Carregando...' : 'Cadastrar' }</button>
                <div className="text-center mt-4 ou-border-register">
                <div></div>
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          className="mb-3"
        >
          <Box sx={{ ...style, ...responsiveStyle, width: 1080, paddingBottom: 7 }}>
            <h3 id="parent-modal-title" className="pt-4">Deseja excluir sua conta?</h3>
            {errorPassword.length > 0 && errorPassword.map((item, i) => <h5 key={i} className="text-success text-danger mt-3 text-center">{item}</h5>)}
            {messageDelete && <h5 className="text-success text-danger mt-3">As senhas estão divergentes</h5>}
            <label className='mt-4'>Digite sua senha</label>
            <input className="form-control form-control-lg mt-3" type="password" name="password-recover" placeholder="Senha" onChange={(e)=> setPassword(e.target.value)} />
            <label className='mt-4'>Confirme sua senha</label>
            <input className="form-control form-control-lg mt-3" type="password" name="confirm-password" placeholder="Senha" onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className={`btn btn-excluir mt-4 bg-danger text-white w-100 ${loading ? 'disabled-link' : ''}`} onClick={handleExclude}>{loading ? 'Excluindo...' : 'Excluir' }</button>
          </Box>
        </Modal> */}
      </div>
    </div>
  );
};

export default Video;
