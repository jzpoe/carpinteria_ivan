import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const crearCotizacion = async (datosCotizacion) => {
  const respuesta = await axios.post(
    `${API_URL}/cotizacion`,
    datosCotizacion
  );

  return respuesta.data;
};

export const obtenerCotizaciones = async () => {
  const respuesta = await axios.get(
    `${API_URL}/cotizacion`
  );

  return respuesta.data;
};

export const eliminarCotizacion = async (id) => {
  const respuesta = await axios.delete(
    `${API_URL}/cotizacion/${id}`
  );

  return respuesta.data;
};

export const actualizarCotizacion = async (id, datosCotizacion) => {
    const respuesta = await axios.put(
        `${API_URL}/cotizacion/${id}`,
        datosCotizacion
    );

    return respuesta.data;
};

export const aceptarCotizacion = async (id) => {
    const respuesta = await axios.put(
        `${API_URL}/cotizacion/${id}/aceptar`
    );

    return respuesta.data;
};