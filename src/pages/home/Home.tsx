import React from 'react'
import './Home.css'
import Aside from '../../components/Aside/Aside'

const Home = () => {
  return (
    <div className='home'>
      <Aside />
      <div className='container'>
          <h2 className='mb-4'>Galeria</h2>
        <div className='row'>
          <div className='col-md-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/dU_UKLnvD48?autoplay=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p className='text-center'>Danilo puto</p>
          </div>
          <div className='col-md-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/dyWqqvy4p2Q?autoplay=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p className='text-center'>Roubini</p>
          </div>  
          <div className='col-md-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/p_o0c_YBPes?autoplay=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p className='text-center'>Filme da barbie?</p>
          </div>  
          <div className='col-md-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/4xKjKRDTC6E?autoplay=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p className='text-center'>Robson espancando danilo</p>
          </div>  
          <div className='col-md-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/14ij2uWAsAw?autoplay=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p className='text-center'>Campari do céu</p>
          </div>  
          <div className='col-md-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/OLbBhnHD4wA?autoplay=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p className='text-center'>Sigma!</p>
          </div>  
          <div className='col-md-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/KAioiOPxLZQ?autoplay=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p className='text-center'>Como ser um redpill de respeito</p>
          </div>  
          <div className='col-md-3 mb-3'>
            <iframe width="100%" height="550" src="https://www.youtube.com/embed/_VxN6mcwC_U?autoplay=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p className='text-center'>Gêmeos</p>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Home