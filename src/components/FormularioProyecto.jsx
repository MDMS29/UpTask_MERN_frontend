import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hook/useProyectos'
import Alerta from '../components/Alerta'

const FormularioProyecto = () => {
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    useEffect(() => {
        if (params.id) {
            setId(proyecto._id) 
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
            mostrarAlerta({
                msg: "Todos los campos deben ser llenados",
                error: true
            })

            return
        }
        //Enviar datos al Provider de Proyecto
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente })

        setId(null)
        setNombre("")
        setDescripcion("")
        setFechaEntrega("")
        setCliente("")
    }

    const { msg } = alerta

    return (
        <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow' onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='nombre'>Nombre Proyecto :</label>
                <input type="text" id="nombre" className='border w-full p-2 mt-2 placeholder-gray400 rounded-md' placeholder='Nombre del Proyecto' value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>
            <div className="mb-5">
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='descripcion'>Descripcion :</label>
                <textarea type="text" id="descripcion" className='border w-full p-2 mt-2 placeholder-gray400 rounded-md' placeholder='Descripcion del Proyecto' value={descripcion} onChange={e => setDescripcion(e.target.value)} />
            </div>
            <div className="mb-5">
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='fecha-entrega'>Fecha Entrega :</label>
                <input type="date" id="fecha-entrega" className='border w-full p-2 mt-2 placeholder-gray400 rounded-md' value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} />
            </div>
            <div className="mb-5">
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='cliente'>Cliente :</label>
                <input type="text" id="cliente" className='border w-full p-2 mt-2 placeholder-gray400 rounded-md' placeholder='Cliente' value={cliente} onChange={e => setCliente(e.target.value)} />
            </div>
            <input type="submit" value={id ? "Actualizar Proyecto" : "Crear Proyecto"} className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors' />
        </form>
    )
}

export default FormularioProyecto