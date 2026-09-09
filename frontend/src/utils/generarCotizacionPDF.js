import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo_ivan.jpeg";

export const generarCotizacionPDF = async (cotizacion) => {

    // ==========================================
    // DATOS PRINCIPALES
    // ==========================================

    const cantidad = Number(cotizacion.cantidad || 1);

    const valorUnitario = Number(
        cotizacion.valorUnitario || cotizacion.valor || 0
    );

    const valorTotal = cantidad * valorUnitario;

    const fecha = cotizacion.createdAt
        ? new Date(cotizacion.createdAt).toLocaleDateString("es-CO")
        : new Date().toLocaleDateString("es-CO");


    // ==========================================
    // CONDICIONES POR DEFECTO
    // ==========================================

    const tiempoEntrega =
        cotizacion.tiempoEntrega ||
        "15 días hábiles después de la negociación.";

    const formaPago =
        cotizacion.formaPago ||
        "60% para iniciar el trabajo y el 40% restante contra entrega.";

    const direccion =
        cotizacion.direccion ||
        "Calle 27 #43-33 Villa del Sur (Cali)";

    const datosBancarios =
        cotizacion.datosBancarios ||
        "Innovaciones Arias - Bancolombia, cuenta de ahorros 80802666750";


    // ==========================================
    // CONTENEDOR TEMPORAL
    // ==========================================

    const contenedor = document.createElement("div");

    contenedor.style.position = "absolute";
    contenedor.style.left = "-10000px";
    contenedor.style.top = "0";
    contenedor.style.width = "794px";
    contenedor.style.background = "#ffffff";

    document.body.appendChild(contenedor);


    // ==========================================
    // HTML
    // ==========================================

    contenedor.innerHTML = `

        <div class="cotizacion">

            <!-- ENCABEZADO -->

            <header class="encabezado">

                <div class="marca">

                    <div class="logo-container">
                        <img src="${logo}" class="logo" />
                    </div>

                    <div class="empresa">

                        <h2>
                            INNOVACIONES ARIAS
                        </h2>

                        <div class="subtitulo">
                            C A R P I N T E R Í A
                        </div>

                        <p>
                            IDEAS EN MADERA, ESPACIOS PARA TU VIDA
                        </p>

                    </div>

                </div>


                <div class="titulo-documento">

                    <h1>
                        COTIZACIÓN
                    </h1>

                    <div class="datos-documento">

                        <strong>
                            N.º 000001
                        </strong>

                        <span>
                            Fecha: ${fecha}
                        </span>

                    </div>

                </div>

            </header>


            <!-- CLIENTE -->

            <section class="cliente">

                <div class="titulo-seccion">

                    <div class="icono">
                        👤
                    </div>

                    <h2>
                        DATOS DEL CLIENTE
                    </h2>

                </div>


                <div class="cliente-datos">

                    <div>

                        <strong>
                            Cliente:
                        </strong>

                        <span>
                            ${cotizacion.cliente?.nombre || "No especificado"}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Teléfono:
                        </strong>

                        <span>
                            ${cotizacion.cliente?.telefono || "No especificado"}
                        </span>

                    </div>

                </div>

            </section>


            <!-- DETALLE DE COTIZACIÓN -->

            <section class="bloque">

                <div class="titulo-seccion">

                    <div class="icono">
                        📋
                    </div>

                    <h2>
                        DETALLE DE LA COTIZACIÓN
                    </h2>

                </div>


                <table>

                    <thead>

                        <tr>

                            <th>
                                DESCRIPCIÓN
                            </th>

                            <th>
                                CANT.
                            </th>

                            <th>
                                VALOR UNIT.
                            </th>

                            <th>
                                TOTAL
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        <tr>

                            <td>
                                ${cotizacion.nombreMueble || "No especificado"}
                            </td>

                            <td>
                                ${cantidad}
                            </td>

                            <td>
                                $${valorUnitario.toLocaleString("es-CO")}
                            </td>

                            <td>
                                $${valorTotal.toLocaleString("es-CO")}
                            </td>

                        </tr>

                    </tbody>

                </table>

            </section>


            <!-- DESCRIPCIÓN -->

            <section class="bloque">

                <div class="titulo-seccion">

                    <div class="icono">
                        💬
                    </div>

                    <h2>
                        DESCRIPCIÓN
                    </h2>

                </div>


                <div class="tarjeta-texto">

                    ${cotizacion.descripcion || "No especificada"}

                </div>

            </section>


            <!-- DETALLE DEL TRABAJO -->

            <section class="bloque">

                <div class="titulo-seccion">

                    <div class="icono">
                        ⚙
                    </div>

                    <h2>
                        DETALLE DEL TRABAJO
                    </h2>

                </div>


                <div class="tarjeta-texto">

                    ${cotizacion.detalle || "No especificado"}

                </div>

            </section>


            <!-- VALOR TOTAL -->

            <section class="total">

                <div class="total-titulo">

                    <span class="moneda">
                        $
                    </span>

                    <strong>
                        VALOR TOTAL
                    </strong>

                </div>


                <div class="valor-total">

                    $${valorTotal.toLocaleString("es-CO")}

                </div>

            </section>


            <!-- CONDICIONES COMERCIALES -->

            <section class="bloque">

                <div class="titulo-seccion">

                    <div class="icono">
                        📋
                    </div>

                    <h2>
                        CONDICIONES COMERCIALES
                    </h2>

                </div>


                <div class="condiciones">

                    <div class="condicion">

                        <strong>
                            Tiempo de entrega:
                        </strong>

                        <span>
                            ${tiempoEntrega}
                        </span>

                    </div>


                    <div class="condicion">

                        <strong>
                            Forma de pago:
                        </strong>

                        <span>
                            ${formaPago}
                        </span>

                    </div>


                    <div class="condicion">

                        <strong>
                            Dirección:
                        </strong>

                        <span>
                            ${direccion}
                        </span>

                    </div>


                    <div class="condicion">

                        <strong>
                            Datos para el pago:
                        </strong>

                        <span>
                            ${datosBancarios}
                        </span>

                    </div>

                </div>

            </section>


            <!-- PIE -->

            <footer>

                <div class="contacto">

                    <span>
                        ☎ 333 333 3333
                    </span>

                    <span>
                        📍 Calle 27 #43-33 Villa del Sur (Cali)
                    </span>

                    <span>
                        ✉ innovacionesarias@gmail.com
                    </span>

                </div>


                <div class="mensaje-final">

                    GRACIAS POR CONFIAR EN NUESTRO TRABAJO

                </div>

            </footer>

        </div>
    `;


    // ==========================================
    // ESTILOS
    // ==========================================

    const estilos = document.createElement("style");

    estilos.innerHTML = `

        * {
            box-sizing: border-box;
        }


        .cotizacion {

            width: 794px;

            padding: 32px 42px 24px;

            background: white;

            color: #252525;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            font-size: 12px;

        }


        /* ============================= */
        /* ENCABEZADO */
        /* ============================= */

        .encabezado {

            display: flex;

            justify-content: space-between;

            align-items: center;

            padding-bottom: 18px;

            border-bottom: 2px solid #e6ddd5;

        }


        .marca {

            display: flex;

            align-items: center;

            gap: 14px;

        }


        .logo-container {

            width: 105px;

            height: 82px;

            display: flex;

            align-items: center;

            justify-content: center;

        }


        .logo {

            width: 95px;

            height: 78px;

            object-fit: contain;

        }


        .empresa h2 {

            margin: 0;

            font-size: 18px;

            color: #55351f;

            letter-spacing: .8px;

        }


        .subtitulo {

            margin-top: 4px;

            font-size: 9px;

            letter-spacing: 4px;

            color: #765033;

        }


        .empresa p {

            margin: 6px 0 0;

            font-size: 7px;

            letter-spacing: 1px;

            color: #777;

        }


        .titulo-documento {

            text-align: right;

        }


        .titulo-documento h1 {

            margin: 0;

            font-size: 25px;

            color: #293241;

            letter-spacing: 1px;

        }


        .datos-documento {

            margin-top: 7px;

            padding: 8px 12px;

            background: #f5f1ed;

            border-radius: 7px;

            display: flex;

            flex-direction: column;

            gap: 3px;

            font-size: 9px;

            color: #666;

        }


        .datos-documento strong {

            font-size: 11px;

            color: #293241;

        }


        /* ============================= */
        /* TÍTULOS */
        /* ============================= */

        .titulo-seccion {

            display: flex;

            align-items: center;

            gap: 9px;

            margin-bottom: 8px;

        }


        .titulo-seccion h2 {

            margin: 0;

            font-size: 13px;

            color: #293241;

            letter-spacing: .3px;

        }


        .icono {

            width: 28px;

            height: 28px;

            min-width: 28px;

            border-radius: 7px;

            background: #765033;

            color: white;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 13px;

        }


        /* ============================= */
        /* CLIENTE */
        /* ============================= */

        .cliente {

            margin-top: 15px;

            padding: 13px 15px;

            background: #f7f4f1;

            border-radius: 9px;

        }


        .cliente-datos {

            display: flex;

            justify-content: space-between;

            padding-left: 37px;

            font-size: 10px;

        }


        .cliente-datos div {

            display: flex;

            gap: 7px;

        }


        .cliente-datos strong {

            color: #293241;

        }


        .cliente-datos span {

            color: #5f6368;

        }


        /* ============================= */
        /* BLOQUES */
        /* ============================= */

        .bloque {

            margin-top: 15px;

        }


        /* ============================= */
        /* TABLA */
        /* ============================= */

        table {

            width: 100%;

            border-collapse: separate;

            border-spacing: 0;

            border: 1px solid #dedede;

            border-radius: 7px;

            overflow: hidden;

        }


        th {

            padding: 8px 9px;

            background: #303b49;

            color: white;

            font-size: 8px;

            text-align: left;

        }


        th:nth-child(2) {

            text-align: center;

            width: 55px;

        }


        th:nth-child(3),
        th:nth-child(4) {

            text-align: right;

            width: 105px;

        }


        td {

            padding: 10px 9px;

            border-top: 1px solid #e5e7eb;

            font-size: 10px;

        }


        td:nth-child(2) {

            text-align: center;

        }


        td:nth-child(3),
        td:nth-child(4) {

            text-align: right;

        }


        /* ============================= */
        /* TARJETAS DE TEXTO */
        /* ============================= */

        .tarjeta-texto {

            padding: 10px 13px;

            background: #f7f4f1;

            border-radius: 8px;

            color: #5f6368;

            line-height: 1.4;

            min-height: 32px;

        }


        /* ============================= */
        /* TOTAL */
        /* ============================= */

        .total {

            margin-top: 15px;

            display: flex;

            justify-content: space-between;

            align-items: center;

            background: #f7f4f1;

            border-radius: 9px;

            overflow: hidden;

        }


        .total-titulo {

            display: flex;

            align-items: center;

            gap: 9px;

            padding-left: 15px;

            font-size: 14px;

            color: #293241;

        }


        .moneda {

            font-size: 19px;

            color: #765033;

        }


        .valor-total {

            padding: 12px 20px;

            min-width: 180px;

            background: #765033;

            color: white;

            text-align: right;

            font-size: 17px;

            font-weight: bold;

        }


        /* ============================= */
        /* CONDICIONES */
        /* ============================= */

        .condiciones {

            padding: 11px 15px;

            background: #f7f4f1;

            border-radius: 9px;

        }


        .condicion {

            display: grid;

            grid-template-columns: 120px 1fr;

            gap: 8px;

            margin-bottom: 7px;

            font-size: 9px;

            line-height: 1.35;

        }


        .condicion:last-child {

            margin-bottom: 0;

        }


        .condicion strong {

            color: #293241;

        }


        .condicion span {

            color: #5f6368;

        }


        /* ============================= */
        /* FOOTER */
        /* ============================= */

        footer {

            margin-top: 15px;

            padding-top: 10px;

            border-top: 1px solid #e5ded8;

        }


        .contacto {

            display: flex;

            justify-content: space-between;

            font-size: 7px;

            color: #777;

        }


        .mensaje-final {

            margin-top: 9px;

            padding: 7px;

            text-align: center;

            background: #f4eee8;

            color: #765033;

            font-size: 7px;

            letter-spacing: 2px;

        }

    `;


    contenedor.appendChild(estilos);


    // ==========================================
    // ESPERAR LOGO
    // ==========================================

    const imagen = contenedor.querySelector(".logo");

    if (imagen) {

        await new Promise((resolve) => {

            if (imagen.complete) {

                resolve();

            } else {

                imagen.onload = resolve;
                imagen.onerror = resolve;

            }

        });

    }


    // ==========================================
    // GENERAR CANVAS
    // ==========================================

    const canvas = await html2canvas(
        contenedor.querySelector(".cotizacion"),
        {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
        }
    );


    const imagenPDF = canvas.toDataURL(
        "image/png"
    );


    // ==========================================
    // PDF A4
    // ==========================================

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });


    const anchoPDF = 210;
    const altoPDF = 297;

    const margenPDF = 8;

    const anchoDisponible =
        anchoPDF - margenPDF * 2;

    const altoDisponible =
        altoPDF - margenPDF * 2;


    const proporcion =
        anchoDisponible / canvas.width;


    const altoImagen =
        canvas.height * proporcion;


    // ==========================================
    // AJUSTAR A UNA PÁGINA
    // ==========================================

    let escalaFinal = proporcion;

    if (altoImagen > altoDisponible) {

        escalaFinal =
            altoDisponible / canvas.height;

    }


    const anchoFinal =
        canvas.width * escalaFinal;

    const altoFinal =
        canvas.height * escalaFinal;


    const posicionX =
        (anchoPDF - anchoFinal) / 2;

    const posicionY =
        margenPDF;


    pdf.addImage(
        imagenPDF,
        "PNG",
        posicionX,
        posicionY,
        anchoFinal,
        altoFinal
    );


    // ==========================================
    // GUARDAR
    // ==========================================

    pdf.save(
        `Cotizacion-${cotizacion.nombreMueble || "Carpinteria"}.pdf`
    );


    // ==========================================
    // LIMPIAR
    // ==========================================

    document.body.removeChild(
        contenedor
    );
};