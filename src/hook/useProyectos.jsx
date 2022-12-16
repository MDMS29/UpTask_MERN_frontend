import { useContext } from "react";
import ProyectosContext from "../context/ProyectoProvider";

const useProyectos = () => {
    //Extrae los datos.
    //Extrae lo que se encuentra dentro del "value" del provider.
    return useContext(ProyectosContext)
}

export default useProyectos;
