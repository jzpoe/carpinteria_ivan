import mongoose from "mongoose";


const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
    },
    correo: {
    type: String,
    
    }
   

},
 {
        timestamps: true
    });

const Cliente = mongoose.model("Cliente", clienteSchema);
export default Cliente;