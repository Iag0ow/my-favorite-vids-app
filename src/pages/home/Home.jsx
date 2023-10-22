import React, { useEffect, useState, useContext } from "react";
import Aside from "../../components/Aside/Aside";
import "./Home.css";
import {
  deleteVideo,
  getAllVideos,
  getPlatforms,
  getVideoById,
  updateVideo,
} from "../../utils/config";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavContext } from "../../context/NavBarInfContext";
import ReactDOMServer from "react-dom/server";
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
  width: 695,
  border: '2px solid #ffffff47',
  boxShadow: 24,
  borderRadius: 3,
  pt: 2,
  px: 4,
  pb: 3,
};
const responsiveStyle = {
  '@media (max-width: 998px)': {
    width: 351,
  },
}
const Home = () => {
  
  const { platformParam } = useParams();
  const {
    navBarData,
    updateComponentNav,
    updateNavPlatform,
    updateNavBarData,
  } = useContext(useNavContext);

  const [platform, setPlatform] = useState("");
  const [allVideos, setAllVideos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    privy: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const videos = await getAllVideos();
      setAllVideos(videos);
      setLoading(false);
    }
    fetchData();
  }, [updateComponentNav]);

  useEffect(() => {
    async function fetchData() {
      const platforms = await getPlatforms();
      setPlatform(platforms[0]);
      if (platformParam == undefined) {
        updateNavBarData(platforms[0]);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    Swal.fire({
      title: "Deseja realmente excluir o vídeo?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deleteVideo(id);

        if (data.hasOwnProperty("error")) {
          setLoading(false);
          setMessageFail(true);

          setTimeout(() => {
            setMessageFail(false);
          }, 3000);
          return;
        }

        Swal.fire({
          title: "Excluído!",
          text: "O vídeo foi excluído com sucesso.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup-success",
            confirmButton: "custom-swal-confirm-button-success",
          },
        }).then(async () => {
          const videos = await getAllVideos();
          setAllVideos(videos);
          if (updateComponentNav == true) {
            updateNavPlatform(false);
          } else {
            updateNavPlatform(true);
          }
        });
      }
    });
    setLoading(false);
  };


  const handleUpdate = async (id) => {
    const currentVideo = await getVideoById(id);
    setCurrentId(id);
    setFormData({
      title: currentVideo.title,
      description: currentVideo.description,
      privy: currentVideo.privy,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = async () => {
    setLoading(true);
    const result = await updateVideo(currentId, formData);
    if (result.hasOwnProperty("error")) {
      // setTimeout(() => {
      //   setMessageErrorStatus(false);
      // }, 6000);
      return;
    }

    if (updateComponentNav == true) {
      updateNavPlatform(false);
    } else {
      updateNavPlatform(true);
    }

    setTimeout(() => {
      setMessage(false);
      setFormData({
        title: "",
        description: "",
        privy: "",
      });
      setCurrentId("");
    }, 2000);

    setLoading(false);
    setOpen(false);

    Swal.fire({
      title: "Sucesso!",
      text: "Video atualizado.",
      icon: "success",
      customClass: {
        popup: "custom-swal-popup-success",
        confirmButton: "custom-swal-confirm-button-success",
      },
    })
  }

  return (
    <div className="home">
      <Aside />
      <div className="container">
        <h2 className="mb-4">Galeria</h2>
        <div className="row">
          {allVideos.data &&
            allVideos.data.map(
              (video, index) =>
                platformParam === video.platform && (
                  <div
                    key={index}
                    className="col-md-4 col-lg-3 mb-3 card-video"
                  >
                    <iframe
                      width="100%"
                      height="550"
                      src={video.url}
                      title="YouTube video player"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                    <p className="text-center">{video.title}</p>
                    <hr />
                    <div className="d-flex justify-content-center align-items-center  mb-3">
                      <i
                        onClick={() => handleUpdate(video._id)}
                        className="fa-solid me-5 fa-pen fa-2x"
                      ></i>
                      <i
                        onClick={() => handleDelete(video._id)}
                        className="fa-solid fa-trash fa-2x"
                      ></i>
                    </div>
                  </div>
                )
            )}
          {allVideos.data &&
            platformParam == undefined &&
            allVideos.data.map(
              (video, index) =>
                platform === video.platform && (
                  <div
                    key={index}
                    className="col-md-4 col-lg-3 mb-3 card-video"
                  >
                    <iframe
                      width="100%"
                      height="550"
                      src={video.url}
                      title="YouTube video player"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                    <p className="text-center">{video.title}</p>
                    <hr />
                    <div className="d-flex justify-content-center align-items-center  mb-3">
                      <i
                        onClick={() => handleUpdate(video._id)}
                        className="fa-solid me-5 fa-pen fa-2x"
                      ></i>
                      <i
                        onClick={() => handleDelete(video._id)}
                        className="fa-solid fa-trash fa-2x"
                      ></i>
                    </div>
                  </div>
                )
            )}

          {/* <div className='col-md-4 col-lg-3 mb-3 card-video'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/dU_UKLnvD48?autoplay=0&loop=1" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <p className='text-center'>Danilo puto</p>
            <hr />
            <div className='d-flex justify-content-center align-items-center mb-3'>
              <i class="fa-solid me-5 fa-pen fa-2x" data-bs-toggle="modal" data-bs-target="#customerModal"></i>
              <i class="fa-solid fa-trash fa-2x"></i>
            </div>
          </div> */}
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
          <Box sx={{ ...style, ...responsiveStyle, width: 510, paddingBottom: 7 }}>
            <h3 id="parent-modal-title" className="pt-4 text-center">Editar Vídeo</h3>
            {/* {errorPassword.length > 0 && errorPassword.map((item, i) => <h5 key={i} className="text-success text-danger mt-3 text-center">{item}</h5>)}
            {messageDelete && <h5 className="text-success text-danger mt-3">As senhas estão divergentes</h5>} */}
            <label className='mt-4'>Título</label>
            <input className="form-control form-control-lg mt-3" type="text" name="Título" placeholder="Titulo" value={formData.title} onChange={(e)=> setFormData({ ...formData, title:e.target.value })} />
            <label className='mt-4'>Descrição</label>
            <input className="form-control form-control-lg mt-3" type="text" name="Descrição" placeholder="Descrição" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <label className="mt-3">
                <div>Privacidade</div>
                <select className="privacy-select" name="privacidade" value={formData.privy} onChange={(e) => setFormData({ ...formData, privy: e.target.value })}>
                  <option value="true">Privado</option>
                  <option value="false">Público</option>
                </select>
                </label>
            <button className={`btn btn-alterar-video mt-4 bg-danger text-white w-100 ${loading ? 'disabled-link' : ''}`} onClick={handleSave}>{loading ? 'Salvando...' : 'Salvar' }</button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
