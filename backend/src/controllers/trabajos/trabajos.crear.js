import Cliente from "../../models/cliente.models.js";
import Cotizacion from "../../models/cotizacion.model.js";
import Trabajo from "../../models/trabajo.models.js";


export const crearTrabajo = async (req, res) => {
    try {

        const { cotizacion, cliente, mueble, valorVenta, gastos } = req.body;
        

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

        const totalGastos = gastos.reduce((acumlador, item) => acumlador + item.valor, 0)
        const ganancia = (valorVenta - totalGastos)

      


        const nuevoTrabajo = new Trabajo({
            cotizacion,
            cliente,
            mueble,
            valorVenta,
            gastos
        })

        await nuevoTrabajo.save()

        res.status(201).json({
            ok: true,
            message: "El trabajo fue guardado con éxito",
            nuevoTrabajo,
            totalGastos,
            ganancia

        })



    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}