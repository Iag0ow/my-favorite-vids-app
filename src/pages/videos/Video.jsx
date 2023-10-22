import React, { useState, useEffect,useContext } from "react";
import "./Video.css";
import Aside from "../../components/Aside/Aside";
import { Link } from "react-router-dom";
import { createVideo,deleteUser,logOut,getAllVideos,deleteVideo} from "../../utils/config";

import trash from "../../assets/images/icon/material_symbols_delete_outline.png";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
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
import { useNavContext } from '../../context/NavBarInfContext';
const Video = () => {


  const {navBarData,updateComponentNav,updateNavPlatform } = useContext(useNavContext);
  const [allVideos, setAllVideos] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('');
  const [url, setUrl] = useState('');
  const [privy, setPrivy] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingCadastrar, setLoadingCadastrar] = useState(false);

  const [message, setMessage] = useState(false);
  const [excludeId, setExcludeId] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageErrorStatus, setMessageErrorStatus] = useState(false);
  const [messageDelete, setMessageDelete] = useState(false);
  const [messageFail, setMessageFail] = useState(false);
  
  
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
    setLoadingCadastrar(true);
    const obj = {
        // user_id,
        title,
        description,
        platform,
        url,
        privy
   }
    // if(url.includes("youtube")){
    //     obj.url = url.replace("/shorts/", "/embed/");
    // }
    const result = await createVideo(obj);
    if (result.hasOwnProperty("error")) {
      setLoadingCadastrar(false);
      setMessageErrorStatus(true);
      setMessageError(result.error.message);
      // setTimeout(() => {
      //   setMessageErrorStatus(false);
      // }, 6000);
      return;
    }
    setMessageErrorStatus(false);
    setLoadingCadastrar(false);
    setMessage(true);
    if(updateComponentNav == true){
      updateNavPlatform(false);
    }else {
      updateNavPlatform(true);
    }
    setTimeout(() => {
      setMessage(false);
      setTitle('');
      setDescription('');
      setPlatform('');
      setUrl('');
      setPrivy('');
    }, 2000);
  }


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const videos = await getAllVideos();
      setAllVideos(videos);
      setLoading(false);
    }
    fetchData();
  }, [messageDelete,message]);
  const handleExclude = async () => {

    setLoading(true);

    const result = await deleteVideo(excludeId);
    if (result.hasOwnProperty("error")) {
      setLoading(false);
      setMessageFail(true);
      setTimeout(() => {
        setMessageFail(false);
      }, 3000);
      return;
    }

    setMessageDelete(true);
    if(updateComponentNav == true){
      updateNavPlatform(false);
    }else {
      updateNavPlatform(true);
    }
    setTimeout(() => {
      setMessageDelete(false);
    }, 3000);
    setLoading(false);
  }
  
  return (
    <div className="home perfil">
      <Aside />
      <div className="container">
        <h2 className="text-center">Cadastrar Video</h2>

        <div className="login-page">
          <form className="container login-page-box editar-video" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                  { message && <h3 className="text-success text-center">Video cadastrado com sucesso!</h3> }
                  { messageErrorStatus && messageError.map((error, index) => (
                    <h3 key={index} className="text-danger text-center">{error}</h3>
                  ))}
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
                <div className="d-flex">
                  <label className="mt-3 me-3">
                    <div>Plataforma</div>
                      <select className="privacy-select" name="plataforma" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                        <option value="" disabled>Selecione</option>
                        <option value="shorts">YouTube</option>
                        <option value="reel">Instagram</option>
                        <option value="tiktok">TikTok</option>
                      </select>
                  </label>
                  <label className="mt-3">
                    <div>Privacidade</div>
                      <select className="privacy-select" name="privacidade" value={privy} onChange={(e) => setPrivy(e.target.value)}>
                        <option value="" disabled>Selecione</option>
                        <option value="true">Privado</option>
                        <option value="false">Público</option>
                      </select>
                  </label>
                </div>
                <button type="submit" className={`btn btn-entrar mt-4 ${loadingCadastrar ? 'disabled-link' : ''}`}>{loadingCadastrar ? 'Carregando...' : 'Cadastrar' }</button>
                <div className="text-center mt-4 ou-border-register"></div>
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
          <Box sx={{ ...style, ...responsiveStyle, width: 600, paddingBottom: 7 }}>
            <h3 id="parent-modal-title" className="pt-4 text-center">Selecione um video para excluir</h3>
            {messageDelete && <h5 className="text-success text-danger mt-3 text-center">Video deletado com sucesso!</h5>}
            {messageFail && <h5 className="text-danger text-danger mt-3 text-center">Ocorreu um erro!</h5>}
            <div className="d-flex justify-content-center flex-wrap flex-column">
              <h4 className="text-center mt-4 mb-3">Escolha um vídeo</h4>
            <select className="privacy-select" name="exclusao" onChange={(e) => setExcludeId(e.target.value)}>
                <option value="" selected disabled>Selecione um video</option>
                {allVideos.data && allVideos.data.map((item, i) => <option key={i} value={item._id}>{item.title}</option>)}
            </select>
            </div>
            <button className={`btn btn-excluir mt-4 bg-danger text-white w-100 ${loading ? 'disabled-link' : ''}`} onClick={handleExclude}>{loading ? 'Excluindo...' : 'Excluir' }</button>
          </Box>
        </Modal>
      </div>
      <Button onClick={handleOpen} className="text-red mt-auto d-flex align-items-center me-5 mb-5"><img className="me-2" src={trash}/>Excluir um video</Button>
    </div>
  );
};

export default Video;
