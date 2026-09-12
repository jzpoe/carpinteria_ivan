import Cliente from "../../models/cliente.models.js";
import Cotizacion from "../../models/cotizacion.model.js";
import Trabajo from "../../models/trabajo.models.js";


export const crearTrabajo = async (req, res) => {
    try {

        const {
            cotizacion,
            cliente,
            mueble,
            valorVenta,
            gastos = [],
            abonos = []
        } = req.body;


        const verificarCliente = await Cliente.findById(cliente);




        if (!verificarCliente) {
            return res.status(404).json({
                ok: false,
                message: "el cliente seleccionado no existe"
            })
        }



        const verificarCotizacion = await Cotizacion.findById(cotizacion);
        console.log("verificar cotizacion: ", verificarCotizacion)
        if (!verificarCotizacion) {
            return res.status(404).json({
                ok: false,
                message: "La cotización seleccionado no existe"
            })
        }
        if (verificarCotizacion.cliente.toString() !== verificarCliente._id.toString()) {
            return res.status(404).json({
                ok: false,
                message: "La cotización no corresponde al cliente"
            })
        }

        const totalGastos = gastos.reduce(
            (acumulador, item) => acumulador + Number(item.valor),
            0
        );

        if (totalGastos > valorVenta) {
            return res.status(400).json({
                ok: false,
                message: "El total de gastos no puede superar el valor de venta"
            });
        }

        const totalAbonos = abonos.reduce(
            (acumulador, item) => acumulador + Number(item.valor),
            0
        );

        if (totalAbonos > valorVenta) {
            return res.status(400).json({
                ok: false,
                message: "El total de abonos no puede superar el valor de venta"
            });
        }

        const ganancia = valorVenta - totalGastos;
        const saldo = valorVenta - totalAbonos;




        const nuevoTrabajo = new Trabajo({
            cotizacion,
            cliente,
            mueble,
            valorVenta,
            gastos,
            abonos
        })

        await nuevoTrabajo.save()

        res.status(201).json({
            ok: true,
            message: "El trabajo fue guardado con éxito",
            nuevoTrabajo,
            totalGastos,
            totalAbonos,
            ganancia,
            saldo
        });



    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}