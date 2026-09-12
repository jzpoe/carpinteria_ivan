import Inventario from "../../models/inventario.models.js";

export const eliminarInventario = async (req, res) => {
    try {
        const { id } = req.params;

        const inventarioEliminado = await Inventario.findByIdAndDelete(id);

        if (!inventarioEliminado) {
            return res.status(404).json({
                ok: false,
                message: "El artículo no existe en el inventario"
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Artículo eliminado correctamente",
            inventario: inventarioEliminado
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};