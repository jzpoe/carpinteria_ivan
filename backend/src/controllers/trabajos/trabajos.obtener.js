import Trabajo from "../../models/trabajo.models.js"


export const obtenerTrabajos = async (req, res) => {

    try {
        const trabajos = await Trabajo.find()
        .populate("cliente")
        .populate("cotizacion");

        if (trabajos.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "no se han encontrado trabajos aún"
            })
        }

        return res.status(200).json({
            ok: true,
            message: "Hemos encontrado estos trabajos",
            trabajos
        })


    } catch (error) {
        res.status(400).json({ message: error.message });

    }

}