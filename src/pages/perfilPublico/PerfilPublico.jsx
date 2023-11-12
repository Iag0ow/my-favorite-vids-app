import "./PerfilPublico.css"
import React, { useEffect, useState, useContext } from "react";
import Aside from "../../components/Aside/Aside";
import ReactPaginate from "react-paginate";
import {
  deleteVideo,
  getPublicVideoById,
  getPlatforms,
  getVideoById,
  updateVideo,
  getUserData,
} from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavContext } from "../../context/NavBarInfContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';

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

const PerfilPublico = () => {
  
  const { platformParam,id } = useParams();
  const {
    updateComponentNav,
    updateNavBarData,
    page,
    updatePage,
    discover,
    updateNavPlatform,
    updateNavOptions,
    search
  } = useContext(useNavContext);

  const [platform, setPlatform] = useState("");
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    updateNavOptions("perfil-publico",id);
  })

  useEffect(() => {
    updatePage(1);
  }, []);

  useEffect(() => {
    async function fetchData() {
      
      setLoading(true);
      const videos = await getPublicVideoById(id,page, platformParam ? platformParam : 'reel',search);
      const userData = await getUserData(id);
    //   const videos = await getDiscoverVideos();
      setUserData(userData);
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

  const handlePageClick = (e) => {
    updatePage(e.selected + 1);
  };

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

  return (
    <div className="home">
      <Aside />
      <div className="container">
        <div className="col-md-5 box-perfil-discover d-flex justify-content-between p-5 align-items-center mb-5">
          <div className="me-4">
            <h3 className="mb-4 ">Pedro Henrique</h3>
            <p>Meus vídeos do youtube são os mais legais</p>
          </div>
            <img className="img-perfil" src="https://picsum.photos/200" alt="" />
        </div>
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
                    </div>
                  </div>
                )
            )}
        </div>
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
            />
        </div>
      </div>
    </div>
  );
};

export default PerfilPublico;
