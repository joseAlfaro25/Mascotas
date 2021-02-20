import React, { Fragment, useState, useLayoutEffect} from 'react';
import swal from 'sweetalert2'
import app from '../../services/auth/base';
import withReactContent from "sweetalert2-react-content";
const CasesColombia = () => {
    const [Pacientes, setPacientes] = useState([])
    const [id, setId] = useState('')
    const [raza, setRaza] = useState('')
    const [nombre, setNombre] = useState('')
    const [fecha, setFecha] = useState('')
    const [especie, setEspecie] = useState('')
    const [detalles, setDetalles] = useState('')
    const [vacunas,setVacuna]=useState('')
    const [genero,setGenero]=useState('')
    const db=app.firestore();

    const obtenerDatos = async() => {
            const data = await db.collection('datos').get()
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setPacientes(arrayData)
    }
    
    const asignarId=(id)=>{
        setId(id)

    }
    const openModalTurns = async (info) => {
        const MySwal = withReactContent(swal);
       console.log(info)
        MySwal.fire({
          didOpen: () => {
            MySwal.clickConfirm();
          },
        }).then(() => {
          return MySwal.fire(
            <div>
            
                        <h3 className="text-center ">Actualizar mascotas</h3>
                        <div>

                            <form onSubmit={Actulizar}>
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
                                    value={detalles}>

                                    </textarea>
                                    
                            </form>
                           
                        </div>
                    </div>
           
          
          );
        });
      };
    useLayoutEffect(() => {
   
            obtenerDatos();
        
    }, [obtenerDatos])

    const Actulizar= async (e)=>{
        e.preventDefault();
       
        await db.collection("datos").doc(`${id}`).update({
            nombre: nombre,
            especie: especie,
            fecha: fecha,
            vacunas:vacunas,
            genero:genero,
            detalles: detalles,
            raza:raza
          });
        await swal.fire({icon: 'success', text: 'Se ha actulizado', confirmButtonColor: "#00B0FF"})
         await obtenerDatos()

    }

    const Eliminar=async (id)=>{
      
        try {
            const result = await swal.fire({
              icon: "error",
              text: `¿Eliminar mascotas permanetemente?`,
              showCancelButton: true,
              cancelButtonColor: "#ff3547",
              confirmButtonColor: "#00B0FF",
            });
            if (result.value) {
              await db.collection("datos").doc(`${id}`).delete();
              obtenerDatos()
            }
          } catch (error) {
            console.log(error);
          }
        
    }
       
    return (
        <div className="container mb-2">

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel"></h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
         
        </button>
      </div>
      <div className="modal-body">
      <div>
            
            <h3 className="text-center ">Actualizar mascotas</h3>
            <div>

                <form onSubmit={Actulizar}>
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
                        value={detalles}>

                        </textarea>
                        <div>
                                <input name="id" type="text" className="invisible" placeholder="Nombre Completo"
                                    onChange={
                                        e => setId(e.target.value)
                                    }
                                    value={id}/>

                     </div>

        <button className="btn btn-primary col-6" type="submit" >
                                        Enviar
        </button>
                </form>
               
            </div>
        </div>
      </div>
      
    </div>
  </div>
</div>
<div class="table-responsive">

            <table className="table ">
                <thead>
                    <tr>
                        
                        <th scope="col">Nombre</th>
                        <th scope="col">Raza</th>
                        <th scope="col">Vacunas</th>
                        <th scope="col">Especie</th>
                        <th scope="col">Fecha .Na</th>
                        <th scope="col">Genero</th>
                        <th >Opciones</th>
                       
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        Pacientes.map(item => (
                            
                            <tr key={item.id}>
                                
                                <td>{item.nombre}</td>
                                <td>{item.raza}</td>
                                <td>{item.vacunas}</td>
                                <td>{item.especie}</td>
                                <td>{item.fecha}</td>
                                <td>{item.genero}</td>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onClick={()=> asignarId(item.id)}>Editar</button>
                                <button className='btn btn-danger' onClick={()=>Eliminar(item.id)}>Eliminar</button>
                    
                               
                            </tr>

                        ))
                    }
                </tbody>
            </table>
</div>





            
                       
              
                <div >
                    
        </div>
            </div>
        
    );
}
 
export default CasesColombia;