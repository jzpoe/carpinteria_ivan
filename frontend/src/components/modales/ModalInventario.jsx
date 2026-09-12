import { useState } from "react";
import { crearInventario } from "../../api/inventario.api";
import toast from "react-hot-toast";

function ModalInventario({ cerrar, cargarInventario }) {
    const [formulario, setFormulario] = useState({
        nombre: "",
        categoria: "",
        cantidad: "",
        unidad: "",
        costoUnitario: ""
    });

    const guardarInventario = async () => {
        try {

            await crearInventario({
                ...formulario,
                cantidad: Number(formulario.cantidad),
                costoUnitario: Number(formulario.costoUnitario)
            });

            toast.success("Material agregado correctamente");

            await cargarInventario();

            cerrar();

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "No se pudo guardar el material"
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">

                {/* Encabezado */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

                    <h2 className="text-xl font-semibold text-gray-900">
                        Nuevo material
                    </h2>

                    <button
                        type="button"
                        onClick={cerrar}
                        className="text-gray-500 hover:text-gray-900 text-2xl cursor-pointer"
                    >
                        ×
                    </button>

                </div>

                {/* Contenido */}
                <div className="p-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre del material
                            </label>

                            <input
                                type="text"
                                placeholder="Ej: Tornillo 2 pulgadas"
                                value={formulario.nombre}
                                onChange={(e) =>
                                    setFormulario({
                                        ...formulario,
                                        nombre: e.target.value
                                    })
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoría
                            </label>



                            <input
                                type="text"
                                placeholder="Ej: Ferretería"
                                value={formulario.categoria}
                                onChange={(e) =>
                                    setFormulario({
                                        ...formulario,
                                        categoria: e.target.value
                                    })
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cantidad inicial
                            </label>

                            <input
                                type="text"
                                placeholder="Ej: 100"
                                value={formulario.cantidad}
                                onChange={(e) =>
                                    setFormulario({
                                        ...formulario,
                                        cantidad: e.target.value
                                    })
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Unidad
                            </label>

                            <input
                                type="text"
                                placeholder="Ej: unidades, metros, litros"
                                value={formulario.unidad}
                                onChange={(e) =>
                                    setFormulario({
                                        ...formulario,
                                        unidad: e.target.value
                                    })
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Costo unitario
                            </label>

                            <input
                                type="text"
                                placeholder="Ej: 15000"
                                value={formulario.costoUnitario}
                                onChange={(e) =>
                                    setFormulario({
                                        ...formulario,
                                        costoUnitario: e.target.value
                                    })
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>

                    </div>

                </div>

                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">

                    <button
                        type="button"
                        onClick={cerrar}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={guardarInventario}
                        className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                    >
                        Guardar
                    </button>

                </div>


            </div>

        </div>
    );
}

export default ModalInventario;