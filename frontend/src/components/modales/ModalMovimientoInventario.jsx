import { useState } from "react";
import { registrarEntrada, registrarSalida } from "../../api/inventario.api";
import toast from "react-hot-toast";

function ModalMovimientoInventario({
    cerrar,
    tipo,
    inventario,
    cargarInventario
}) {

    const [cantidad, setCantidad] = useState("");

    const guardarMovimiento = async () => {
        if (!cantidad || Number(cantidad) <= 0) {
            toast.error("Ingresa una cantidad válida");
            return;
        }

        try {
            if (tipo === "Entrada") {
                await registrarEntrada(
                    inventario._id,
                    Number(cantidad)
                );

                toast.success("Entrada registrada correctamente");
            } else {
                await registrarSalida(
                    inventario._id,
                    Number(cantidad)
                );

                toast.success("Salida registrada correctamente");
            }

            await cargarInventario();

            cerrar();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "No se pudo registrar el movimiento"
            );
        }
    };


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white w-full max-w-md rounded-xl shadow-xl">

                <div className="px-6 py-4 border-b border-gray-200">

                    <h2 className="text-xl font-semibold text-gray-900">
                        {tipo === "Entrada"
                            ? "Registrar entrada"
                            : "Registrar salida"}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {inventario?.nombre}
                    </p>

                </div>

                <div className="p-6">

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cantidad
                    </label>

                    <input
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        placeholder="Ej: 10"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />

                    <p className="text-sm text-gray-500 mt-2">
                        Existencia actual:{" "}
                        <strong>
                            {inventario?.cantidad} {inventario?.unidad}
                        </strong>
                    </p>

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
                        onClick={guardarMovimiento}
                        className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                    >
                        Guardar
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ModalMovimientoInventario;