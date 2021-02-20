import React, { Fragment } from 'react';
import Card from '../components/Card/Card'
import image from './Image/maps.png'
import image2 from './Image/registrar.png'


const Home = () => {
    return (
      <Fragment>
      
       < div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel" style={{width: '65%', margin: 'auto'}} > 
      <div className="carousel-inner">
        
        <div className="carousel-item active">
          <img
                src="https://i.ibb.co/nm9RVQH/2.png"
            className="d-block w-100"
            width="350"
                height="350"
                alt=""
          />
          <div className="carousel-caption d-none d-md-block"></div>
        </div>
        <div className="carousel-item">
          <img
            src="https://i.ibb.co/XZw3mXn/1.png"
            className="d-block w-100"
            width="350"
            height="350"
            alt="pest"
          />
          <div className="carousel-caption d-none d-md-block"></div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>

    <div className='container'>

    <div className='row cols-2 ' style={{justifyContent: 'center'}}>
                
        <Card imge={image} text={'Localizacion de pacientes'} link={'/maps'}/>
        <Card imge={image2} text={'Registrar de paciente'} link={'/register'}/>
                
            </div>
    </div>
     

        
                 
          
       </Fragment>
     );
}
 
export default Home;