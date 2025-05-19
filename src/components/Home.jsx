import React, { useState, useEffect } from 'react'
import Swal from "sweetalert2";
import '../styles/inicio.css'
import llamados from '../services/llamados';


//hooks para q funcione todo con los llamados//
//funcion asyncrona para la obtencion de los productos del llamados//
function Home() {
    
    const [nombreProducto, SetNombreProducto] = useState("")
    const [descripcionProducto, SetDescripcionProducto] = useState("")
    const [precio, SetPrecio] = useState(0)
    const [cantidad, SetCantidad] = useState(0)
    const [nombreEditar, SetNombreEditar] = useState("")
    const [descripcionEditar, SetDescripcionEditar] = useState("")
    const [precioEditar, SetPrecioEditar] = useState("")
    const [cantidadEditar, SetCantidadEditar] = useState("")
    const [productos, SetProductos] = useState([])
    
    useEffect(() => {
        async function prod() {
            const dato = await llamados.getProductos()
            console.log(dato);
            
            SetProductos(dato)
        }
        prod()
    }, [])

    
    //funcion para nombre,descripcion,precio,cantidad para los inputs//
    function nombreee(evento) {
        SetNombreProducto(evento.target.value)
    }

    function descripcionnn(evento) {
        SetDescripcionProducto(evento.target.value)
    }

    function preciooo(evento) {
        SetPrecio(evento.target.value)
    }

    function cantidaddd(evento) {
        SetCantidad(evento.target.value)
    }

    // funcion agregar con el Post pa nuevos productos con sweetalert//
    function agregar() {
      
        llamados.postProductos(nombreProducto, descripcionProducto, precio, cantidad)
        mostrarSweet()
    }
    const mostrarSweet = () => {
        Swal.fire({
            title: 'Producto agregado',
            text: 'Desea agregar producto?',
            icon: 'question',
            confirmButtonText: 'Aceptar'
        });
    }; 

    function editar(id) {
        if (!nombreEditar || !descripcionEditar || !precioEditar || !cantidadEditar) {
            Swal.fire('¡Error!', 'Todos los campos deben estar completos.', 'error');
            return;
        }
     
        llamados.updateProductos(nombreEditar, descripcionEditar, precioEditar, cantidadEditar, id)
          .then(response => {
            Swal.fire('Producto actualizado', 'La actualización fue exitosa!', 'success');
            
            SetProductos(prev =>
              prev.map(producto => producto.id === id ? { ...producto, nombre: nombreEditar, descripcion: descripcionEditar, precio: precioEditar, cantidad: cantidadEditar } : producto)
            );
          })

        SetNombreEditar("");
        SetDescripcionEditar("");
        SetPrecioEditar("");
        SetCantidadEditar("");

    }

    function eliminar(id) {
        async function elimin(id) {
            const confirmado = window.confirm("¿Está seguro de eliminar este producto?");
            if (!confirmado) return;
    
            const eliminado = await llamados.deleteProductos(id);
            if (eliminado) {
                SetProductos(prev => prev.filter(producto => producto.id !== id));
                Swal.fire("Producto eliminado", "", "success");
            } else {
                Swal.fire("Error al eliminar el producto", "", "error");
            }
        }
    
        elimin(id);
    }


    return (
        <div className='cuadro'>
            
            <br />
            <section>
                <h2>CRUD PRODUCTOS</h2>
                <br />
                <label htmlFor="">Nombre Producto</label>
                <input id="ree" onChange={nombreee} value={nombreProducto} type="text" /> <br />
                <br />
                <label htmlFor="">Descripcion producto</label>
                <input id="ree" onChange={descripcionnn} value={descripcionProducto} type="text" /> <br />
                <br />
                <label htmlFor="">Precio</label><br />
                <input id="ree" onChange={preciooo} value={precio} type="text" /> <br />
                <br />
                <label htmlFor="">Cantidad</label>
                <input id="ree" onChange={cantidaddd} value={cantidad} type="text" /> <br />
                <br />
                <button id="boton3" onClick={agregar}>Agregar</button>
                <br />
                <ul>
                    {productos.map((producto, index) => (
                        <li key={index}>
                            <br />
                            <strong>Nombre Producto</strong>{producto.nombre} <br />
                            <strong>Descripcion Producto</strong>{producto.descripcion} <br />
                            <strong>Precio</strong>{producto.precio} <br />
                            <strong>Cantidad</strong>{producto.cantidad} <br />
                            <br />
                            <input id="ree" onChange={evento => SetNombreEditar(evento.target.value)} type="text" /> Nombre<br />
                            <br />
                            <input id="ree" onChange={evento => SetDescripcionEditar(evento.target.value)} type="text" /> Descripcion<br />
                            <br />
                            <input id="ree" onChange={evento => SetPrecioEditar(evento.target.value)} type="text" /> Precio<br />
                            <br />
                            <input id="ree" onChange={evento => SetCantidadEditar(evento.target.value)} type="text" /> Cantidad<br />
                            <br />
                            <button id="boton3" onClick={() => editar(producto.id)}>Confirmar edición</button> <br />
                            <br />
                            <button id="boton3" onClick={() => eliminar(producto.id)} >Eliminar</button> <br />
                        </li>
                    )
                    )}
                </ul>
            </section>

        </div>

    )
}

export default Home