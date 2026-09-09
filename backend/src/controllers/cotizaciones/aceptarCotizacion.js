
import Cotizacion from "../../models/cotizacion.model.js";
import Trabajo from "../../models/trabajo.models.js";

export const aceptarCotizacion = async (req, res) => {
    try {
        const { id } = req.params;

        const cotizacion = await Cotizacion
            .findById(id)
            .populate("cliente");

        if (!cotizacion) {
            return res.status(404).json({
                ok: false,
                message: "La cotización no existe"
            });
        }

        if (cotizacion.estado === "Aceptada") {
            return res.status(400).json({
                ok: false,
                message: "La cotización ya fue aceptada"
            });
        }

        if (cotizacion.estado === "Rechazada") {
            return res.status(400).json({
                ok: false,
                message: "La cotización fue rechazada"
            });
        }

        const nuevoTrabajo = new Trabajo({
            cotizacion: cotizacion._id,
            cliente: cotizacion.cliente._id,
            mueble: cotizacion.nombreMueble,
            valorVenta: cotizacion.valor,
            gastos: []
        });

        await nuevoTrabajo.save();

        cotizacion.estado = "Aceptada";

        await cotizacion.save();

        return res.status(201).json({
            ok: true,
            message: "Cotización aceptada y trabajo creado con éxito",
            trabajo: nuevoTrabajo,
            cotizacion
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};