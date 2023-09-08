import React, { useState } from "react";
import "./Perfil.css";
import Aside from "../../components/Aside/Aside";
import trash from "../../assets/images/icon/material_symbols_delete_outline.png";
import { Link } from "react-router-dom";
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
const Perfil = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="home perfil">
      <Aside />
      <div className="container">
        <h2 className="text-center">Perfil</h2>

        <div className="login-page">
          <form className="container login-page-box editar-perfil">
            <div className="row">
              <div className="col-md-12">
                <label className="mt-5">Nome</label>
                <input
                  className="form-control form-control-lg mt-3"
                  type="text"
                  name="email"
                  value="Nicholas"
                />
                <label className="mt-4">Email</label>
                <input
                  className="form-control form-control-lg mt-3"
                  type="email"
                  value="Nicholas@gmail.com"
                />
                <label className="mt-3">
                <div>Privacidade</div>
                <select name="privacidade">
                  <option value="Privado">Privado</option>
                  <option value="Privado">Público</option>
                </select>
                </label>
                <button type="submit" className="btn btn-entrar mt-4">
                  Salvar
                </button>
                <div className="text-center mt-4 ou-border-register">
                <div></div>
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          className="mb-3"
        >
          <Box sx={{ ...style, ...responsiveStyle, width: 400, paddingBottom: 7 }}>
            <h3 id="parent-modal-title" className="pt-4">Deseja excluir sua conta?</h3>
            <label className='mt-5'>Digite sua senha</label>
                <input className="form-control form-control-lg mt-3" type="password" name="email" placeholder="Senha" />
                <label className='mt-4'>Confirme sua senha</label>
                <input className="form-control form-control-lg mt-3" type="password" placeholder="Senha" />
                <button type="submit" className="btn btn-excluir mt-4 bg-danger text-white w-100">Excluir</button>
          </Box>
        </Modal>
      </div>
      <Button onClick={handleOpen} className="text-red mt-auto d-flex align-items-center me-5 mb-5"><img className="me-2" src={trash}/>Excluir conta</Button>
    </div>
  );
};

export default Perfil;
