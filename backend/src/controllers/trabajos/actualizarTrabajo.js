import Trabajo from "../../models/trabajo.models.js";

export const actualizarTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const { gastos } = req.body;

        const trabajoActualizado = await Trabajo.findByIdAndUpdate(
            id,
            { gastos },
            { returnDocument: "after", runValidators: true }
        );

        if (!trabajoActualizado) {
            return res.status(404).json({
                ok: false,
                message: "El trabajo no existe"
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Trabajo actualizado con éxito",
            trabajo: trabajoActualizado
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};