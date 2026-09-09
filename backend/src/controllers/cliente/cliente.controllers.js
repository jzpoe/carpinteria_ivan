import Cliente from "../../models/cliente.models.js";


export const crearCliente = async (req, res) => {

    try {
        const { nombre, telefono, correo } = req.body;
        const nuevoCliente = new Cliente({ nombre, telefono, correo });

        const clienteGuardado = await nuevoCliente.save();
        res.status(200).json
            (
                {
                    ok: true,
                    message: "Cliente creado exitosamente",
                    clienteGuardado
                }
            );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}