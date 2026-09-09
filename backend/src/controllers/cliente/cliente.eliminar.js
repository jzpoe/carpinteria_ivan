import Cliente from "../../models/cliente.models.js";


export const elimianarCliente = async (req, res)=>{


    try {
        
        const {id} = req.params;
        

        const buscarClienteID = await Cliente.findByIdAndDelete(id);

        if(!buscarClienteID){
            return res.status(404).json({
            ok:false,
            message:"Cliente indicado no existe",
            
        })
        }

        res.status(202).json({
            ok:true,
            message:"Cliente eliminado correctamente",
            buscarClienteID
        })

    } catch (error) {
                res.status(400).json({ message: error.message });

    }

}