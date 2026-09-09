import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerTrabajos = async () => {
    const respuesta = await axios.get(
        `${API_URL}/trabajos`
    );

    return respuesta.data;
};

export const actualizarTrabajo = async (id, datosTrabajo) => {
    const respuesta = await axios.put(
        `${API_URL}/trabajo/${id}`,
        datosTrabajo
    );

    return respuesta.data;
};