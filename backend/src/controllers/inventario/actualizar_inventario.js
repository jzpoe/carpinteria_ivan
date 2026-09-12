import Inventario from "../../models/inventario.models.js";

export const actualizarInventario = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nombre,
            categoria,
            unidad,
            costoUnitario
        } = req.body;

        const inventarioActualizado = await Inventario.findByIdAndUpdate(
            id,
            {
                nombre,
                categoria,
                unidad,
                costoUnitario
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!inventarioActualizado) {
            return res.status(404).json({
                ok: false,
                message: "El artículo no existe en el inventario"
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Artículo actualizado correctamente",
            inventario: inventarioActualizado
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};