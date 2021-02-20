import React, { useEffect, useState } from 'react';
import NavBar from './components/nav/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login/Login'
import Registrar from './components/form/Register';
import { AuthProvider } from "./services/auth/Auth";
import PrivateRoute from  "./services/auth/PrivateRoute";
import Animales from "./components/Estadisticas/Pacientes";
import Direccion from './components/model/Direccion';
import Columns from './components/Estadisticas/Columns';







function App() {
  return(    

   
    <div>
      
      <AuthProvider>
        <Router>
        <NavBar/>
     
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/register' component={Registrar} />
          <PrivateRoute exact path='/animales' component={Animales} />
          <PrivateRoute exact path="/maps" component={Direccion} />
         
        
      </Router>
      </AuthProvider>
    
    </div>
    
    


  ) 
}


export default App;
