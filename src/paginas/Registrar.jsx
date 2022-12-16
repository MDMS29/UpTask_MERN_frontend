import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const Registrar = () => {

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmarPassword, setConfirmarPassword] = useState("")
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([nombre, email, password, confirmarPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    if (password !== confirmarPassword) {
      setAlerta({
        msg: "Las contraseñas no son iguales",
        error: true
      })
      return
    }
    if (password.length < 6) {
      setAlerta({
        msg: "El password debe ser minimo de 6 caracteres",
        error: true
      })
      return
    }
    setAlerta({})

    //Crear usuario en la API.
    try {
      //Link del servidor donde se envia, y los datos a enviar
      const { data } = await clienteAxios.post(`/usuarios`, { nombre, email, password })

      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre("")
      setEmail("")
      setPassword("")
      setConfirmarPassword("")

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Crea tu cuenta y Administra tus <span className='text-slate-700'>proyectos</span></h1>

      {msg && <Alerta alerta={alerta} />}

      <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
        <div className='my-5 '>
          <label htmlFor="nombre" className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
          <input type="text" placeholder='Tu Nombre' className='w-full mt-3 p-3 border rounded-xl bg-gray-100' id='nombre' value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className='my-5 '>
          <label htmlFor="email" className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
          <input type="email" placeholder='Email de Registro' className='w-full mt-3 p-3 border rounded-xl bg-gray-100' id='email' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='my-5 '>
          <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
          <input type="password" placeholder='Password de Registro' className='w-full mt-3 p-3 border rounded-xl bg-gray-100' id='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className='my-5 '>
          <label htmlFor="password2" className='uppercase text-gray-600 block text-xl font-bold'>Repetir Password</label>
          <input type="password" placeholder='Repite tu password' className='w-full mt-3 p-3 border rounded-xl bg-gray-100' id='password2' value={confirmarPassword} onChange={e => setConfirmarPassword(e.target.value)} />
        </div>
        <input type="submit" value="Crear Cuenta" className='bg-sky-700 w-full mb-5 py-3 uppercase font-bold rounded text-white hover:cursor-pointer hover:bg-sky-800 transition-colors' />
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>¿Ya tienes un cuenta? Inicia Sesion</Link>
        <Link to="/olvide-password" className='block text-center my-5 text-slate-500 uppercase text-sm'>Olvide mi password</Link>
      </nav>
    </>
  )
}

export default Registrar