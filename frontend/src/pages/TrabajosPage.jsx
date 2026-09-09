import { useEffect, useState } from "react";
import ModalTrabajo from "../components/modales/ModalTrabajo";
import { actualizarTrabajo, obtenerTrabajos } from "../api/trabajos.api";
import { Pencil, Trash2, Eye } from "lucide-react";


function TrabajosPage() {
    const [trabajos, setTrabajos] = useState([]);
    const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);

    useEffect(() => {
        cargarTrabajos();
    }, []);

    async function cargarTrabajos() {
        try {
            const respuesta = await obtenerTrabajos();

            console.log("TRABAJOS:", respuesta.trabajos);

            setTrabajos(respuesta.trabajos);
        } catch (error) {
            console.error(error);
        }
    }

    async function guardarGastos(id, gastos) {
        try {
            await actualizarTrabajo(id, { gastos });

            await cargarTrabajos();

            setTrabajoSeleccionado(null);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {trabajoSeleccionado && (
                <ModalTrabajo
                    trabajo={trabajoSeleccionado}
                    cerrar={() => setTrabajoSeleccionado(null)}
                    guardarGastos={guardarGastos}
                />
            )}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Trabajos
                    </h1>

                    <p className="text-gray-600 mt-1">
                        Trabajos aceptados y seguimiento de gastos
                    </p>
                </div>

                <button
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                    + Nuevo trabajo
                </button>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                                Gastos
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Ganancia
                            </th>

                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                Acciones
                            </th>
                        </tr>
                    </thead>


                    <tbody>
                        {trabajos.map((trabajo) => (
                            <tr
                                key={trabajo._id}
                                className="border-t border-gray-100 hover:bg-gray-50"
                            >

                                <td className="px-6 py-4 font-medium text-gray-900">
                                   {trabajo.cliente?.nombre || "Cliente no disponible"}   


                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {trabajo.mueble}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    ${trabajo.valorVenta.toLocaleString("es-CO")}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    ${trabajo.gastos
                                        .reduce((total, gasto) => total + gasto.valor, 0)
                                        .toLocaleString("es-CO")}
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900">
                                    ${(
                                        trabajo.valorVenta -
                                        trabajo.gastos.reduce(
                                            (total, gasto) => total + gasto.valor,
                                            0
                                        )
                                    ).toLocaleString("es-CO")}
                                </td>



                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">

                                        <button
                                            onClick={() => setTrabajoSeleccionado(trabajo)}
                                            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                            title="Ver trabajo"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                            title="Editar trabajo"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                            title="Eliminar trabajo"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default TrabajosPage;