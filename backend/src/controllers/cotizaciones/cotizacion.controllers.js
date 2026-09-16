import Cliente from "../../models/cliente.models.js"
import Cotizaciones from "../../models/cotizacion.model.js"


export const generarCotizacion = async (req, res) => {
    try {

        const {
            cliente,
            descripcion,
            muebles
        } = req.body;

        if (!muebles || muebles.length === 0) {
            return res.status(400).json({
                ok: false,
                message: "La cotización debe tener al menos un mueble"
            });
        }

        const mueblesCalculados = muebles.map((mueble) => ({
            nombre: mueble.nombre,
            cantidad: Number(mueble.cantidad),
            valorUnitario: Number(mueble.valorUnitario),
            valor:
                Number(mueble.cantidad) *
                Number(mueble.valorUnitario)
        }));

        const valorTotal = mueblesCalculados.reduce(
            (total, mueble) => total + mueble.valor,
            0
        );

        const encontrarCliente =
            await Cliente.findById(cliente);

        if (!encontrarCliente) {
            return res.status(404).json({
                ok: false,
                message: "Cliente no existe"
            });
        }

        const primerMueble = mueblesCalculados[0];

        const nuevaCotizacion = new Cotizaciones({
            nombreMueble: primerMueble.nombre,
            cliente,
            descripcion,

            muebles: mueblesCalculados,

            cantidad: primerMueble.cantidad,
            valorUnitario: primerMueble.valorUnitario,
            valor: valorTotal
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