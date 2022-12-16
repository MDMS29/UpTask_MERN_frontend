import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const autenticarUsuario = async () => {
            //Se extrae el JWT para aprobar el inicio de sesion.
            const token = localStorage.getItem('token')

            if (!token) {
                setCargando(false)
                return
            }

            //Bearer token y lo revisa en el checkout del backend.
            const config = {
                headers: {
                    "Content-Type": "apllication/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
                //Siempre que haya un token al iniciar, redireccionara a la pag principal.
                navigate('/proyectos')
            } catch (error) {
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth, cargando, cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext