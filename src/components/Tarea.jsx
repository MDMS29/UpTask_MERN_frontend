import { FormatearFecha } from "../helpers/FormatearFecha"
import useAdmin from "../hook/useAdmin"
import useProyectos from "../hook/useProyectos"

const Tarea = ({ tarea }) => {

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()

    const admin = useAdmin()

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-xl">{FormatearFecha(fechaEntrega)}</p>
                <p className="mb-1 text-gray-600">{prioridad}</p>
                {estado && <p className="text-xs bg-green-600 uppercase rounded-lg p-1 text-white font-bold">Completada por {tarea.completado.nombre}</p> }
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
                {admin &&
                    <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-lg" onClick={() => handleModalEditarTarea(tarea)}>Editar</button>
                }

                    <button className={`${estado ? 'bg-sky-600' : 'bg-gray-600'}  px-4 py-3 text-white uppercase font-bold rounded-lg`} onClick={() => completarTarea(_id)}>{estado ? 'Completa' : 'Incompleta'}</button>
                    
                {admin &&
                    <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg" onClick={() => handleModalEliminarTarea(tarea)}>Eliminar</button>
                }
            </div>
        </div>
    )
}

export default Tarea