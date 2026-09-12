import { useState } from "react";
import toast from "react-hot-toast";

function ModalTrabajo({ trabajo, cerrar, guardarGastos }) {
    const [concepto, setConcepto] = useState("");
    const [valor, setValor] = useState("");
    const [gastos, setGastos] = useState(trabajo.gastos || []);
    const [gastoEditando, setGastoEditando] = useState(null);
    const [abono, setAbono] = useState("");
    const [abonos, setAbonos] = useState(trabajo.abonos || []);
    const [abonoEditando, setAbonoEditando] = useState(null);



    function agregarGasto() {

        if (!concepto || !valor) {
            return;
        }

        const valorGasto = Number(valor);

        const totalActualSinGastoEditado =
            gastoEditando !== null
                ? totalGastos - Number(gastos[gastoEditando].valor)
                : totalGastos;

        if (totalActualSinGastoEditado + valorGasto > trabajo.valorVenta) {
            toast.error("Los gastos no pueden superar el valor de venta.");
            return;
        }

        if (gastoEditando !== null) {

            const nuevosGastos = gastos.map((gasto, index) => {

                if (index === gastoEditando) {
                    return {
                        ...gasto,
                        concepto,
                        valor: Number(valor)
                    };
                }

                return gasto;
            });

            setGastos(nuevosGastos);
            setGastoEditando(null);

        } else {

            const nuevoGasto = {
                concepto,
                valor: Number(valor)
            };

            setGastos([...gastos, nuevoGasto]);
        }

        setConcepto("");
        setValor("");
    }


    function agregarAbono() {

        if (!abono || Number(abono) <= 0) {
            return;
        }

        const valorAbono = Number(abono);

        const totalActualSinAbonoEditado =
            abonoEditando !== null
                ? totalAbonos - Number(abonos[abonoEditando].valor)
                : totalAbonos;

        if (
            totalActualSinAbonoEditado + valorAbono >
            trabajo.valorVenta
        ) {
            toast.error(
                "Los abonos no pueden superar el valor de venta."
            );
            return;
        }

        if (abonoEditando !== null) {

            const nuevosAbonos = abonos.map((item, index) => {

                if (index === abonoEditando) {
                    return {
                        ...item,
                        valor: valorAbono
                    };
                }

                return item;
            });

            setAbonos(nuevosAbonos);
            setAbonoEditando(null);

        } else {

            const nuevoAbono = {
                valor: valorAbono
            };

            setAbonos([...abonos, nuevoAbono]);
        }

        setAbono("");
    }

    function editarAbono(index) {

        const abonoSeleccionado = abonos[index];

        setAbono(abonoSeleccionado.valor);
        setAbonoEditando(index);
    }

    function eliminarAbono(index) {

        const nuevosAbonos = abonos.filter(
            (_, i) => i !== index
        );

        setAbonos(nuevosAbonos);
    }

    function editarGasto(index) {

        const gasto = gastos[index];

        setConcepto(gasto.concepto);
        setValor(gasto.valor);
        setGastoEditando(index);
    }

    function eliminarGasto(index) {

        const nuevosGastos = gastos.filter(
            (_, i) => i !== index
        );

        setGastos(nuevosGastos);
    }

    async function guardarCambios() {
        await guardarGastos(trabajo._id, gastos, abonos);
    }

    const totalAbonos = abonos.reduce(
        (total, item) => total + Number(item.valor),
        0
    );

    const saldoPendiente =
        trabajo.valorVenta - totalAbonos;

    const ganancia =
        trabajo.valorVenta - totalGastos;

    const totalGastos = gastos.reduce(
        (total, gasto) => total + Number(gasto.valor),
        0
    );

    const disponibleParaGastos =
        trabajo.valorVenta - totalGastos;


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
                                    {gastoEditando !== null
                                        ? "Guardar cambio"
                                        : "Agregar gasto"}
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
                                                    className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3 gap-3"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-gray-700 truncate">
                                                            {gasto.concepto}
                                                        </p>

                                                        <p className="font-medium text-gray-900">
                                                            ${gasto.valor.toLocaleString("es-CO")}
                                                        </p>

                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Disponible para gastos: $
                                                        {disponibleParaGastos.toLocaleString("es-CO")}
                                                    </p>

                                                    <div className="flex gap-2 shrink-0">

                                                        <button
                                                            type="button"
                                                            onClick={() => editarGasto(index)}
                                                            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                                        >
                                                            ✏️
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => eliminarGasto(index)}
                                                            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                                        >
                                                            🗑️
                                                        </button>

                                                    </div>
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



                                        <div className="border-t border-gray-200 mt-8 pt-6">

                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Abonos del cliente
                                            </h3>

                                            <div className="mt-4 space-y-4">

                                                <div>
                                                    <label className="block mb-1 text-sm font-medium">
                                                        Valor del abono
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max={trabajo.valorVenta - (totalAbonos - (abonoEditando !== null ? Number(abonos[abonoEditando]?.valor || 0) : 0))}
                                                        placeholder="Ej: 1000000"
                                                        value={abono}
                                                        onChange={(e) => setAbono(e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                                    />
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={agregarAbono}
                                                    className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                                                >
                                                    {abonoEditando !== null
                                                        ? "Guardar cambio"
                                                        : "Agregar abono"}
                                                </button>

                                                {abonos.length > 0 && (
                                                    <div className="mt-6">

                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            Abonos registrados
                                                        </h3>

                                                        <div className="mt-4 space-y-2">

                                                            {abonos.map((item, index) => (

                                                                <div
                                                                    key={index}
                                                                    className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3 gap-3"
                                                                >

                                                                    <span className="font-medium text-gray-900">
                                                                        ${item.valor.toLocaleString("es-CO")}
                                                                    </span>

                                                                    <div className="flex gap-2">

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => editarAbono(index)}
                                                                            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            ✏️
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => eliminarAbono(index)}
                                                                            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            🗑️
                                                                        </button>

                                                                    </div>

                                                                </div>

                                                            ))}

                                                        </div>

                                                    </div>
                                                )}

                                                <div className="border-t border-gray-200 mt-8 pt-6 space-y-3">

                                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                        Resumen financiero
                                                    </h3>

                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Valor de venta
                                                        </span>

                                                        <span className="font-semibold">
                                                            ${trabajo.valorVenta.toLocaleString("es-CO")}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Total abonado
                                                        </span>

                                                        <span className="font-semibold">
                                                            ${totalAbonos.toLocaleString("es-CO")}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Saldo pendiente
                                                        </span>

                                                        <span className="font-semibold">
                                                            ${saldoPendiente.toLocaleString("es-CO")}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Total gastos
                                                        </span>

                                                        <span className="font-semibold">
                                                            ${totalGastos.toLocaleString("es-CO")}
                                                        </span>
                                                    </div>

                                                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                                                        <span className="font-bold">
                                                            Ganancia
                                                        </span>

                                                        <span className="font-bold">
                                                            ${ganancia.toLocaleString("es-CO")}
                                                        </span>
                                                    </div>

                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={guardarCambios}
                                                    className="w-full mt-6 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                                                >
                                                    Guardar cambios
                                                </button>

                                            </div>

                                        </div>

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