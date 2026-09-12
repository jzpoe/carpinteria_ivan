import Cotizaciones from "../../models/cotizacion.model.js";
import Trabajo from "../../models/trabajo.models.js";

export const eliminarCotizacion = async (req, res) => {
    try {
        const { id } = req.params;

        const trabajo = await Trabajo.findOne({
            cotizacion: id
        });

        if (trabajo) {
            await Trabajo.findByIdAndDelete(trabajo._id);
        }

        const cotizacionEliminada =
            await Cotizaciones.findByIdAndDelete(id);

        if (!cotizacionEliminada) {
            return res.status(404).json({
                ok: false,
                message: "No existe la cotización"
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Cotización y trabajo asociado eliminados con éxito",
            cotizacionEliminada
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};