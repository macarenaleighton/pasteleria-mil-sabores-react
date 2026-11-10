import { useMemo, useState } from 'react';
import FiltrosProductos from '../components/FiltrosProductos.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import Alerta from '../components/Alerta.jsx';
import { obtenerProductos, precioFinal } from '../data/productos.js';
import { useCarrito } from '../context/CarritoContext.jsx';

// Aplica categoría, búsqueda y orden a la lista (función pura, exportada para pruebas)
export function filtrarProductos(productos, { categoria = '', busqueda = '', orden = '' }) {
    const texto = busqueda.trim().toLowerCase();
    const resultado = productos.filter(
        (p) => (!categoria || p.categoria === categoria) && (!texto || p.nombre.toLowerCase().includes(texto))
    );
    if (orden === 'precio-asc') resultado.sort((a, b) => precioFinal(a) - precioFinal(b));
    if (orden === 'precio-desc') resultado.sort((a, b) => precioFinal(b) - precioFinal(a));
    if (orden === 'nombre') resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return resultado;
}

function Productos() {
    const { agregar } = useCarrito();
    const [filtros, setFiltros] = useState({ categoria: '', busqueda: '', orden: '' });
    const [aviso, setAviso] = useState(null);

    const productos = useMemo(() => filtrarProductos(obtenerProductos(), filtros), [filtros]);

    function manejarAgregar(codigo) {
        const r = agregar(codigo, 1);
        setAviso({ tipo: r.ok ? 'exito' : 'error', mensaje: r.mensaje });
    }

    return (
        <>
            <h1>Productos</h1>
            <FiltrosProductos {...filtros} onChange={(cambio) => setFiltros({ ...filtros, ...cambio })} />
            <Alerta tipo={aviso?.tipo} mensaje={aviso?.mensaje} onCerrar={() => setAviso(null)} />
            <p className="text-secondary small">{productos.length} producto(s) encontrado(s)</p>
            <ProductGrid productos={productos} onAgregar={manejarAgregar} mensajeVacio="No se encontraron productos con esos filtros." />
        </>
    );
}

export default Productos;
