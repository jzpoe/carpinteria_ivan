
function ModalConfirmacion({ cerrar, confirmar }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-full max-w-md">

        <h2 className="text-xl font-bold">
           ¿Eliminar registro?
        </h2>

        <p className="mt-2 text-gray-600">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={cerrar}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={confirmar}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 cursor-pointer"
          >
            Eliminar
          </button>

        </div>

      </div>

    </div>
  );
}

export default ModalConfirmacion;