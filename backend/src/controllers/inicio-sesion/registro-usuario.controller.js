import bcrypt from "bcryptjs";
import Usuario from "../../models/usuario.models.js";

export const crearUsuario = async (req, res) => {
    try {

        const {
            nombre,
            usuario,
            password
        } = req.body;

        const usuarioExiste = await Usuario.findOne({ usuario });

        if (usuarioExiste) {
            return res.status(400).json({
                ok: false,
                message: "El correo ya está registrado"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            usuario,
            password: passwordHash
        });

        await nuevoUsuario.save();

        return res.status(201).json({
            ok: true,
            message: "Usuario creado correctamente",
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                usuario: nuevoUsuario.usuario
            }
        });

    } catch (error) {

        return res.status(400).json({
            ok: false,
            message: error.message
        });

    }
};