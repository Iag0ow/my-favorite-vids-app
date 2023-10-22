import React, { useEffect, useState,useContext } from 'react'
import './Home.css'
import Aside from '../../components/Aside/Aside'
import { deleteVideo, getAllVideos, getPlatforms, getVideoById } from "../../utils/config";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavContext } from '../../context/NavBarInfContext';
import ReactDOMServer from 'react-dom/server';
const Home = () => {
const { platformParam } = useParams();
const {navBarData,updateComponentNav,updateNavPlatform,updateNavBarData  } = useContext(useNavContext);

  const [platform,setPlatform] = useState("");
  const [allVideos, setAllVideos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
  })
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const videos = await getAllVideos();
      setAllVideos(videos);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const platforms = await getPlatforms();
      setPlatform(platforms[0]);
      if(platformParam == undefined){
        updateNavBarData(platforms[0]);
      }
    }
    fetchData();
  })
  const handleDelete = async (id) => {
    setLoading(true);
    Swal.fire({
      title: 'Deseja realmente excluir o vídeo?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'custom-swal-popup',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button',
      },
    })
    .then(async (result) => {
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
            title: 'Excluído!',
            text: 'O vídeo foi excluído com sucesso.',
            icon: 'success',
            customClass: {
              popup: 'custom-swal-popup-success',
              confirmButton: 'custom-swal-confirm-button-success',
            },
          }).then(async () => {
            const videos = await getAllVideos();
            setAllVideos(videos);
            if(updateComponentNav == true){
              updateNavPlatform(false);
            }else {
              updateNavPlatform(true);
            }
          });
      }
    });
  };
  
  const handleUpdate = async (id) => {
    const currentVideo = await getVideoById(id);
    setFormData(currentVideo);
    const htmlContent = (
      <div className="container">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="privy">Privy:</label>
          <input
            type="text"
            id="privy"
            name="privy"
            className="form-control"
            value={formData.privy}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
    Swal.fire({
      title: 'Editar Item',
      html: ReactDOMServer.renderToString(htmlContent),
      confirmButtonText: 'Salvar',
      showCancelButton: true,
    });
    // setLoading(true);
    // const body ={
    //   title: document.getElementById("title").value,
    //   description: document.getElementById("description").value,
    //   privy: document.getElementById("privy").value,
    // }
    // const data = await updateVideo(id,body);
    // // if (data.hasOwnProperty("error")) {
    // //   setMessageFail(true);
    // //   setTimeout(() => {
    // //     setMessageFail(false);
    // //   }, 3000);
    // //   return;
    // // }
    // setMessageUpdate(true);
    // setLoading(false);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className='home'>
      <Aside />
      <div className='container'>
          <h2 className='mb-4'>Galeria</h2>
        <div className='row'>
        {allVideos.data && allVideos.data.map((video, index) => (
          platformParam === video.platform && (
            <div key={index} className='col-md-4 col-lg-3 mb-3 card-video'>
            <iframe
              width="100%"
              height="550"
              src={video.url}
              title="YouTube video player"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <p className='text-center'>{video.title}</p>
            <hr />
            <div className='d-flex justify-content-center align-items-center  mb-3'>
              <i onClick={() => handleUpdate(video._id)} className="fa-solid me-5 fa-pen fa-2x" data-bs-toggle="modal" data-bs-target="#customerModal"></i>
              <i onClick={() => handleDelete(video._id)} className="fa-solid fa-trash fa-2x"></i>
            </div>
          </div>
          )
        ))}
        {allVideos.data  &&  platformParam == undefined && allVideos.data.map((video, index) => (
          platform === video.platform && (
            <div key={index} className='col-md-4 col-lg-3 mb-3 card-video'>
            <iframe
              width="100%"
              height="550"
              src={video.url}
              title="YouTube video player"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <p className='text-center'>{video.title}</p>
            <hr />
            <div className='d-flex justify-content-center align-items-center  mb-3'>
              <i onClick={() => handleUpdate(video._id)} className="fa-solid me-5 fa-pen fa-2x" data-bs-toggle="modal" data-bs-target="#customerModal"></i>
              <i onClick={() => handleDelete(video._id)} className="fa-solid fa-trash fa-2x"></i>
            </div>
            </div>
          )

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
    </div>
  )
}

export default Home