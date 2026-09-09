import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
    producto: {
        type: String,
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: false
    },
    valor: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Venta = mongoose.model("Venta", ventaSchema);

export default Venta;