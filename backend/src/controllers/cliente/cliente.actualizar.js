import Cliente from "../../models/cliente.models.js";


export const actualizarCliente = async (req, res) => {

    try {
        const { id } = req.params;
        const encontrarCliente = await Cliente.findByIdAndUpdate(

            id,
            req.body,
            { returnDocument: "after" }
        );

        if (!encontrarCliente) {
            return res.status(404).json({
                ok: false,
                message: "Cliente no existe"
            })
        }

        return res.status(200).json({
            ok: true,
            message: "Cliente actualizado con exito",
            encontrarCliente
        })


    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}