import React, { useEffect, useState } from 'react'
import './Home.css'
import Aside from '../../components/Aside/Aside'
import { getAllVideos } from "../../utils/config";

const Home = () => {
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
  return (
    <div className='home'>
      <Aside />
      <div className='container'>
          <h2 className='mb-4'>Galeria</h2>
        <div className='row'>
        {allVideos && allVideos.map((video, index) => (
          <div key={index} className='col-md-4 col-lg-3 mb-3'>
            <iframe
              width="100%"
              height="550"
              src={video.url}
              title="YouTube video player"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <p className='text-center'>{video.title}</p>
          </div>
        ))}

          {/* <div className='col-md-4 col-lg-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/dU_UKLnvD48?autoplay=0&loop=1" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <p className='text-center'>Danilo puto</p>
          </div> */}
          {/* <div className='col-md-4 col-lg-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/dyWqqvy4p2Q?autoplay=0&loop=1" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <p className='text-center'>Roubini</p>
          </div> 
          {/* 
          <div className='col-md-4 col-lg-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/p_o0c_YBPes?autoplay=0&loop=1" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <p className='text-center'>Filme da barbie?</p>
          </div>  
          <div className='col-md-4 col-lg-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/4xKjKRDTC6E?autoplay=0&loop=1" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <p className='text-center'>Robson espancando danilo</p>
          </div>  
          <div className='col-md-4 col-lg-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/14ij2uWAsAw?autoplay=0&loop=1" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <p className='text-center'>Campari do céu</p>
          </div>  
          <div className='col-md-4 col-lg-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/OLbBhnHD4wA?autoplay=0&loop=1" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <p className='text-center'>Sigma!</p>
          </div>  
          <div className='col-md-4 col-lg-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/KAioiOPxLZQ?autoplay=0&loop=1" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <p className='text-center'>Como ser um redpill de respeito</p>
          </div>  
          <div className='col-md-4 col-lg-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/_VxN6mcwC_U?autoplay=0&loop=1" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <p className='text-center'>Gêmeos</p>
          </div>  */}
        </div>
      </div>
    </div>
  )
}

export default Home