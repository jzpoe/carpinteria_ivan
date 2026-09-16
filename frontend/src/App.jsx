import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ClientesPage from './pages/ClientesPage'
import Sidebar from './components/Sidebar'
import { Toaster } from "react-hot-toast";
import DashboardPage from './pages/DashboardPage';
import CotizacionesPage from './pages/CotizacionesPage';
import TrabajosPage from './pages/TrabajosPage';
import InventarioPage from './pages/InventarioPage';
import LoginPage from './pages/LoginPage';
import RutaProtegida from './RutaProtegida';

function AppContenido() {

  const location = useLocation();

  const estaEnLogin = location.pathname === "/login";

  return (
    <div className="flex w-full min-h-screen">

      {!estaEnLogin && <Sidebar />}

      <div className="flex-1 min-w-0 w-full">
        <Routes>

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/"
            element={
              <RutaProtegida>
                <DashboardPage />
              </RutaProtegida>
            }
          />

          <Route
            path="/clientes"
            element={
              <RutaProtegida>
                <ClientesPage />
              </RutaProtegida>
            }
          />

          <Route
            path="/cotizaciones"
            element={
              <RutaProtegida>
                <CotizacionesPage />
              </RutaProtegida>
            }
          />

          <Route
            path="/trabajos"
            element={
              <RutaProtegida>
                <TrabajosPage />
              </RutaProtegida>
            }
          />

          <Route
            path="/inventario"
            element={
              <RutaProtegida>
                <InventarioPage />
              </RutaProtegida>
            }
          />

        </Routes>
      </div>

    </div>
  );
}



  function App() {
    return (
      <>
        <BrowserRouter>

          <Toaster position="top-right" />

          <AppContenido />

        </BrowserRouter>
      </>
    );
  }


export default App
