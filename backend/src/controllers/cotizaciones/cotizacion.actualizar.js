import Cotizaciones from "../../models/cotizacion.model.js"


export const actualizarCotizacion = async (req, res)=>{

    try {
        const {id} = req.params

        const cotizacionActualizada = await Cotizaciones.findByIdAndUpdate(
            id,
            req.body,
            { returnDocument: "after" }
        )

        if(!cotizacionActualizada){
            return res.status(404).json({
                ok: false,
                message: "Cotización no existe"
            })
        }

        return res.status(200).json({
            ok: true,
            message: "Cotización actualizado con exito",
            cotizacionActualizada
        })

    } catch (error) {
                res.status(400).json({ message: error.message });

    }

}