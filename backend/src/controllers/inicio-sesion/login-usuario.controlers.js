import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../../models/usuario.models.js";

export const loginUsuario = async (req, res) => {
    try {

        const { usuario, password } = req.body;

        const usuario_encontrado = await Usuario.findOne({ usuario });

        if (!usuario_encontrado) {
            return res.status(404).json({
                ok: false,
                message: "Usuario no encontrado"
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario_encontrado.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                ok: false,
                message: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                id: usuario_encontrado._id,
                usuario: usuario_encontrado.usuario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        return res.status(200).json({
            ok: true,
            message: "Inicio de sesión exitoso",
            token,
            usuario: {
                id: usuario_encontrado._id,
                nombre: usuario_encontrado.nombre,
                usuario: usuario_encontrado.usuario
            }
        });

    } catch (error) {

        return res.status(400).json({
            ok: false,
            message: error.message
        });

    }
};