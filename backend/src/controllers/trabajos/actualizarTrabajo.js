import Trabajo from "../../models/trabajo.models.js";

export const actualizarTrabajo = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            gastos = [],
            abonos = []
        } = req.body;

        const trabajo = await Trabajo.findById(id);

        if (!trabajo) {
            return res.status(404).json({
                ok: false,
                message: "El trabajo no existe"
            });
        }

        const totalGastos = gastos.reduce(
            (acumulador, gasto) => acumulador + Number(gasto.valor),
            0
        );

        if (totalGastos > trabajo.valorVenta) {
            return res.status(400).json({
                ok: false,
                message: "El total de gastos no puede superar el valor de venta"
            });
        }

        const totalAbonos = abonos.reduce(
            (acumulador, abono) => acumulador + Number(abono.valor),
            0
        );

        if (totalAbonos > trabajo.valorVenta) {
            return res.status(400).json({
                ok: false,
                message: "El total de abonos no puede superar el valor de venta"
            });
        }

        const trabajoActualizado = await Trabajo.findByIdAndUpdate(
            id,
            { gastos, abonos },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

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