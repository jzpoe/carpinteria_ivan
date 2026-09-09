import Venta from "../../models/venta.models.js";
import Cliente from "../../models/cliente.models.js";

export const crearVenta = async (req, res) => {
    try {

        const { producto, cliente, valor } = req.body;

        if (cliente) {
            const verificarCliente = await Cliente.findById(cliente);

            if (!verificarCliente) {
                return res.status(404).json({
                    ok: false,
                    message: "El cliente no existe"
                });
            }
        }

        const nuevaVenta = new Venta({
            producto,
            cliente,
            valor
        });

        await nuevaVenta.save();

        return res.status(201).json({
            ok: true,
            message: "Venta creada con éxito",
            venta: nuevaVenta
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};


export const obtenerVentas = async (req, res) => {
    try {

        const ventas = await Venta.find()
            .populate("cliente");

        if (ventas.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "No se han encontrado ventas"
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Ventas obtenidas exitosamente",
            ventas
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};