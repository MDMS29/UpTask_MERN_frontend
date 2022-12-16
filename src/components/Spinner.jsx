import React from 'react'

const Spinner = ({msg}) => {
    return (
        <div className='flex justify-center items-center h-screen flex-col'>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="block text-2xl">Cargando {msg}</div>
        </div>
    )
}

export default Spinner