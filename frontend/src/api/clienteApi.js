import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

export const crearCliente = async (datosCliente) => {
  const respuesta = await axios.post(
    `${API_URL}/cliente`,
    datosCliente
  );

  return respuesta.data;
};


export const obtenerClientes = async () => {
  const respuesta = await axios.get(
    `${API_URL}/clientes`
  );

  return respuesta.data;
};

export const actualizarCliente = async (id, datosCliente) => {
  const respuesta = await axios.put(
    `${API_URL}/cliente/${id}`,
    datosCliente
  );

  return respuesta.data;
};

export const eliminarCliente = async (id) => {
  const respuesta = await axios.delete(
    `${API_URL}/cliente/${id}`
  );

  return respuesta.data;
};