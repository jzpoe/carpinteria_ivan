import { useState } from "react";
import {
    Users,
    LayoutDashboard,
    FileText,
    Package,
    Menu,
    X
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar() {
    const [menuAbierto, setMenuAbierto] = useState(false);


    return (
        <>
            <button
                onClick={() => setMenuAbierto(true)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
            >
                <Menu size={24} />
            </button>

            <aside
                className={`
        fixed md:static
        top-0 left-0
        z-40
        w-64 min-h-screen
        bg-gray-900 text-white p-5
        transform transition-transform duration-300
        ${menuAbierto ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}
            >

                <div className="flex justify-end md:hidden mb-4">
                    <button
                        onClick={() => setMenuAbierto(false)}
                        className="p-2 rounded-lg hover:bg-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>
                <h2 className="text-2xl font-bold mb-8" >Carpintería</h2>
                <nav >
                    <ul className="space-y-4 ">
                        <li>

                            <Link
    to="/"
    onClick={() => setMenuAbierto(false)}
    className="flex items-center gap-3 p-3 rounded hover:bg-gray-700"
>
                                <LayoutDashboard size={20} />
                                Dashboard
                            </Link>
                        </li>
                        <li>

                            <Link
                                to="/clientes"
                                onClick={() => setMenuAbierto(false)}
                                className="flex items-center gap-3 p-3 rounded hover:bg-gray-700"
                            >
                                <Users size={20} />
                                Clientes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/cotizaciones"
                                onClick={() => setMenuAbierto(false)}
                                className="flex items-center gap-3 p-3 rounded hover:bg-gray-700"
                            >
                                <FileText size={20} />Cotizaciones y Trabajos</Link>

                        </li>

                        <li>
                            <Link
                                to="/inventario"
                                onClick={() => setMenuAbierto(false)}
                                className="flex items-center gap-3 p-3 rounded hover:bg-gray-700"
                            >
                                <Package size={20} />Inventario</Link>

                        </li>

                    </ul>
                </nav>

            </aside>
        </>
    )
}

export default Sidebar