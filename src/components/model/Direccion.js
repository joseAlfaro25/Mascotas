import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
DirectionsRenderer,
    Polyline
} from "react-google-maps";
import swal from "sweetalert2";
import app from "../../services/auth/base";
import { usePosition } from 'use-position';
import data from '../../services/data.json';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { getDistance, findNearest} from 'geolib';
import image from '../Image/marca.png'

/* global google */

const Map = (props) => {
    const watch = true;
    const {
        latitude,
        longitude,
    } = usePosition(watch);
    const [directions, setDirections] = useState('');
    const [error, setError] = useState(null);
    const [datos, setDatos] = useState([]);
    const [orden, setOrden] = useState('');
    const [selectedCorona, setSelectedCorona] = useState('');
    const [selectdHopital, setSelectedHopital] = useState('');
    const [state, setstate] = useState(null);
    const [distance, setDistance] = useState('');
    const Mydire = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    const [imagen,setImagen]=useState(false);
    
    const onClickModalI = async () => {
        const result = await swal.fire({
            title: "Informacion del Pacientes",

            html: `<p>
              <h5>${`${selectedCorona.nombre} ${selectedCorona.especie}`}</h5>
            <img  width="250"
                height="275" src=${selectedCorona.photoUrl || ""} alt=""></img>
                <h6>${selectedCorona.detalles}</h6>
            </p>`
        })


    };


   
    

    

    useEffect(() => {

       // getDistance({ lat: latitude, lng: longitude }, { lat: selectedCorona.latitude, lng: selectedCorona.longitude }, 1000)

        
        const obtenerDatos = async () => {
            const db = app.firestore();
            try {
                const data = await db.collection("datos").get();
                const arrayData = data.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log(arrayData);
                setDatos(arrayData);
            } catch (error) {
                console.log(error);
                
            }
        };
        obtenerDatos();
       
        const directionsService = new google.maps.DirectionsService();
      
            directionsService.route(

                {

                    origin: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                    destination: { lat: parseFloat(selectedCorona.latitude), lng: parseFloat(selectedCorona.longitude) },
                    travelMode: google.maps.TravelMode.DRIVING,
                    datos:datos
                },
                (result, status) => {
                    if (status === 'OK') {
                        setDirections({
                           directions: result
                        }
                        );
                    } else {
                        setError({ error: result });
                        
                    }
                }
            

        )
     
       
      
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedCorona(null);
                setSelectedHopital(null)
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
        //--

      
        
    }, []);

    

   
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={ parseFloat(latitude),  parseFloat(longitude)  ||{ lat: 10.39972, lng: -75.51444 }}
            defaultOptions={{
               
                
            
            }}
        >
            <Marker


                position={
                    { lat: parseFloat(latitude), lng: parseFloat(longitude) }
                   
                }
                onClick={
                   
                    () => {
                        
                        const orden = JSON.stringify(findNearest({ Mydire },
                                data
                        ))
                        
                        const end=JSON.parse(orden)
                        
                       

                        swal.fire({
                            title: "Sede Mas Cercana ",
                            html: `<p>
                            ${end.nombre}
                             </p>`
                        })
                        

                 
                        
                    }

                }

                icon={{
                    url: `https://www.flaticon.es/svg/static/icons/svg/2667/2667975.svg`,
                    scaledSize: new window.google.maps.Size(30, 25),
                }}

            />

           
            <Polyline
                path={ [{ lat:latitude, lng: longitude }, { lat: selectdHopital.latitude, lng: selectdHopital.longitud }]}
                geodesic={false}
                    options={{
                    strokeColor: '#38B44F',
                    strokeOpacity: 1,
                    strokeWeight: 7,
                }} />
            {/* mascotas */}

            {datos.map((data) => (
                <Marker //Marca principal
                    key={data.latitude+data.nombre}
                    position={{
                        lat: parseFloat(data.latitude),
                        lng: parseFloat(data.longitude),
                    }}
                    onClick={() => {
                        setSelectedCorona(data);
                    }}
                    
                    icon={{
                        url: `${image}`,
                        scaledSize: new window.google.maps.Size(25, 25),
                    }}
                />
                
            ))}
           

            {selectedCorona && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedCorona('');
                    }}
                    position={{
                        lat: parseFloat(selectedCorona.latitude),
                        lng: parseFloat(selectedCorona.longitude),
                    }}
                >
                    <div>
                        <h4>{selectedCorona.nombre}</h4>
                        <div className="text-center mt-2">
                            {selectedCorona.especie}
                       </div>
                            
                    
                        <div className="text-center mt-2">
                            {selectedCorona.fecha}
                       </div>

                        <h5 className="text-center"></h5>
                       
                        <h6 className="nav-link text-center" onClick={onClickModalI}>
                           
              Detalles
            </h6>
                    </div>
                </InfoWindow>
            )}
            {/* Clinicas */}

            {data.map((dato) => (
                <Marker
                    key={dato.id}
                    position={{
                        lat: parseFloat(dato.latitude),
                        lng: parseFloat(dato.longitud),
                    }}
                    onClick={() => {
                        setSelectedHopital(dato);
                       setDistance(getDistance(Mydire, { latitude: parseFloat(dato.latitude), longitude: parseFloat(dato.longitud) }
                       )/1000)
                    }}

                    icon={{
                        url: `https://www.flaticon.com/svg/static/icons/svg/745/745435.svg`,
                        scaledSize: new window.google.maps.Size(25, 25),
                    }}
                
                />


            ))}
            {selectdHopital && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedHopital('');
                    }}
                    position={{
                        lat: parseFloat(selectdHopital.latitude),
                        lng: parseFloat(selectdHopital.longitud),
                    }}
                    onClick={
                        () => {
                            setDistance() }
                    }

                >
                    <div>
                        <h6 className="text-center">{selectdHopital.nombre}</h6>
                        
                        <h6 className="text-center">{distance} Km</h6>
                    </div>
                </InfoWindow>
            )}
            {/*  */}
            

            
           
        </GoogleMap>
    );
};








const MapW = withScriptjs(withGoogleMap(Map));

function Direccion() {
   
// 
   
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapW
      googleMapURL={
        "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyCWNL8C7G1F9SlTkPs3d_uyMTs-H9rbrjI"    
           }
              
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default Direccion;
