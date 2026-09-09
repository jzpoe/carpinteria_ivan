import { useState, useEffect } from "react";
import { crearCliente, obtenerClientes, actualizarCliente } from "../../api/clienteApi";
import toast from "react-hot-toast";

function ModalCliente({ cerrarModal, cargarClientes, clienteEditar }) {
    const [formulario, setFormulario] = useState({
        nombre: "",
        telefono: "",
        correo: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target
        setFormulario({
            ...formulario,
            [name]: value
        });

    }
    useEffect(() => {

        if (clienteEditar) {

            setFormulario({
                nombre: clienteEditar.nombre || "",
                telefono: clienteEditar.telefono || "",
                correo: clienteEditar.correo || ""
            });

        } else {

            setFormulario({
                nombre: "",
                telefono: "",
                correo: ""
            });

        }

    }, [clienteEditar]);


    async function guardarCliente(e) {

    e.preventDefault();

    if (!formulario.nombre || !formulario.telefono) {
        toast.error("Por favor, ingresa nombre y teléfono.");
        return;
    }

    try {

        let respuesta;

        if (clienteEditar) {

            respuesta = await actualizarCliente(
                clienteEditar._id,
                formulario
            );

            toast.success("Cliente actualizado con éxito.");

        } else {

            respuesta = await crearCliente(formulario);

            toast.success("Cliente creado con éxito.");

        }

        console.log(respuesta);

        setFormulario({
            nombre: "",
            telefono: "",
            correo: ""
        });

        await cargarClientes();

        cerrarModal();

    } catch (error) {

        console.error(error);

        if (clienteEditar) {
            toast.error("No se pudo actualizar el cliente.");
        } else {
            toast.error("No se pudo crear el cliente.");
        }

    }
}



    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <div className="flex justify-between items-center">
                    <h2>Nuevo cliente</h2>

                    <button onClick={cerrarModal} className="flex justify-between items-center">
                        ✕
                    </button>
                </div>
                <form onSubmit={guardarCliente} className="space-y-4">

                    <div>
                        <label className="block mb-1">Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre del cliente"
                            name="nombre"
                            value={formulario.nombre}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Teléfono</label>
                        <input
                            type="text"
                            placeholder="Teléfono del cliente"
                            name="telefono"
                            value={formulario.telefono}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Correo</label>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            name="correo"
                            value={formulario.correo}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                    >
                        Guardar cliente
                    </button>

                </form>
            </div>

        </div>
    )
}

export default ModalCliente