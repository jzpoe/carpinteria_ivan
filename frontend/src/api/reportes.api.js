import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerReporteGanancias = async (periodo) => {
    const respuesta = await axios.get(
        `${API_URL}/reportes/ganancias?periodo=${periodo}`
    );

    return respuesta.data;
};