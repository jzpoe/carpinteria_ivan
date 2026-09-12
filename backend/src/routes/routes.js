import express from "express";
import { crearCliente } from "../controllers/cliente/cliente.controllers.js";
import { obtenerClientes } from "../controllers/cliente/cliente.obtener.js";
import { elimianarCliente } from "../controllers/cliente/cliente.eliminar.js";
import { actualizarCliente } from "../controllers/cliente/cliente.actualizar.js";
import { generarCotizacion } from "../controllers/cotizaciones/cotizacion.controllers.js";
import { obtenerCotizaciones } from "../controllers/cotizaciones/cotizacion.obtener.js";
import { eliminarCotizacion } from "../controllers/cotizaciones/cotizacion.eliminar.js";
import { actualizarCotizacion } from "../controllers/cotizaciones/cotizacion.actualizar.js";
import { crearTrabajo } from "../controllers/trabajos/trabajos.crear.js";
import { obtenerTrabajos } from "../controllers/trabajos/trabajos.obtener.js";
import { aceptarCotizacion } from "../controllers/cotizaciones/aceptarCotizacion.js";
import { actualizarTrabajo } from "../controllers/trabajos/actualizarTrabajo.js";
import { obtenerGanancias } from "../controllers/reportes/reportes.controllers.js";
import { crearVenta, obtenerVentas } from "../controllers/venta/venta.controllers.js";
import { crearInventario } from "../controllers/inventario/inventario.controller.js";
import { registrarEntrada } from "../controllers/inventario/inventario.registrarEntrada.js";
import { registrarSalida } from "../controllers/inventario/regitrar_salida_inventario.js";
import { obtenerInventario } from "../controllers/inventario/obtener_inventario.js";
import { actualizarInventario } from "../controllers/inventario/actualizar_inventario.js";
import { eliminarInventario } from "../controllers/inventario/eliminar_inventario.js";


const router = express.Router();


//crear cliente
router.post("/cliente", crearCliente);
//obtener clientes
router.get("/clientes", obtenerClientes);
//elimiar cliente
router.delete("/cliente/:id", elimianarCliente)
//actualizar cliente
router.put("/cliente/:id", actualizarCliente)


//cotizaciones
router.post("/cotizacion", generarCotizacion)
//obtener cotizaciones
router.get("/cotizacion", obtenerCotizaciones);

//eliniar cotizacion
router.delete("/cotizacion/:id", eliminarCotizacion)
//actualizar cotización
router.put("/cotizacion/:id", actualizarCotizacion)

//crear trabajo
router.post("/trabajo", crearTrabajo)
//obtener trabajos
router.get("/trabajos", obtenerTrabajos);
//aceptar cotizaciones, cambiar de estado
router.put("/cotizacion/:id/aceptar", aceptarCotizacion);
//actualizar trabajo
router.put("/trabajo/:id", actualizarTrabajo);
//obtener ganancias 
router.get("/reportes/ganancias", obtenerGanancias);
//obtener y hacer ventas
router.post("/venta", crearVenta);
router.get("/venta", obtenerVentas);

// inventario

router.post("/inventario", crearInventario);

router.put("/inventario/:id/entrada", registrarEntrada);
router.put("/inventario/:id/salida", registrarSalida);
router.get("/inventario", obtenerInventario);
router.put("/inventario/:id", actualizarInventario);
router.delete("/inventario/:id", eliminarInventario);








export default router;


