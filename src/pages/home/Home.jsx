import React, { useEffect, useState } from 'react'
import './Home.css'
import Aside from '../../components/Aside/Aside'
import { deleteVideo, getAllVideos } from "../../utils/config";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
  const { platformParam } = useParams();

  const [allVideos, setAllVideos] = useState([]);
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
          });
      }
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
              <i className="fa-solid me-5 fa-pen fa-2x" data-bs-toggle="modal" data-bs-target="#customerModal"></i>
              <i onClick={() => handleDelete(video._id)} className="fa-solid fa-trash fa-2x"></i>
            </div>
          </div>
          )
        ))}
        {platformParam === undefined && allVideos.data && (
          <div className='col-md-4 col-lg-3 mb-3 card-video'>
            <iframe
              width="100%"
              height="550"
              src={allVideos.data[0].url}
              title="YouTube video player"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <p className='text-center'>{allVideos.data[0].title}</p>
            <hr />
            <div className='d-flex justify-content-center align-items-center  mb-3'>
              <i className="fa-solid me-5 fa-pen fa-2x" data-bs-toggle="modal" data-bs-target="#customerModal"></i>
              <i className="fa-solid fa-trash fa-2x"></i>
            </div>
          </div>
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