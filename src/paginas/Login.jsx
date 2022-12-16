import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

//Hook para extraer los datos.
import useAuth from '../hook/useAuth'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([email, password].includes('')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            setAlerta({})
            //Guardamos el JWT para poder saber quien esta iniciando sesion.
            localStorage.setItem('token', data.token)

            setAuth(data)

            navigate('/proyectos')

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            return
        }
    }

    const { msg } = alerta

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl capitalize'>Inicia Sesion y Administra tus <span className='text-slate-700'>proyectos</span></h1>
            {msg && <Alerta alerta={alerta} />}
            <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
                <div className='my-5 '>
                    <label htmlFor="email" className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                    <input type="email" placeholder='Email de Registro' className='w-full mt-3 p-3 border rounded-xl bg-gray-100' id='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='my-5 '>
                    <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                    <input type="password" placeholder='Password de Registro' className='w-full mt-3 p-3 border rounded-xl bg-gray-100' id='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <input type="submit" value="Iniciar Sesion" className='bg-sky-700 w-full mb-5 py-3 uppercase font-bold rounded text-white hover:cursor-pointer hover:bg-sky-800 transition-colors' />
            </form>
            <nav className='lg:flex lg:justify-between'>
                <Link to="/registrar" className='block text-center my-5 text-slate-500 uppercase text-sm'>¿No tienes una cuenta? Registrate</Link>
                <Link to="/olvide-password" className='block text-center my-5 text-slate-500 uppercase text-sm'>Olvide mi password</Link>
            </nav>
        </>
    )
}

export default Login