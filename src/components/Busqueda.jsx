import { Fragment, useState, useEffect } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import useProyectos from '../hook/useProyectos'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Busqueda = () => {
    const [busqueda, setBusqueda] = useState('')
    const [navegacion, setNavegacion] = useState('')
    const [navegacion2, setNavegacion2] = useState('')

    const navigate = useNavigate()

    //Navegacion segun el filtro de proyectos
    useEffect(() => {
        if (navegacion !== navegacion2) {
            setNavegacion2(navegacion)
            navigate(navegacion2)
            setNavegacion('')
            return
        }
    }, [navegacion])


    const { buscador, handleBuscador, proyectos } = useProyectos()

    const proyectosFiltrados = busqueda === '' ? [] : proyectos.filter(proyecto => proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()))

    return (
        <Transition.Root show={buscador} as={Fragment} afterLeave={() => setBusqueda('')}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20" onClose={handleBuscador}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Combobox
                        as="div"
                        className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"

                    >
                        <div className="relative">
                            <Combobox.Input
                                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                                placeholder="Buscar..."
                                onChange={e => setBusqueda(e.target.value)}
                            />
                        </div>

                        {proyectosFiltrados.length > 0 && (
                            <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                                {proyectosFiltrados.map(proyecto => (
                                    <Combobox.Options key={proyecto._id} value={proyecto} onClick={() => setNavegacion(`/proyectos/${proyecto._id}`)}
                                        className={({ active }) => classNames('cursor-default select-none px-4 py-2 hover:bg-sky-600 hover:text-white')}>

                                        {proyecto.nombre}
                                    </Combobox.Options>
                                ))}
                            </Combobox.Options>
                        )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}

export default Busqueda
