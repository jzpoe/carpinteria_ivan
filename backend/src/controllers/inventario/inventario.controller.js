import Inventario from "../../models/inventario.models.js";

export const crearInventario = async (req, res) => {
    try {
        const {
            nombre,
            categoria,
            cantidad,
            unidad,
            costoUnitario
        } = req.body;

        const nuevoInventario = new Inventario({
            nombre,
            categoria,
            cantidad,
            unidad,
            costoUnitario,
            movimientos: [
                {
                    tipo: "Entrada",
                    cantidad
                }
            ]
        });

        await nuevoInventario.save();

        return res.status(201).json({
            ok: true,
            message: "Artículo agregado al inventario correctamente",
            nuevoInventario
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};


