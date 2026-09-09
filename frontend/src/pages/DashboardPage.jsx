import { useEffect, useState } from "react";
import { obtenerReporteGanancias } from "../api/reportes.api";


function DashboardPage({ cerrarModal, cargarClientes }) {
    const [reportes, setReportes] = useState([]);
    const [periodo, setPeriodo] = useState("mes");

    const ventas = reportes[0]?.totalVentas || 0;
    const gastos = reportes[0]?.totalGastos || 0;
    const ganancia = reportes[0]?.ganancia || 0;

    const margenGanancia =
        ventas > 0
            ? (ganancia / ventas) * 100
            : 0;

    useEffect(() => {
        obtenerReporteGanancias(periodo)
            .then((data) => {
                setReportes(data.reportes);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [periodo]);




    return (
        <div className="w-full p-4 pt-20 md:p-8">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Resumen financiero de tu carpintería
                </p>
            </div>
            {/* Selector de periodo */}
            <div className="flex gap-2 mb-6 h-fit">
                <button
                    onClick={() => setPeriodo("dia")}
                    className={`px-4 py-2 rounded-lg cursor-pointer ${periodo === "dia"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                >
                    Día
                </button>

                <button
                    onClick={() => setPeriodo("mes")}
                    className={`px-4 py-2 rounded-lg cursor-pointer ${periodo === "mes"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                >
                    Mes
                </button>

                <button
                    onClick={() => setPeriodo("año")}
                    className={`px-4 py-2 rounded-lg cursor-pointer ${periodo === "año"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                >
                    Año
                </button>

            </div>


            {/* Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="bg-white rounded-xl p-5 shadow-sm h-fit">
                    <p className="text-sm text-gray-500">
                        Ventas
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">
                        ${reportes[0]?.totalVentas?.toLocaleString("es-CO") || 0}
                    </h2>
                </div>


                <div className="bg-white rounded-xl p-5 shadow-sm h-fit">
                    <p className="text-sm text-gray-500">
                        Gastos
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">
                        ${reportes[0]?.totalGastos?.toLocaleString("es-CO") || 0}
                    </h2>
                </div>


                <div className="bg-white rounded-xl p-5 shadow-sm h-fit">
                    <p className="text-sm text-gray-500">
                        Ganancia
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">
                        ${reportes[0]?.ganancia?.toLocaleString("es-CO") || 0}
                    </h2>
                </div>


                <div className="bg-white rounded-xl p-5 shadow-sm h-fit">
                    <p className="text-sm text-gray-500">
                        Trabajos
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">
                        {reportes[0]?.cantidadTrabajos || 0}
                    </h2>
                </div>

            </div>

        </div>
    );

}

export default DashboardPage