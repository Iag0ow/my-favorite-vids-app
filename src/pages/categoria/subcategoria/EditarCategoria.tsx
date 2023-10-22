import React, { useState, useEffect } from "react";
import "../Categoria.css";
import Aside from "../../../components/Aside/Aside";
import trash from "../../../assets/images/icon/material_symbols_delete_outline.png";
import { Link } from "react-router-dom";
import { getUser, updateUser, deleteUser, logOut } from "../../../utils/config";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  color: "white",
  backgroundColor: "black",
  transform: "translate(-50%, -50%)",
  width: 695,
  border: "2px solid #ffffff47",
  boxShadow: 24,
  borderRadius: 10,
  pt: 2,
  px: 4,
  pb: 3,
};
const responsiveStyle = {
  "@media (max-width: 998px)": {
    width: 351,
  },
};
const EditarCategoria = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [privy, setPrivy] = useState("");
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
      privy,
    };
    const result = await updateUser(obj);
    setLoading(false);
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 3000);
  };
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
      password,
    };
    const result = await deleteUser(obj);
    if (result.hasOwnProperty("error")) {
      setErrorPassword(result.error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    logOut();
    window.location.reload();
  };
  return (
    <div className="home perfil">
      <Aside />
      <div className="container">
        <h2 className="text-center">Editar categoria</h2>

        <div className="login-page">
          <form
            className="container edit-page-box editar-perfil"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <div className="col-md-12">
                {message && (
                  <h3 className="text-success">Atualizado com sucesso!</h3>
                )}
                <label className="mt-3">Categoria</label>
                <select
                  className="form-control form-control-lg mt-3 select-black"
                  name="privacidade"
                >
                  <option disabled value="" selected>
                    Selecione uma categoria
                  </option>
                  <option className="text-white" value="true">
                    Videos Engraçados
                  </option>
                  <option className="text-white" value="true">
                    Clipes de terror
                  </option>
                  <option className="text-white" value="true">
                    Memes
                  </option>
                  <option className="text-white" value="false">
                    Videos Famosos
                  </option>
                </select>
                <label className="mt-4">Nome da categoria</label>
                <input
                  className="form-control form-control-lg mt-3 text-white"
                  type="text"
                  placeholder="Nome da categoria"
                />
                <label className="mt-3">
                  <div>Privacidade</div>
                  <select
                    className="privacy-select"
                    name="privacidade"
                    value={privy}
                    onChange={(e) => setPrivy(e.target.value)}
                  >
                    <option value="true">Privado</option>
                    <option value="false">Público</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className={`btn btn-entrar mt-4 ${
                    loading ? "disabled-link" : ""
                  }`}
                >
                  {loading ? "Carregando..." : "Salvar"}
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
          <Box
            sx={{ ...style, ...responsiveStyle, width: 400, paddingBottom: 7 }}
          >
            <h3 id="parent-modal-title" className="pt-4">
              Deseja excluir sua conta?
            </h3>
            {errorPassword.length > 0 &&
              errorPassword.map((item, i) => (
                <h5
                  key={i}
                  className="text-success text-danger mt-3 text-center"
                >
                  {item}
                </h5>
              ))}
            {messageDelete && (
              <h5 className="text-success text-danger mt-3">
                As senhas estão divergentes
              </h5>
            )}
            <label className="mt-4">Digite sua senha</label>
            <input
              className="form-control form-control-lg mt-3"
              type="password"
              name="password-recover"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="mt-4">Confirme sua senha</label>
            <input
              className="form-control form-control-lg mt-3"
              type="password"
              name="confirm-password"
              placeholder="Senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className={`btn btn-excluir mt-4 bg-danger text-white w-100 ${
                loading ? "disabled-link" : ""
              }`}
              onClick={handleExclude}
            >
              {loading ? "Excluindo..." : "Excluir"}
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default EditarCategoria;
