import Inventario from "../../models/inventario.models.js";

export const registrarEntrada = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;

        const inventario = await Inventario.findById(id);

        if (!inventario) {
            return res.status(404).json({
                ok: false,
                message: "El artículo no existe en el inventario"
            });
        }

        if (!cantidad || Number(cantidad) <= 0) {
            return res.status(400).json({
                ok: false,
                message: "La cantidad debe ser mayor que cero"
            });
        }

        inventario.cantidad += Number(cantidad);

        inventario.movimientos.push({
            tipo: "Entrada",
            cantidad: Number(cantidad)
        });

        await inventario.save();

        return res.status(200).json({
            ok: true,
            message: "Entrada registrada correctamente",
            inventario
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};