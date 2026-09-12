import axios from "axios";

const API_URL = "http://localhost:3001/carpinteria";

export const obtenerInventario = async () => {
    const respuesta = await axios.get(`${API_URL}/inventario`);

    return respuesta.data;
};

export const crearInventario = async (datos) => {
    const respuesta = await axios.post(
        `${API_URL}/inventario`,
        datos
    );

    return respuesta.data;
};