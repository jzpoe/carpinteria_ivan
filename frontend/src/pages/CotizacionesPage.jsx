import { useEffect, useState } from "react";
import { obtenerCotizaciones, eliminarCotizacion, aceptarCotizacion, } from "../api/cotizacionApi";
import toast from "react-hot-toast";
import { Eye, Pencil, Trash2, CheckCircle } from "lucide-react";
import ModalConfirmacion from "../components/modales/ModalConfirmacion";
import ModalCotizacion from "../components/modales/ModalCotizacion";
import { generarCotizacionPDF } from "../utils/generarCotizacionPDF";
import ModalDetalleCotizacion from "../components/modales/ModalDetalleCotizacion";
import ModalTrabajo from "../components/modales/ModalTrabajo";
import { actualizarTrabajo, obtenerTrabajos } from "../api/trabajos.api";

function CotizacionesPage({ cerrarModal, cargarClientes }) {
    const [cotizaciones, setCotizaciones] = useState([]);
    const [modalConfirmacion, setModalConfirmacion] = useState(false);
    const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState(null);
    const [cotizacionEditar, setCotizacionEditar] = useState(null);
    const [cotizacionVer, setCotizacionVer] = useState(null);
    const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);
    const [trabajos, setTrabajos] = useState([]);
    const [busqueda, setBusqueda] = useState("");



    async function cargarCotizaciones() {
        try {
            const respuesta = await obtenerCotizaciones();


            setCotizaciones(respuesta.cotizaciones);
            console.log("COTIZACIONES:", respuesta.cotizaciones);
        } catch (error) {
            console.error(error);
        }
    }

    async function cargarTrabajos() {
        try {
            const respuesta = await obtenerTrabajos();

            setTrabajos(respuesta.trabajos);

        } catch (error) {
            console.error(error);
        }
    }




    useEffect(() => {
        cargarCotizaciones();
        cargarTrabajos();
    }, []);

    async function aceptarCotizacionSeleccionada(id) {
        try {
            const respuesta = await aceptarCotizacion(id);


            toast.success("¡Cotización aceptada y trabajo creado!");

            await cargarCotizaciones();
            await cargarTrabajos();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "No se pudo aceptar la cotización"
            );
        }
    }

    async function borrarCotizacion(id) {
        try {
            await eliminarCotizacion(id);

            toast.success("Cotización eliminada con éxito");

            setModalConfirmacion(false);

            await cargarCotizaciones();

        } catch (error) {
            console.error(error);

            toast.error("No se pudo eliminar la cotización");
        }
    }

    function obtenerDatosTrabajo(cotizacion) {

        const trabajo = trabajos.find(
            (trabajo) =>
                String(trabajo.cotizacion?._id || trabajo.cotizacion) ===
                String(cotizacion._id)
        );

        if (!trabajo) {
            return {
                gastos: 0,
                ganancia: 0,
                abonado: 0,
                saldo: 0
            };
        }

        const totalGastos = (trabajo.gastos || []).reduce(
            (total, gasto) => total + Number(gasto.valor),
            0
        );

        const totalAbonado = (trabajo.abonos || []).reduce(
            (total, abono) => total + Number(abono.valor),
            0
        );

        const ganancia = trabajo.valorVenta - totalGastos;

        const saldo = trabajo.valorVenta - totalAbonado;

        return {
            gastos: totalGastos,
            ganancia,
            abonado: totalAbonado,
            saldo
        };
    }

    const cotizacionesFiltradas = cotizaciones.filter((cotizacion) =>
        `${cotizacion.cliente?.nombre || ""} ${cotizacion.nombreMueble} ${cotizacion.estado}`
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );


    return (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="px-6 py-5 border-b border-gray-100">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    Cotizaciones
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Consulta y administra las cotizaciones de tus clientes
                </p>
            </div>

            <div className="px-6 py-4 bg-gray-50">
                <input
                    type="text"
                    placeholder="Buscar por cliente, mueble o estado..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full md:max-w-md px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
            </div>


            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">

                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Cliente
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Mueble
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Valor venta
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Abonado
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Saldo
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Gastos
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Ganancia
                            </th>


                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                Acciones
                            </th>

                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                Estado
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {cotizacionesFiltradas.map((cotizacion) => {
                            const datosTrabajo = obtenerDatosTrabajo(cotizacion);
                            return (
                                <tr
                                    key={cotizacion._id}
                                    className="border-t border-gray-100 hover:bg-gray-50"
                                >

                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {cotizacion.cliente?.nombre || "Cliente no disponible"}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {cotizacion.nombreMueble}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        ${cotizacion.valor.toLocaleString("es-CO")}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {cotizacion.estado === "Aceptada"
                                            ? `$${datosTrabajo.abonado.toLocaleString("es-CO")}`
                                            : "-"}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {cotizacion.estado === "Aceptada"
                                            ? `$${datosTrabajo.saldo.toLocaleString("es-CO")}`
                                            : "-"}
                                    </td>


                                    <td className="px-6 py-4 text-gray-600">
                                        {(() => {

                                            const trabajo = trabajos.find(
                                                (trabajo) =>
                                                    String(trabajo.cotizacion?._id || trabajo.cotizacion) ===
                                                    String(cotizacion._id)
                                            );

                                            if (!trabajo) {
                                                return "-";
                                            }

                                            const totalGastos = (trabajo.gastos || []).reduce(
                                                (total, gasto) => total + gasto.valor,
                                                0
                                            );

                                            return `$${totalGastos.toLocaleString("es-CO")}`;

                                        })()}
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        {(() => {

                                            const trabajo = trabajos.find(
                                                (trabajo) =>
                                                    String(trabajo.cotizacion?._id || trabajo.cotizacion) ===
                                                    String(cotizacion._id)
                                            );

                                            if (!trabajo) {
                                                return "-";
                                            }

                                            const totalGastos = (trabajo.gastos || []).reduce(
                                                (total, gasto) => total + gasto.valor,
                                                0
                                            );

                                            const ganancia = trabajo.valorVenta - totalGastos;

                                            return `$${ganancia.toLocaleString("es-CO")}`;

                                        })()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">

                                            {cotizacion.estado === "Pendiente" && (
                                                <>
                                                    <button
                                                        onClick={() => aceptarCotizacionSeleccionada(cotizacion._id)}
                                                        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                        title="Aceptar cotización"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>

                                                    <button
                                                        onClick={() => setCotizacionEditar(cotizacion)}
                                                        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                        title="Editar cotización"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                </>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setCotizacionSeleccionada(cotizacion);
                                                    setModalConfirmacion(true);
                                                }}
                                                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                title="Eliminar cotización"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                            <button
                                                onClick={() => setCotizacionVer(cotizacion)}
                                                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                title="Ver cotización"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {cotizacion.estado === "Aceptada" && (
                                                <button
                                                    onClick={() => {

                                                        const trabajo = trabajos.find(
                                                            (trabajo) =>
                                                                String(trabajo.cotizacion?._id || trabajo.cotizacion) ===
                                                                String(cotizacion._id)
                                                        );

                                                        if (!trabajo) {
                                                            toast.error("No se encontró el trabajo asociado.");
                                                            return;
                                                        }

                                                        setTrabajoSeleccionado(trabajo);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                    title="Gestionar gastos"
                                                >
                                                    💰
                                                </button>
                                            )}

                                            <button
                                                onClick={() =>
                                                    generarCotizacionPDF(cotizacion)
                                                }
                                                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                title="Generar PDF"
                                            >
                                                📄
                                            </button>

                                        </div>

                                    </td>
                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${cotizacion.estado === "Aceptada"
                                                ? "bg-green-100 text-green-700"
                                                : cotizacion.estado === "Rechazada"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {cotizacion.estado}
                                        </span>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>

                </table>

            </div>

            <div className="md:hidden mt-6 space-y-4">

                {cotizaciones.map((cotizacion) => {

                    const datosTrabajo = obtenerDatosTrabajo(cotizacion);

                    return (
                        <div
                            key={cotizacion._id}
                            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                        >

                            {/* Encabezado */}
                            <div className="flex justify-between items-start gap-3">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Cliente
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {cotizacion.cliente?.nombre || "Cliente no disponible"}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${cotizacion.estado === "Aceptada"
                                        ? "bg-green-100 text-green-700"
                                        : cotizacion.estado === "Rechazada"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {cotizacion.estado}
                                </span>

                            </div>


                            {/* Mueble */}
                            <div className="border-t border-gray-100 mt-4 pt-4">

                                <p className="text-sm text-gray-500">
                                    Mueble
                                </p>

                                <p className="text-gray-900 font-medium">
                                    {cotizacion.nombreMueble}
                                </p>

                            </div>


                            {/* Valor venta */}
                            <div className="mt-4">

                                <p className="text-sm text-gray-500">
                                    Valor venta
                                </p>

                                <p className="text-gray-900 font-medium">
                                    ${cotizacion.valor.toLocaleString("es-CO")}
                                </p>



                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    Abonado
                                </p>
                                <td className="px-6 py-4 text-gray-600">
                                    {cotizacion.estado === "Aceptada"
                                        ? `$${datosTrabajo.abonado.toLocaleString("es-CO")}`
                                        : "-"}
                                </td>


                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    Saldo
                                </p>

                                <td className="px-6 py-4 text-gray-600">
                                    {cotizacion.estado === "Aceptada"
                                        ? `$${datosTrabajo.saldo.toLocaleString("es-CO")}`
                                        : "-"}
                                </td>

                            </div>


                            {/* Gastos */}
                            <div className="mt-4">

                                <p className="text-sm text-gray-500">
                                    Gastos
                                </p>

                                <p className="text-gray-900 font-medium">
                                    {cotizacion.estado === "Aceptada"
                                        ? `$${datosTrabajo.gastos.toLocaleString("es-CO")}`
                                        : "-"}
                                </p>

                            </div>


                            {/* Ganancia */}
                            <div className="mt-4">

                                <p className="text-sm text-gray-500">
                                    Ganancia
                                </p>

                                <p className="font-semibold text-gray-900">
                                    {cotizacion.estado === "Aceptada"
                                        ? `$${datosTrabajo.ganancia.toLocaleString("es-CO")}`
                                        : "-"}
                                </p>

                            </div>


                            {/* Acciones */}
                            <div className="border-t border-gray-100 mt-4 pt-4">

                                <p className="text-sm text-gray-500 mb-2">
                                    Acciones
                                </p>

                                <div className="flex gap-2">

                                    {/* Aceptar */}
                                    {cotizacion.estado === "Pendiente" && (
                                        <button
                                            onClick={() =>
                                                aceptarCotizacionSeleccionada(cotizacion._id)
                                            }
                                            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                            title="Aceptar cotización"
                                        >
                                            <CheckCircle size={18} />
                                        </button>
                                    )}


                                    {/* Editar */}
                                    {cotizacion.estado === "Pendiente" && (
                                        <button
                                            onClick={() =>
                                                setCotizacionEditar(cotizacion)
                                            }
                                            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                            title="Editar cotización"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                    )}


                                    {/* Eliminar */}
                                    {cotizacion.estado === "Pendiente" && (
                                        <button
                                            onClick={() => {
                                                setCotizacionSeleccionada(cotizacion);
                                                setModalConfirmacion(true);
                                            }}
                                            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                            title="Eliminar cotización"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}


                                    {/* Ver */}
                                    <button
                                        onClick={() =>
                                            setCotizacionVer(cotizacion)
                                        }
                                        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                        title="Ver cotización"
                                    >
                                        <Eye size={18} />
                                    </button>


                                    {/* Gastos */}
                                    {cotizacion.estado === "Aceptada" && (
                                        <button
                                            onClick={() => {

                                                const trabajo = trabajos.find(
                                                    (trabajo) =>
                                                        String(
                                                            trabajo.cotizacion?._id ||
                                                            trabajo.cotizacion
                                                        ) === String(cotizacion._id)
                                                );

                                                if (!trabajo) {
                                                    toast.error(
                                                        "No se encontró el trabajo asociado."
                                                    );
                                                    return;
                                                }

                                                setTrabajoSeleccionado(trabajo);
                                            }}
                                            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                            title="Gestionar gastos"
                                        >
                                            💰
                                        </button>
                                    )}


                                    {/* PDF */}
                                    <button
                                        onClick={() =>
                                            generarCotizacionPDF(cotizacion)
                                        }
                                        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                        title="Generar PDF"
                                    >
                                        📄
                                    </button>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>
            {modalConfirmacion && (
                <ModalConfirmacion
                    cerrar={() => setModalConfirmacion(false)}
                    confirmar={() => borrarCotizacion(cotizacionSeleccionada._id)}
                    mensaje={
                        cotizacionSeleccionada?.estado === "Aceptada"
                            ? "Esta cotización está aceptada. También se eliminarán el trabajo, gastos y abonos asociados. El cliente se conservará. Esta acción no se puede deshacer."
                            : "Esta acción eliminará la cotización. El cliente se conservará. Esta acción no se puede deshacer."
                    }
                />
            )}
            {cotizacionEditar && (
                <ModalCotizacion
                    cliente={cotizacionEditar.cliente}
                    cotizacionEditar={cotizacionEditar}
                    cerrarModal={() => setCotizacionEditar(null)}
                />
            )}

            {cotizacionVer && (
                <ModalDetalleCotizacion
                    cotizacion={cotizacionVer}
                    cerrar={() => setCotizacionVer(null)}
                />
            )}

            {trabajoSeleccionado && (
                <ModalTrabajo
                    trabajo={trabajoSeleccionado}
                    cerrar={() => setTrabajoSeleccionado(null)}

                    guardarGastos={async (id, gastos, abonos) => {

                        await actualizarTrabajo(id, {
                            gastos,
                            abonos
                        });

                        toast.success("Cambios guardados correctamente.");

                        await cargarTrabajos();

                        setTrabajoSeleccionado(null);
                    }}
                />
            )}




        </div>
    )

}

export default CotizacionesPage