import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import FormularioColaborador from '../components/FormularioColaborador'

import useProyectos from '../hook/useProyectos'
import Alerta from '../components/Alerta'

const NuevoColaborador = () => {

    const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos()

    const params = useParams()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    if (!proyecto._id) <Alerta alerta={alerta} />

    return (
        cargando ?
            <Spinner msg="Colaboradores" /> :
            (
                <>
                    <h1 className='text-xl font-black'>Añadir Colaborador(a) al Proyecto : {proyecto.nombre} </h1>
                    <div className="mt-10 flex justify-center">
                        <FormularioColaborador />
                    </div>

                    {
                        cargando ? <Spinner msg="Colaboradores" /> : colaborador._id && (
                            <div className='flex justify-center mt-10 '>
                                <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full '>
                                    <h2 className="text-center mb-10 text-2xl font-bold">Resultados</h2>
                                    <div className="flex justify-between items-center">
                                        <p>{colaborador.nombre}</p>
                                        <button type='button' className='bg-slate-500 py-2 px-5 uppercase text-white font-bold text-sm rounded-lg' onClick={() => agregarColaborador({ email: colaborador.email })}>
                                            Agregar al proyecto
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                </>
            )
    )
}

export default NuevoColaborador