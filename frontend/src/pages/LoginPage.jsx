import { useState } from "react";
import { loginUsuario } from "../api/usuario.api";
import toast from "react-hot-toast";

function LoginPage() {

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    async function iniciarSesion(e) {
        e.preventDefault();

        if (!usuario || !password) {
            toast.error("Completa todos los campos");
            return;
        }

        try {

            const respuesta = await loginUsuario({
                usuario,
                password
            });

            localStorage.setItem("token", respuesta.token);
            localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));

            toast.success("Inicio de sesión exitoso");

            window.location.href = "/";

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "No se pudo iniciar sesión"
            );
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/logoIvan.jpeg"
                        alt="Innovaciones Arias"
                        className="w-32 h-32 object-contain"
                    />
                </div>

                <div className="text-center mb-8">

                    <h1 className="text-2xl font-bold text-gray-900">
                        Innovaciones Arias
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Sistema de gestión
                    </p>

                </div>

                <form onSubmit={iniciarSesion}>

                    {/* Usuario */}
                    <div className="mb-4">

                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Usuario
                        </label>

                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Ingresa tu usuario"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />

                    </div>

                    {/* Contraseña */}
                    <div className="mb-6">

                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition cursor-pointer"
                    >
                        Iniciar sesión
                    </button>

                </form>

            </div>

        </main>
    );
}

export default LoginPage;