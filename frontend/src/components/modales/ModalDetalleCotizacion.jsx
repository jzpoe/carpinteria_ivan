function ModalDetalleCotizacion({ cotizacion, cerrar }) {

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

            <div className="bg-white rounded-xl w-full max-w-lg p-6">

                {/* Encabezado */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        Detalle de cotización
                    </h2>

                    <button
                        onClick={cerrar}
                        className="text-gray-500 hover:text-gray-900 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Información */}
                <div className="mt-6 space-y-4">

                    <div>
                        <p className="text-sm text-gray-500">
                            Cliente
                        </p>

                        <p className="font-medium text-gray-900">
                            {cotizacion.cliente?.cliente || "Cliente no disponible"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Teléfono
                        </p>

                        <p className="font-medium text-gray-900">
                            {cotizacion.telefono?.telefono || "No disponible"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Mueble
                        </p>

                        <p className="font-medium text-gray-900">
                            {cotizacion.nombreMueble}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Valor
                        </p>

                        <p className="font-medium text-gray-900">
                            ${cotizacion.valor?.toLocaleString("es-CO")}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Estado
                        </p>

                        <p className="font-medium text-gray-900">
                            {cotizacion.estado || "Pendiente"}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ModalDetalleCotizacion;