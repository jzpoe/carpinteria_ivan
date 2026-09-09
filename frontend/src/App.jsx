import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientesPage from './pages/ClientesPage'
import Sidebar from './components/Sidebar'
import { Toaster } from "react-hot-toast";
import DashboardPage from './pages/DashboardPage';
import CotizacionesPage from './pages/CotizacionesPage';
import TrabajosPage from './pages/TrabajosPage';
import InventarioPage from './pages/InventarioPage';


function App() {

  return (
    <>
      <BrowserRouter>

        <Toaster position="top-right" />

        <div className="flex w-full min-h-screen">

          <Sidebar />

          <div className="flex-1 min-w-0 w-full">

            <Routes>

              <Route path="/" element={<DashboardPage />} />

              <Route path="/clientes" element={<ClientesPage />} />

              <Route path="/cotizaciones" element={<CotizacionesPage />} />

              <Route path="/trabajos" element={<TrabajosPage />} />

              <Route path="/inventario" element={<InventarioPage />} />

            </Routes>

          </div>

        </div>
      </BrowserRouter >
    </>
  )
}

export default App
