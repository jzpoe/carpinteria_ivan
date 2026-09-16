import axios from "axios";

const API_URL = "http://localhost:3001/carpinteria";

export const loginUsuario = async (datos) => {
    const respuesta = await axios.post(
        `${API_URL}/login`,
        datos
    );

    return respuesta.data;
};