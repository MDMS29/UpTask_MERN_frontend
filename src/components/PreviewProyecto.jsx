import React from 'react'
import { Link } from 'react-router-dom'

import useAuth from '../hook/useAuth'

const PreviewProyecto = ({ proyecto }) => {
    const { auth } = useAuth()

    const { _id, nombre, creador, cliente } = proyecto

    return (
        <div className='border-b p-5 flex flex-col mt-2 md:flex-row md:mt-0 justify-between'>
            <div className='flex items-center gap-2'>
                <p className='flex-1'>
                    {nombre}
                    <span className='text-sm text-gray-500 uppercase'>{' - '}{cliente}</span>
                </p>
                {auth._id != creador && <p className='p-1 text-xs rounded-lg text-white bg-green-600 font-bold uppercase'>Colaborador</p>}
            </div>
            <Link to={`${_id}`} className='text-gray-600 hover:text-gray-800 text-sm font-bold'>Ver Proyecto</Link>
        </div>
    )
}

export default PreviewProyecto