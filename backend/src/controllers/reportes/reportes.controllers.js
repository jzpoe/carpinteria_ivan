import Trabajo from "../../models/trabajo.models.js";
import Venta from "../../models/venta.models.js";

export const obtenerGanancias = async (req, res) => {
    try {

        const { periodo = "dia" } = req.query;

        let formatoFecha;

        if (periodo === "dia") {
            formatoFecha = "%Y-%m-%d";
        } else if (periodo === "mes") {
            formatoFecha = "%Y-%m";
        } else if (periodo === "año") {
            formatoFecha = "%Y";
        } else {
            return res.status(400).json({
                ok: false,
                message: "El periodo debe ser dia, mes o año"
            });
        }


        // =========================
        // VENTAS DIRECTAS
        // =========================

        const ventasDirectas = await Venta.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: formatoFecha,
                            date: "$createdAt"
                        }
                    },
                    totalVentasDirectas: {
                        $sum: "$valor"
                    }
                }
            }
        ]);


        // =========================
        // TRABAJOS
        // =========================

        const trabajos = await Trabajo.aggregate([
            {
                $project: {
                    createdAt: 1,
                    valorVenta: 1,
                    totalGastos: {
                        $sum: "$gastos.valor"
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: formatoFecha,
                            date: "$createdAt"
                        }
                    },
                    totalVentas: {
                        $sum: "$valorVenta"
                    },
                    totalGastos: {
                        $sum: "$totalGastos"
                    },
                    cantidadTrabajos: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    fecha: "$_id",
                    totalVentas: 1,
                    totalGastos: 1,
                    cantidadTrabajos: 1,
                    ganancia: {
                        $subtract: ["$totalVentas", "$totalGastos"]
                    }
                }
            }
        ]);


        // =========================
        // UNIFICAR REPORTES
        // =========================

        const reportes = {};


        // Agregar trabajos al reporte

        trabajos.forEach((trabajo) => {

            reportes[trabajo.fecha] = {
                totalTrabajos: trabajo.totalVentas,
                cantidadTrabajos: trabajo.cantidadTrabajos,
                totalGastos: trabajo.totalGastos,
                ganancia: trabajo.ganancia,
                totalVentasDirectas: 0
            };

        });


        // Agregar ventas directas al reporte

        ventasDirectas.forEach((venta) => {

            if (!reportes[venta._id]) {

                reportes[venta._id] = {
                    totalTrabajos: 0,
                    cantidadTrabajos: 0,
                    totalGastos: 0,
                    ganancia: 0,
                    totalVentasDirectas: 0
                };

            }

            reportes[venta._id].totalVentasDirectas =
                venta.totalVentasDirectas;

        });


        // =========================
        // CALCULAR RESULTADO FINAL
        // =========================

        const resultado = Object.entries(reportes).map(
            ([fecha, datos]) => {

                const totalVentas =
                    datos.totalTrabajos +
                    datos.totalVentasDirectas;

                const ganancia =
                    totalVentas -
                    datos.totalGastos;

                return {
                    fecha,
                    cantidadTrabajos: datos.cantidadTrabajos,
                    totalTrabajos: datos.totalTrabajos,
                    totalVentasDirectas: datos.totalVentasDirectas,
                    totalVentas,
                    totalGastos: datos.totalGastos,
                    ganancia
                };

            }
        );


        // =========================
        // RESPUESTA
        // =========================

        return res.status(200).json({
            ok: true,
            periodo,
            reportes: resultado
        });


    } catch (error) {

        return res.status(400).json({
            ok: false,
            message: error.message
        });

    }
};