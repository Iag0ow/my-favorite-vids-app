import React, { useEffect, useState, useContext } from "react";
import Aside from "../../components/Aside/Aside";
import ReactPaginate from "react-paginate";
import "./Descobrir.css";
import {
  getDiscoverVideos,
  getPlatforms,
  updateVideo,
} from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavContext } from "../../context/NavBarInfContext";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Descobrir = () => {
  
  const { platformParam } = useParams();
  const {
    navBarData,
    updateComponentNav,
    updateNavPlatform,
    updateNavBarData,
    updateNavOptions,
    page,
    updatePage,
    search
  } = useContext(useNavContext);

  const [platform, setPlatform] = useState("");
  const [allVideos, setAllVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [messageFail,setMessageFail] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    privy: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");
  // const [page, setPage] = useState(1);


  useEffect(() => {
    async function fetchData() {
      
      setLoading(true);
      const videos = await getDiscoverVideos(page, platformParam ? platformParam : 'reel',search);
    //   const videos = await getDiscoverVideos();
      setAllVideos(videos);
      setLoading(false);
    }
    fetchData();
  }, [updateComponentNav,page,platformParam,search]);

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

  const handleCopy = async (e, string) => {
    e.preventDefault();
    const urlLink = window.location.origin + string;
    await navigator.clipboard.writeText(urlLink);
    toast.success('🔗 Copiado!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
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
  const handlePageClick = (e) => {
    updatePage(e.selected + 1);
  };
  return (
    <div className="home">
      <Aside />
      <div className="container">
        <h2 className="mb-4 py-5">COMUNIDADE</h2>
        <div className="row">
          {allVideos.data &&
            allVideos.data.map(
              (video, index) =>
                platformParam === video.platform && (
                  <div
                    key={index}
                    className="col-md-4 col-lg-3 mb-3 card-video"
                    style={{wordBreak:"break-word"}}
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
                    <div className="d-flex justify-content-center align-items-center mb-3 flex-column">
                    <Link onClick={(e) => handleCopy(e, `/video/${video._id}`)}>
                        <i
                        className="fa-solid fa-link fa-2x"
                      ></i>
                        </Link>
                        <Link to={`/perfil-publico/${video.platform}/${video.user_id}`}><button className="btn btn-primary mt-3"> Ver perfil</button></Link>
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
                    className="col-md-4 col-lg-3 mb-3 card-video word-break"
                    style={{wordBreak:"break-word"}}
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
                    <div className="d-flex justify-content-center align-items-center mb-3 flex-column">
                    <Link onClick={(e) => handleCopy(e, `/video/${video._id}`)}>
                        <i
                        className="fa-solid fa-link fa-2x"
                      ></i>
                        </Link>
                        <Link to={`/perfil-publico/${video.platform}/${video.user_id}`}><button className="btn btn-primary mt-3"> Ver perfil</button></Link>
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
        <div>
            <ReactPaginate
              breakLabel={"..."}
              pageCount={ allVideos.meta && allVideos.meta.pages }
              onPageChange={handlePageClick}
              containerClassName={
                "pagination justify-content-center pe-3 mt-4 not-selectable"
              }
              pageClassName={"page-item"}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              pageLinkClassName={"page-link"}
              previousLinkClassName={"page-link"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
              forcePage={page - 1}
              // marginPagesDisplayed={widthScreen <= 767 ? 1 : 2}
              // pageRangeDisplayed={widthScreen <= 767 ? 1 : 3}
            />
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

        <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      </div>
    </div>
  );
};

export default Descobrir;
