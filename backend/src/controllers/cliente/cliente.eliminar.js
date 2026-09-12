import Cliente from "../../models/cliente.models.js";
import Cotizacion from "../../models/cotizacion.model.js";
import Trabajo from "../../models/trabajo.models.js";


export const elimianarCliente = async (req, res) => {


    try {

        const { id } = req.params;

        const buscarCliente = await Cliente.findById(id);

        if (!buscarCliente) {
            return res.status(404).json({
                ok: false,
                message: "Cliente indicado no existe"
            });
        }

        const cotizaciones = await Cotizacion.find({
            cliente: id
        });

        for (const cotizacion of cotizaciones) {
            await Trabajo.deleteMany({
                cotizacion: cotizacion._id
            });
        }

        await Cotizacion.deleteMany({
            cliente: id
        });

        await Cliente.findByIdAndDelete(id);

        res.status(202).json({
            ok: true,
            message: "Cliente, cotizaciones y trabajos relacionados eliminados correctamente"
        });

    } catch (error) {
        res.status(400).json({ message: error.message });

    }

}