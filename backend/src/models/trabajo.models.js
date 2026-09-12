import mongoose from "mongoose";


const trabajoSchema = new mongoose.Schema({

    cotizacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cotizaciones",
        required: true,
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: true,
    },
    mueble: {
        type: String,
        required: true
    },
    valorVenta: {
        type: Number,
        required: true
    },

    gastos: [
        {
            concepto: {
                type: String,
                required: true
            },
            valor: {
                type: Number,
                required: true
            }
        }
    ],

    abonos: [
        {
            valor: {
                type: Number,
                required: true
            }
        }
    ]

},
    {
        timestamps: true

    }
)

const Trabajo = mongoose.model("Trabajo", trabajoSchema)
export default Trabajo
