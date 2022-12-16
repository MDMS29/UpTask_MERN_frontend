import { useEffect } from 'react'
import useProyectos from '../hook/useProyectos'
import PreviewProyecto from '../components/PreviewProyecto'

const Proyectos = () => {

  const { proyectos } = useProyectos()


  return (
    <div>
      <h1 className='text-4xl font-black uppercase'>Proyectos</h1>
      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
          : <p className='text-center text-gray-600 uppercase'>No hay proyectos aun</p>}
      </div>
    </div>
  )
}

export default Proyectos