import React, { Fragment, useState} from 'react';
import GoogleMapReact from 'google-map-react';






const Maps = (props) => {
    
   
    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };
    
    
 
    return (
        <Fragment>
            

            <div style={{ height: '100vh', width: '100%' }} >
               
                <GoogleMapReact
                    
                    bootstrapURLKeys={{
                    key: [props.clave] ,
                        libraries: ['places'],
                      
                       
                    }
                    }
                    defaultCenter={{
                        lat: 30,
                        lng: 5
                    }
                        
                        
                    }
                    defaultZoom={2}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}

                    
                >
                    {props.obj}
                    
                   

                   
                   
                </GoogleMapReact>
                
            </div>


        </Fragment>
    );
}

export default Maps;



