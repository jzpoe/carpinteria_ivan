import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 0
    },
    unidad: {
        type: String,
        required: true
    },
    costoUnitario: {
        type: Number,
        required: true,
        min: 0
    },
    movimientos: [
        {
            tipo: {
                type: String,
                enum: ["Entrada", "Salida"],
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                min: 1
            },
            fecha: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

const Inventario = mongoose.model("Inventario", inventarioSchema);

export default Inventario;