import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import RutaAdmin from './components/RutaAdmin.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import Home from './pages/Home.jsx';
import Productos from './pages/Productos.jsx';
import ProductoDetalle from './pages/ProductoDetalle.jsx';
import Categorias from './pages/Categorias.jsx';
import Ofertas from './pages/Ofertas.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Blogs from './pages/Blogs.jsx';
import BlogDetalle from './pages/BlogDetalle.jsx';
import Contacto from './pages/Contacto.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Carrito from './pages/Carrito.jsx';
import Checkout from './pages/Checkout.jsx';
import CompraExitosa from './pages/CompraExitosa.jsx';
import CompraFallida from './pages/CompraFallida.jsx';
import NoEncontrado from './pages/NoEncontrado.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProductos from './pages/admin/AdminProductos.jsx';
import AdminProductoForm from './pages/admin/AdminProductoForm.jsx';
import AdminUsuarios from './pages/admin/AdminUsuarios.jsx';
import AdminUsuarioForm from './pages/admin/AdminUsuarioForm.jsx';
import AdminOrdenes from './pages/admin/AdminOrdenes.jsx';
import AdminBoleta from './pages/admin/AdminBoleta.jsx';
import AdminProductoDetalle from './pages/admin/AdminProductoDetalle.jsx';
import AdminProductosCriticos from './pages/admin/AdminProductosCriticos.jsx';
import AdminCategorias from './pages/admin/AdminCategorias.jsx';
import AdminCategoriaForm from './pages/admin/AdminCategoriaForm.jsx';
import AdminUsuarioDetalle from './pages/admin/AdminUsuarioDetalle.jsx';
import AdminReportes from './pages/admin/AdminReportes.jsx';
import AdminPerfil from './pages/admin/AdminPerfil.jsx';

// Mapa de rutas de la aplicación (React Router)
function App() {
    return (
        <Routes>
            {/* Tienda pública: todas comparten Header y Footer mediante <Layout /> */}
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/:codigo" element={<ProductoDetalle />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/ofertas" element={<Ofertas />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetalle />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/compra-exitosa/:id" element={<CompraExitosa />} />
                <Route path="/compra-fallida" element={<CompraFallida />} />
                <Route path="*" element={<NoEncontrado />} />
            </Route>

            {/* Panel administrativo protegido (Figura 10) */}
            <Route path="/admin" element={<RutaAdmin><AdminLayout /></RutaAdmin>}>
                <Route index element={<AdminDashboard />} />
                <Route path="ordenes" element={<AdminOrdenes />} />
                <Route path="ordenes/:id" element={<AdminBoleta />} />
                <Route path="productos" element={<AdminProductos />} />
                <Route path="productos/nuevo" element={<AdminProductoForm />} />
                <Route path="productos/criticos" element={<AdminProductosCriticos />} />
                <Route path="productos/:codigo" element={<AdminProductoDetalle />} />
                <Route path="productos/:codigo/editar" element={<AdminProductoForm />} />
                <Route path="categorias" element={<RutaAdmin soloAdmin><AdminCategorias /></RutaAdmin>} />
                <Route path="categorias/nueva" element={<RutaAdmin soloAdmin><AdminCategoriaForm /></RutaAdmin>} />
                <Route path="categorias/:id/editar" element={<RutaAdmin soloAdmin><AdminCategoriaForm /></RutaAdmin>} />
                <Route path="usuarios" element={<RutaAdmin soloAdmin><AdminUsuarios /></RutaAdmin>} />
                <Route path="usuarios/nuevo" element={<RutaAdmin soloAdmin><AdminUsuarioForm /></RutaAdmin>} />
                <Route path="usuarios/:run" element={<RutaAdmin soloAdmin><AdminUsuarioDetalle /></RutaAdmin>} />
                <Route path="usuarios/:run/editar" element={<RutaAdmin soloAdmin><AdminUsuarioForm /></RutaAdmin>} />
                <Route path="reportes" element={<AdminReportes />} />
                <Route path="perfil" element={<AdminPerfil />} />
            </Route>
        </Routes>
    );
}

export default App;
