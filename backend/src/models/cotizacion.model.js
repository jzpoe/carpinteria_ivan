import mongoose from "mongoose";

const cotizacionSchema = new mongoose.Schema({
    nombreMueble: {
        type: String,
        required: true
    },

    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    cantidad: {
        type: Number,
        required: true
    },

    valorUnitario: {
        type: Number,
        required: true
    },

    valor: {
        type: Number,
        required: true
    },

    estado: {
        type: String,
        enum: ["Pendiente", "Aceptada", "Rechazada"],
        default: "Pendiente"
    }

}, {
    timestamps: true
});

const Cotizacion = mongoose.model("Cotizaciones", cotizacionSchema);

export default Cotizacion;