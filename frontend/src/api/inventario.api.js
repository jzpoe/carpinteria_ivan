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

export const actualizarInventario = async (id, datos) => {
    const respuesta = await axios.put(
        `${API_URL}/inventario/${id}`,
        datos
    );

    return respuesta.data;
};

export const registrarEntrada = async (id, cantidad) => {
    const respuesta = await axios.put(
        `${API_URL}/inventario/${id}/entrada`,
        { cantidad }
    );

    return respuesta.data;
};

export const registrarSalida = async (id, cantidad) => {
    const respuesta = await axios.put(
        `${API_URL}/inventario/${id}/salida`,
        { cantidad }
    );

    return respuesta.data;
};

export const eliminarInventario = async (id) => {
    const respuesta = await axios.delete(
        `${API_URL}/inventario/${id}`
    );

    return respuesta.data;
};