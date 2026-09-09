
import Cliente from "../../models/cliente.models.js";
import Cotizaciones from "../../models/cotizacion.model.js";

export const obtenerClientes = async (req, res) => {
    try {

        const clientes = await Cliente.find();

        if (clientes.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "No se han encontrado clientes",
            });
        }

        const clientesConEstado = await Promise.all(
            clientes.map(async (cliente) => {

                const cotizacion = await Cotizaciones.findOne({
                    cliente: cliente._id
                }).sort({ createdAt: -1 });

                let estadoCotizacion = "Sin cotización";

                if (cotizacion) {
                    estadoCotizacion = cotizacion.estado || "Pendiente";
                }

                return {
                    ...cliente.toObject(),
                    estadoCotizacion,
                    cotizacion: cotizacion || null
                };
            })
        );

        return res.status(200).json({
            ok: true,
            message: "Clientes obtenidos exitosamente",
            clientes: clientesConEstado
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};