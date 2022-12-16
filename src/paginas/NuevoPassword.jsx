import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

import Alerta from '../components/Alerta'

const NuevoPassword = () => {

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordValido, setPasswordValido] = useState(false)

  const { token } = useParams()

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)

        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe ser minimos de 6 caracteres",
        error: true
      })
      return
    }
    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordValido(true)
      setPassword("")
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
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Reestablece tu password y no pierdas acceso a tus <span className='text-slate-700'>proyectos</span></h1>
      {tokenValido ? (
        <>
          {msg && <Alerta alerta={alerta} />}
          <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
            <div className='my-5'>
              <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>Nuevo Password</label>
              <input type="password" placeholder='Escribe tu Nuevo Password' className='w-full mt-3 p-3 border rounded-xl bg-gray-100' id='password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Guardar Nuevo Password" className='bg-sky-700 w-full mb-5 py-3 uppercase font-bold rounded text-white hover:cursor-pointer hover:bg-sky-800 transition-colors' />
          </form>
        </>

      ) : <Alerta alerta={alerta} />}
      {passwordValido && (
        <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>Inicia Sesion</Link>
      )}
    </>
  )
}

export default NuevoPassword