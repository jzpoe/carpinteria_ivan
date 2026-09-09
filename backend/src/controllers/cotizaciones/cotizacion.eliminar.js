import Cotizaciones from "../../models/cotizacion.model.js"


export const eliminarCotizacion = async (req, res) => {

    try {
        const { id } = req.params

        const cotizacionEliminada = await Cotizaciones.findByIdAndDelete(id)

        if (!cotizacionEliminada) {
            return res.status(404).json({
                ok: false,
                message: "No existe la cotización"
            })
        }
        return res.status(200).json({
            ok: true,
            message: "Cotización eliminada con exito",
            cotizacionEliminada
        })

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}