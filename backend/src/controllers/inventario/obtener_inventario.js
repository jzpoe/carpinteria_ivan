import Inventario from "../../models/inventario.models.js";

export const obtenerInventario = async (req, res) => {
    try {
        const inventario = await Inventario.find()
            .sort({ createdAt: -1 });

        if (inventario.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "No hay artículos en el inventario"
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Inventario obtenido correctamente",
            inventario
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};