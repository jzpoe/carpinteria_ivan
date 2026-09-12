import { useEffect, useState } from "react";
import { Pencil, Trash2, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { obtenerInventario } from "../api/inventario.api";
import ModalInventario from "../components/modales/ModalInventario";

function InventarioPage() {

    const [inventario, setInventario] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [modalInventario, setModalInventario] = useState(false);

    useEffect(() => {
        cargarInventario();
    }, []);

    async function cargarInventario() {
        try {
            const data = await obtenerInventario();

            setInventario(data.inventario);

        } catch (error) {
            console.error(error);
        }
    }


    const inventarioFiltrado = inventario.filter((item) =>
        `${item.nombre} ${item.categoria} ${item.unidad}`
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (
        <>


            <main className="p-4 pt-20 md:p-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Inventario
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Administra los materiales y existencias de la carpintería
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Artículos
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-900">
                            {inventario.length}
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Existencias
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-900">
                            {inventario.reduce(
                                (total, item) => total + Number(item.cantidad),
                                0
                            )}
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Valor inventario
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-900">
                            $
                            {inventario
                                .reduce(
                                    (total, item) =>
                                        total +
                                        Number(item.cantidad) *
                                        Number(item.costoUnitario),
                                    0
                                )
                                .toLocaleString("es-CO")}
                        </p>
                    </div>

                </div>
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                    <div className="px-5 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Materiales
                            </h2>

                            <p className="text-sm text-gray-500">
                                Consulta y administra las existencias
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">

                            <input
                                type="text"
                                placeholder="Buscar material..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-full sm:w-64 px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />

                            <button
                                type="button"
                                onClick={() => setModalInventario(true)}
                                className="px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer"
                            >
                                + Nuevo material
                            </button>

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-600">
                                        Material
                                    </th>

                                    <th className="text-left px-5 py-3 font-semibold text-gray-600">
                                        Categoría
                                    </th>

                                    <th className="text-right px-5 py-3 font-semibold text-gray-600">
                                        Cantidad
                                    </th>

                                    <th className="text-left px-5 py-3 font-semibold text-gray-600">
                                        Unidad
                                    </th>

                                    <th className="text-right px-5 py-3 font-semibold text-gray-600">
                                        Costo unitario
                                    </th>

                                    <th className="text-right px-5 py-3 font-semibold text-gray-600">
                                        Valor
                                    </th>

                                    <th className="text-center px-5 py-3 font-semibold text-gray-600">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {inventarioFiltrado.map((item) => (

                                    <tr key={item._id} className="hover:bg-gray-50">

                                        <td className="px-5 py-4 font-medium text-gray-900">
                                            {item.nombre}
                                        </td>

                                        <td className="px-5 py-4 text-gray-600">
                                            {item.categoria}
                                        </td>

                                        <td className="px-5 py-4 text-right font-medium">
                                            {item.cantidad}
                                        </td>

                                        <td className="px-5 py-4 text-gray-600">
                                            {item.unidad}
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            ${Number(item.costoUnitario).toLocaleString("es-CO")}
                                        </td>

                                        <td className="px-5 py-4 text-right font-medium">
                                            $
                                            {(
                                                Number(item.cantidad) *
                                                Number(item.costoUnitario)
                                            ).toLocaleString("es-CO")}
                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex justify-center gap-2">

                                                <button
                                                    type="button"
                                                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer"
                                                    title="Editar"
                                                >
                                                    <Pencil size={18} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="p-2 rounded-lg hover:bg-red-100 text-red-600 cursor-pointer"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="p-2 rounded-lg hover:bg-green-100 text-green-600 cursor-pointer"
                                                    title="Registrar entrada"
                                                >
                                                    <ArrowDownToLine size={18} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="p-2 rounded-lg hover:bg-orange-100 text-orange-600 cursor-pointer"
                                                    title="Registrar salida"
                                                >
                                                    <ArrowUpFromLine size={18} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                </div>

                {modalInventario && (
                    <ModalInventario
                        cerrar={() => setModalInventario(false)}
                        cargarInventario={cargarInventario}
                    />
                )}




            </main>
        </>
    );

}

export default InventarioPage;