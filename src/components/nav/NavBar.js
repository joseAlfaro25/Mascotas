import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import app from '../../services/auth/base'
import imagen from '../Image/icono.png'

import { AuthContext } from "../../services/auth/Auth";
const NavBar = (props) => {


    const { currentUser } = useContext(AuthContext)
    
   
return (<Fragment>
 { currentUser &&
 <nav className="navbar custome-nav sticky-top navbar-expand-lg navbar-dark darken-1" style={{backgroundColor:'black'}}>
    <img src={imagen} alt='icono' />
   <b style={{color:'white'}}>

    Pest Global
   </b>
    <div style={{width:'100%'}}>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#basicExampleNav"
        aria-controls="basicExampleNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
       
        <span className="navbar-toggler-icon">
         
        </span>
      </button>
     
      <div className="collapse navbar-collapse" id="basicExampleNav">
        <ul className="navbar-nav ml-auto mt-0 mt-lg-0">
          <li className="nav-item">
            <a className="nav-link" >
             <Link to="/" className="nav-link">Inicio</Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" >
            <Link to="/animales" className="nav-link">Pacientes</Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" >
            <Link to="/register" className="nav-link">Registrar</Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" >
            <Link to="/maps" className="nav-link">Ubicacion</Link>
            </a>
          </li>
         
         </ul>

        <ul className="navbar-nav">
          <li className="nav-item dropdown" v-if="user">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink-333"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-left dropdown-default"
              aria-labelledby="navbarDropdownMenuLink-333"
            >
              
              <a
                
                className="dropdown-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => app.auth().signOut()}
              >Cerrar sesión</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}

</Fragment>


    );
}

export default NavBar;