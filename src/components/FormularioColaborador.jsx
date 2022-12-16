import { useState } from 'react'
import useProyectos from '../hook/useProyectos'

import Alerta from './Alerta'

const FormularioColaborador = () => {

    const [email, setEmail] = useState("")

    const { mostrarAlerta, alerta, submitColaborador } = useProyectos()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([email].includes("")) {
            mostrarAlerta({
                msg: "El email es obligatorio",
                error: true
            })
            return
        }

        await submitColaborador(email)

        setEmail("")
    }
    const { msg } = alerta

    return (
        <form className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow' onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='email'>Email Colaborador :</label>
                <input type="text" id="email" className='border w-full p-2 mt-2 placeholder-gray400 rounded-md' placeholder='Email del usuario' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <input type="submit" value="Buscar Colaborador" className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors' />
        </form>
    )
}

export default FormularioColaborador