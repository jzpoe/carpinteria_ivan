import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUsuario = async (datos) => {
    const respuesta = await axios.post(
        `${API_URL}/login`,
        datos
    );

    return respuesta.data;
};