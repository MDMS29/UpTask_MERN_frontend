import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    //Extrae los datos.
    //Extrae lo que se encuentra dentro del "value" del provider.
    return useContext(AuthContext)
}

export default useAuth