import Cliente from "../../models/cliente.models.js"
import Cotizaciones from "../../models/cotizacion.model.js"


export const generarCotizacion = async (req, res) => {
    try {

        const {
            nombreMueble,
            cliente,
            descripcion,
            cantidad,
            valorUnitario,
            valor
        } = req.body;


        // Verificar que el cliente exista

        const encontrarCliente = await Cliente.findById(cliente);

        if (!encontrarCliente) {
            return res.status(404).json({
                ok: false,
                message: "Cliente no existe"
            });
        }


        // Crear la cotización

        const nuevaCotizacion = new Cotizaciones({
            nombreMueble,
            cliente,
            descripcion,
            cantidad,
            valorUnitario,
            valor
        });


        await nuevaCotizacion.save();


        return res.status(201).json({
            ok: true,
            message: "Cotización creada con éxito",
            nuevaCotizacion
        });


    } catch (error) {

        return res.status(400).json({
            ok: false,
            message: error.message
        });

    }
};