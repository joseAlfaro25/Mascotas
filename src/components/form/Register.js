import React, {Fragment, useState} from 'react';
import app from '../../services/auth/base'
import {usePosition} from 'use-position';
import swal from 'sweetalert2'

const Registrar = (props) => {
    const watch = true;
    const {latitude, longitude} = usePosition(watch);

    const [raza, setRaza] = useState('')
    const [nombre, setNombre] = useState('')
    const [fecha, setFecha] = useState('')
    const [especie, setEspecie] = useState('')
    const [detalles, setDetalles] = useState('')
    const [vacunas,setVacuna]=useState('')
    const [genero,setGenero]=useState('')
    const [longitud, setLongitud] = useState('')
    const [latitud, setLatitud] = useState('')
    const [photoUrl, setphotoUrl] = useState('')
    const [Imagen, setImagen] = useState();
    const [ref, setRef] = useState(null);

    const changeImagen = e => {
        setImagen(e.target.files[0]);
    }

    const Datos = async (e) => {
        e.preventDefault();

        if (nombre !== '') {
          

            try {
                const newRef = app.storage().ref('fotos').child(Imagen.name); // nombre del archivo
                setRef(newRef);
                await newRef.put(Imagen);
                let photoUrl = await newRef.getDownloadURL()
                console.log('la ul de la imagen es' + photoUrl);

                const nuevoRegistro = {
                    nombre: nombre,
                    especie: especie,
                    fecha: fecha,
                    vacunas:vacunas,
                    genero:genero,
                    detalles: detalles,
                    longitude: longitude,
                    latitude: latitude,
                    photoUrl: photoUrl,
                    raza: raza

                }
                await app.firestore().collection('datos').add(nuevoRegistro)
                await swal.fire({icon: 'success', text: 'Se ha Guardo', confirmButtonColor: "#00B0FF"})


            } catch (error) {}


        }else {
            await swal.fire({icon: 'warning', text: 'necesita Guardo campo obligatorio', confirmButtonColor: "#00B0FF"})

        }
        setNombre('')
        setFecha('')
        setEspecie('')
        setDetalles('')
        setVacuna('')
        setGenero('')
        setLongitud('')
        setLatitud('')
        setphotoUrl('')
        setRaza('')
        setImagen()
        setRef(null)


    }


    return (
        <Fragment>
            <div className="container col-md-8 mt-2">
                <div className="abs-center">
                    <div className=" col-md-8">

                        <div className></div>

                        <h3 className="text-center ">Regitrar mascotas</h3>
                        <div>

                            <form onSubmit={Datos}>
                                <h5>Especie</h5>
                                <input type="text" className="form-control "

                                    onChange={
                                        e => setEspecie(e.target.value)
                                    }
                                    name="especie"
                                    value={especie}/>
                                <h5>Fecha</h5>
                                <input name="fecha" type="date" className="form-control mb-2"

                                    onChange={
                                        e => setFecha(e.target.value)
                                    }
                                    value={fecha}/>
                                <h5>Nombre mascotas</h5>
                                <input name="nombre" type="text" className="form-control"

                                    onChange={
                                        e => setNombre(e.target.value)
                                    }
                                    value={nombre}/>
                                <h5>Raza</h5>
                                <input name="raza" type="text" className="form-control"

                                    onChange={
                                        e => setRaza(e.target.value)
                                    }
                                    value={raza}/>
                                <h5>Genero</h5>
                                <input name="genero" type="text" className="form-control"

                                    onChange={
                                        e => setGenero(e.target.value)
                                    }
                                    value={genero}/>
                                 <h5>Vacunas</h5>
                                <input name="vacunas" type="text" className="form-control"

                                    onChange={
                                        e => setVacuna(e.target.value)
                                    }
                                    value={vacunas}/>

                                <h5>Detalles</h5>
                                <textarea rows="3" required type="text-area" className="form-control mb-2"
                                    onChange={
                                        e => setDetalles(e.target.value)
                                    }
                                    value={detalles}></textarea>

                                <div>
                                    <div>
                                        <div>
                                            <input name="nombre" type="text" className="invisible" placeholder="Nombre Completo"
                                                onChange={
                                                    e => setLongitud(e.target.value)
                                                }
                                                value={longitud}/>

                                        </div>
                                        <div>
                                            <input name="nombre" type="text" className="invisible" placeholder="Nombre Completo"
                                                onChange={
                                                    e => setLatitud(e.target.value)
                                                }
                                                value={latitud}/>

                                        </div>
                                        <div></div>

                                    </div>
                                </div>


                                <div>
                                    <input className="col-6" type="file" name="imagen"
                                        onChange={changeImagen}/>
                                    <button className="btn btn-primary col-6" type="submit">
                                        Enviar
                                    </button>
                                </div>


                            </form>
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Registrar;
