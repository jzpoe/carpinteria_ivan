import { useState } from "react";

function ModalTrabajo({ trabajo, cerrar, guardarGastos }) {
    const [concepto, setConcepto] = useState("");
    const [valor, setValor] = useState("");
    const [gastos, setGastos] = useState(trabajo.gastos || []);


    function agregarGasto() {

        if (!concepto || !valor) {
            return;
        }

        const nuevoGasto = {
            concepto,
            valor: Number(valor)
        };

        const nuevosGastos = [...gastos, nuevoGasto];

        setGastos(nuevosGastos);

        setConcepto("");
        setValor("");
    }

    async function guardarCambios() {
        await guardarGastos(trabajo._id, gastos);
    }


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

    <div className="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        Detalle del trabajo
                    </h2>

                    <button
                        onClick={cerrar}
                        className="text-gray-500 hover:text-gray-900 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-6 space-y-4">

                    <div>
                        <p className="text-sm text-gray-500">
                            Cliente
                        </p>

                        <p className="font-medium text-gray-900">
                            {trabajo.cliente.nombre}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Mueble
                        </p>

                        <p className="font-medium text-gray-900">
                            {trabajo.mueble}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Valor de venta
                        </p>



                        <p className="font-medium text-gray-900">
                            ${trabajo.valorVenta.toLocaleString("es-CO")}
                        </p>
                        <div className="border-t border-gray-200 pt-6 mt-6">

                            <h3 className="text-lg font-semibold text-gray-900">
                                Agregar gasto
                            </h3>

                            <div className="mt-4 space-y-4">

                                <div>
                                    <label className="block mb-1 text-sm font-medium">
                                        Concepto
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Ej: Madera"
                                        value={concepto}
                                        onChange={(e) => setConcepto(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">
                                        Valor
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="Ej: 1500000"
                                        value={valor}
                                        onChange={(e) => setValor(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={agregarGasto}
                                    className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                                >
                                    Agregar gasto
                                </button>
                                {gastos.length > 0 && (
                                    <div className="mt-6">

                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Gastos registrados
                                        </h3>

                                        <div className="mt-4 space-y-2">

                                            {gastos.map((gasto, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3"
                                                >
                                                    <span className="text-gray-700">
                                                        {gasto.concepto}
                                                    </span>

                                                    <span className="font-medium text-gray-900">
                                                        ${gasto.valor.toLocaleString("es-CO")}
                                                    </span>
                                                </div>
                                            ))}

                                        </div>
                                        {gastos.length > 0 && (
                                            <div className="border-t border-gray-200 mt-6 pt-4 flex justify-between">
                                                <span className="font-semibold">
                                                    Total gastos
                                                </span>

                                                <span className="font-bold">
                                                    $
                                                    {gastos
                                                        .reduce((total, gasto) => total + gasto.valor, 0)
                                                        .toLocaleString("es-CO")}
                                                </span>
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            onClick={guardarCambios}
                                            className="w-full mt-6 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                                        >
                                            Guardar gastos
                                        </button>

                                    </div>
                                )}

                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ModalTrabajo;