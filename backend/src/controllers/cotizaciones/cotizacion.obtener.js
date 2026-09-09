import Cotizaciones from "../../models/cotizacion.model.js"


export const obtenerCotizaciones = async (req, res) => {

    try {

        const cotizaciones = await Cotizaciones.find()
            .populate("cliente");

        if (cotizaciones.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "no hay cotizaciones disponibles"
            })
        }

        return res.status(200).json({
            ok: true,
            message: "Cotizaciones obtenidas exitosamente ",
            cotizaciones
        })



    } catch (error) {
        res.status(400).json({ message: error.message });

    }

}