import Venta from "../../models/venta.models.js";

let formatoFecha;

if (periodo === "dia") {
    formatoFecha = "%Y-%m-%d";
} else if (periodo === "mes") {
    formatoFecha = "%Y-%m";
} else if (periodo === "año") {
    formatoFecha = "%Y";
} else {
    return res.status(400).json({
        ok: false,
        message: "El periodo debe ser dia, mes o año"
    });
}

const ventasDirectas = await Venta.aggregate([
    {
        $group: {
            _id: {
                $dateToString: {
                    format: formatoFecha,
                    date: "$createdAt"
                }
            },
            totalVentasDirectas: {
                $sum: "$valor"
            }
        }
    }
]);