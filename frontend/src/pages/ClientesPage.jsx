import { useEffect, useState } from "react";
import ModalCliente from "../components/modales/ModalCliente";
import { eliminarCliente, obtenerClientes } from "../api/clienteApi";
import ModalCotizacion from "../components/modales/ModalCotizacion";
import { Eye, FilePlus, FilePlus2, FileText, Pencil, Trash2 } from "lucide-react";
import ModalConfirmacion from "../components/modales/ModalConfirmacion";
import ModalDetalleCotizacion from "../components/modales/ModalDetalleCotizacion";
import { generarCotizacionPDF } from "../utils/generarCotizacionPDF";

function ClientesPage() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [modalCotizacionAbierto, setModalCotizacionAbierto] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [modalConfirmacion, setModalConfirmacion] = useState(false);
    const [clienteEliminar, setClienteEliminar] = useState(null);
    const [clienteEditar, setClienteEditar] = useState(null);
    const [cotizacionVer, setCotizacionVer] = useState(null);
    const [cotizacionEditar, setCotizacionEditar] = useState(null);




    async function borrarCliente() {

        try {

            await eliminarCliente(clienteEliminar._id);

            setModalConfirmacion(false);
            setClienteEliminar(null);

            await cargarClientes();

        } catch (error) {

            console.error(error);

        }
    }



    function cerrarModal() {
        setModalAbierto(false)
    }

    useEffect(() => {
        cargarClientes();
    }, []);

    async function cargarClientes() {
        try {
            const respuesta = await obtenerClientes();
            console.log(respuesta.clientes);
            setClientes(respuesta.clientes);

        } catch (error) {
            console.error(error);
        }
    }



    return (
        <main className="flex-1 p-4 pt-20 md:p-8">
            <div className="flex justify-between items-center gap-3">
                <h1 className="text-xl md:text-2xl font-bold">
                    Clientes
                </h1>

                <button
                    onClick={() => {
                        setClienteEditar(null);
                        setModalAbierto(true);
                    }}
                    className="px-3 py-2 md:px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm md:text-base whitespace-nowrap"
                >
                    + Nuevo cliente
                </button>
            </div>
            <div className="mt-8 hidden md:block overflow-x-auto">
                <table className="w-full min-w-[700px]">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Cliente
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Teléfono
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Correo
                            </th>

                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                Acciones
                            </th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Estado
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map((cliente) => (
                            <tr
                                key={cliente._id}
                                className="border-t border-gray-100 hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {cliente.nombre}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {cliente.telefono}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {cliente.correo || "Sin correo"}
                                </td>

                                {/* Acciones */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-end items-center gap-2">

                                        {cliente.estadoCotizacion === "Sin cotización" ? (

                                            <button
                                                onClick={() => {
                                                    setCotizacionEditar(null);
                                                    setClienteSeleccionado(cliente);
                                                    setModalCotizacionAbierto(true);
                                                }}
                                                className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                                            >
                                                <FilePlus size={18} />
                                                Cotización
                                            </button>

                                        ) : (

                                            <>
                                                {/* Ver cotización */}
                                                <button
                                                    onClick={() =>
                                                        setCotizacionVer(cliente.cotizacion)
                                                    }
                                                    className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                    title="Ver cotización"
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                {/* Editar cotización */}
                                                {cliente.estadoCotizacion === "Pendiente" && (
                                                    <button
                                                        onClick={() => {
                                                            setCotizacionEditar(cliente.cotizacion);
                                                            setClienteSeleccionado(cliente);
                                                            setModalCotizacionAbierto(true);
                                                        }}
                                                        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                        title="Editar cotización"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                )}

                                                {/* Generar PDF */}
                                                <button
                                                    onClick={() =>
                                                        generarCotizacionPDF(cliente.cotizacion)
                                                    }
                                                    className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                    title="Generar PDF"
                                                >
                                                    <FileText size={18} />
                                                </button>
                                            </>

                                        )}

                                    </div>
                                </td>

                                {/* Estado */}
                                <td className="px-6 py-4">

                                    {cliente.estadoCotizacion === "Aceptada" && (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            Aceptada
                                        </span>
                                    )}

                                    {cliente.estadoCotizacion === "Pendiente" && (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                            Pendiente
                                        </span>
                                    )}

                                    {cliente.estadoCotizacion === "Rechazada" && (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                            Rechazada
                                        </span>
                                    )}

                                    {cliente.estadoCotizacion === "Sin cotización" && (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                            Sin cotización
                                        </span>
                                    )}

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>



                {modalCotizacionAbierto && clienteSeleccionado && (
                    <ModalCotizacion
                        cliente={clienteSeleccionado}
                        cerrarModal={() => {
                            setModalCotizacionAbierto(false);
                            setCotizacionEditar(null);
                            setClienteSeleccionado(null);
                        }}
                        cotizacionEditar={cotizacionEditar}
                        cargarClientes={cargarClientes}
                    />
                )}

            </div>

             <div className="mt-6 space-y-4 md:hidden">

                    {clientes.map((cliente) => (

                        <div
                            key={cliente._id}
                            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                        >

                            <div className="flex justify-between items-start">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Cliente
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {cliente.nombre}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${cliente.estadoCotizacion === "Aceptada"
                                            ? "bg-green-100 text-green-700"
                                            : cliente.estadoCotizacion === "Pendiente"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : cliente.estadoCotizacion === "Rechazada"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {cliente.estadoCotizacion}
                                </span>

                            </div>


                            <div className="border-t border-gray-100 mt-4 pt-4">

                                <p className="text-sm text-gray-500">
                                    Teléfono
                                </p>

                                <p className="text-gray-900">
                                    {cliente.telefono}
                                </p>

                            </div>


                            <div className="mt-3">

                                <p className="text-sm text-gray-500">
                                    Correo
                                </p>

                                <p className="text-gray-900">
                                    {cliente.correo || "Sin correo"}
                                </p>

                            </div>


                            <div className="border-t border-gray-100 mt-4 pt-4">

                                <p className="text-sm text-gray-500 mb-2">
                                    Acciones
                                </p>

                                <div className="flex gap-2">

                                    <div className="flex gap-2">

    {cliente.estadoCotizacion === "Sin cotización" ? (

        <button
            onClick={() => {
                setCotizacionEditar(null);
                setClienteSeleccionado(cliente);
                setModalCotizacionAbierto(true);
            }}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
        >
            <FilePlus size={18} />
            Cotización
        </button>

    ) : (

        <>

            {/* Ver cotización */}
            <button
                onClick={() =>
                    setCotizacionVer(cliente.cotizacion)
                }
                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                title="Ver cotización"
            >
                <Eye size={18} />
            </button>


            {/* Editar cotización */}
            {cliente.estadoCotizacion === "Pendiente" && (
                <button
                    onClick={() => {
                        setCotizacionEditar(cliente.cotizacion);
                        setClienteSeleccionado(cliente);
                        setModalCotizacionAbierto(true);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    title="Editar cotización"
                >
                    <Pencil size={18} />
                </button>
            )}


            {/* Generar PDF */}
            <button
                onClick={() =>
                    generarCotizacionPDF(cliente.cotizacion)
                }
                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                title="Generar PDF"
            >
                <FileText size={18} />
            </button>

        </>

    )}

</div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                    {modalConfirmacion && clienteEliminar && (
                        <ModalConfirmacion
                            cerrar={() => {
                                setModalConfirmacion(false);
                                setClienteEliminar(null);
                            }}
                            confirmar={borrarCliente}
                        />

                    )}
                        {cotizacionVer && (
                            <ModalDetalleCotizacion
                                cotizacion={cotizacionVer}
                                cerrar={() => setCotizacionVer(null)}
                            />
                        )}


        </main>
    )
}

export default ClientesPage