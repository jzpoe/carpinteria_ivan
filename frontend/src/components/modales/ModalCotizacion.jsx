import { useEffect, useState } from "react";
import {
    crearCotizacion,
    actualizarCotizacion
} from "../../api/cotizacionApi";
import toast from "react-hot-toast";


function ModalCotizacion({
    cliente,
    cerrarModal,
    cotizacionEditar,
    cargarClientes
}) {

    const [formulario, setFormulario] = useState({

        nombreMueble: "",
        descripcion: "",
        cantidad: 1,
        valorUnitario: ""
    });


    // Cargar datos cuando estamos editando
    useEffect(() => {

        if (cotizacionEditar) {

            setFormulario({
                nombreMueble: cotizacionEditar.nombreMueble || "",
                descripcion: cotizacionEditar.descripcion || "",
                cantidad: cotizacionEditar.cantidad || 1,
                valorUnitario: cotizacionEditar.valorUnitario || ""
            });

        } else {

            setFormulario({
                nombreMueble: "",
                descripcion: "",
                cantidad: 1,
                valorUnitario: ""
            });

        }

    }, [cotizacionEditar]);


    // Cambiar campos del formulario
    function manejarCambio(e) {

        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });

    }


    // Calcular valor total
    const valorTotal =
        Number(formulario.cantidad || 0) *
        Number(formulario.valorUnitario || 0);


    async function guardarCotizacion(e) {

        e.preventDefault();


        if (
            !formulario.nombreMueble ||
            !formulario.descripcion ||
            !formulario.cantidad ||
            !formulario.valorUnitario
        ) {

            toast.error("Por favor, completa todos los campos.");

            return;
        }


        const datosCotizacion = {

            nombreMueble: formulario.nombreMueble,

            cliente: cliente._id,

            descripcion: formulario.descripcion,

            cantidad: Number(formulario.cantidad),

            valorUnitario: Number(formulario.valorUnitario),

            valor: valorTotal

        };


        try {

            if (cotizacionEditar) {

                await actualizarCotizacion(
                    cotizacionEditar._id,
                    datosCotizacion
                );

                toast.success(
                    "¡Cotización actualizada con éxito!"
                );

            } else {

                await crearCotizacion(
                    datosCotizacion
                );

                toast.success(
                    "¡Cotización creada con éxito!"
                );

            }

            await cargarClientes();

            cerrarModal();


        } catch (error) {

            console.error(error);

            if (cotizacionEditar) {

                toast.error(
                    "No se pudo actualizar la cotización."
                );

            } else {

                toast.error(
                    "Ocurrió un error al crear la cotización."
                );

            }

        }

    }


    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

            <div className="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">


                {/* Encabezado */}

                <div className="flex justify-between items-center">

                    <h2 className="text-xl font-bold text-gray-900">

                        {cotizacionEditar
                            ? "Editar cotización"
                            : "Nueva cotización"}

                    </h2>


                    <button
                        type="button"
                        onClick={() => {
                            console.log("Cerrando modal");
                            cerrarModal();
                        }}
                        className="text-gray-500 hover:text-gray-900 cursor-pointer"
                    >
                        ✕
                    </button>

                </div>


                {/* Cliente */}

                <p className="mt-4 text-gray-700">

                    Cliente:{" "}

                    <span className="font-semibold text-gray-900">
                        {cliente?.nombre || "Cliente no disponible"}
                    </span>

                </p>


                {/* Formulario */}

                <form
                    onSubmit={guardarCotizacion}
                    className="space-y-5 mt-6"
                >


                    {/* Nombre del mueble */}

                    <div>

                        <label className="block mb-1 text-sm font-medium">
                            Nombre del mueble
                        </label>

                        <input
                            type="text"
                            name="nombreMueble"
                            value={formulario.nombreMueble}
                            onChange={manejarCambio}
                            placeholder="Ej: Cocina integral"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />

                    </div>


                    {/* Descripción */}

                    <div>

                        <label className="block mb-1 text-sm font-medium">
                            Descripción
                        </label>

                        <textarea
                            name="descripcion"
                            value={formulario.descripcion}
                            onChange={manejarCambio}
                            placeholder="Describe detalladamente lo que se va a fabricar, materiales, medidas, instalación, acabados, etc."
                            rows={8}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-y"
                        />

                    </div>


                    {/* Cantidad y valor unitario */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        <div>

                            <label className="block mb-1 text-sm font-medium">
                                Cantidad
                            </label>

                            <input
                                type="number"
                                name="cantidad"
                                min="1"
                                value={formulario.cantidad}
                                onChange={manejarCambio}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />

                        </div>


                        <div>

                            <label className="block mb-1 text-sm font-medium">
                                Valor unitario
                            </label>

                            <input
                                type="number"
                                name="valorUnitario"
                                min="0"
                                value={formulario.valorUnitario}
                                onChange={manejarCambio}
                                placeholder="Ej: 4500000"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />

                        </div>


                    </div>


                    {/* Valor total */}

                    <div>

                        <label className="block mb-1 text-sm font-medium">
                            Valor total de la cotización
                        </label>

                        <input
                            type="text"
                            value={`$${valorTotal.toLocaleString("es-CO")}`}
                            readOnly
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 font-semibold text-gray-900"
                        />

                    </div>


                    {/* Guardar */}

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                    >

                        {cotizacionEditar
                            ? "Guardar cambios"
                            : "Crear cotización"}

                    </button>


                </form>

            </div>

        </div>

    );

}


export default ModalCotizacion;