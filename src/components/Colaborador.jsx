import React from 'react'

import useProyectos from '../hook/useProyectos'
import useAdmin from '../hook/useAdmin'

const Colaborador = ({ colaborador }) => {

    const { nombre, email } = colaborador

    const { handleModalEliminarColaborador } = useProyectos()

    const admin = useAdmin()

    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div>
                <p className='font-bold'>{nombre}</p>
                <p className='text-sm text-gray-700'>{email}</p>
            </div>
            {admin &&
                <div>
                    <button type='button' className="bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg" onClick={() => handleModalEliminarColaborador(colaborador)}>Eliminar</button>
                </div>
            }
        </div>
    )
}

export default Colaborador