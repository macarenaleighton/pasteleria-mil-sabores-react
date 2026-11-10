import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import ProductGrid from '../components/ProductGrid.jsx';
import Alerta from '../components/Alerta.jsx';
import { obtenerCategorias } from '../data/categorias.js';
import { obtenerProductos } from '../data/productos.js';
import { useCarrito } from '../context/CarritoContext.jsx';

// Vista nueva EP2: productos separados por categoría.
// La categoría seleccionada se guarda en la URL (?c=...) para poder compartir el enlace.
function Categorias() {
    const [params, setParams] = useSearchParams();
    const { agregar } = useCarrito();
    const [aviso, setAviso] = useState(null);
    const seleccionada = params.get('c') || '';
    const categorias = obtenerCategorias();
    const productos = obtenerProductos();

    function manejarAgregar(codigo) {
        const r = agregar(codigo, 1);
        setAviso({ tipo: r.ok ? 'exito' : 'error', mensaje: r.mensaje });
    }

    const mostradas = seleccionada ? categorias.filter((c) => c.nombre === seleccionada) : categorias;

    return (
        <>
            <h1>Categorías</h1>
            <div className="d-flex flex-wrap gap-2 mb-4">
                <button className={`btn btn-sm ${!seleccionada ? 'btn-primario' : 'btn-secundario'}`} onClick={() => setParams({})}>
                    Todas
                </button>
                {categorias.map((c) => (
                    <button key={c.id} className={`btn btn-sm ${seleccionada === c.nombre ? 'btn-primario' : 'btn-secundario'}`}
                            onClick={() => setParams({ c: c.nombre })}>
                        {c.icono} {c.nombre}
                    </button>
                ))}
            </div>
            <Alerta tipo={aviso?.tipo} mensaje={aviso?.mensaje} onCerrar={() => setAviso(null)} />

            {mostradas.map((categoria) => {
                const deCategoria = productos.filter((p) => p.categoria === categoria.nombre);
                return (
                    <section key={categoria.id} className="mb-5">
                        <h2 className="h3">{categoria.icono} {categoria.nombre} <small className="text-secondary fs-6">({deCategoria.length})</small></h2>
                        {categoria.descripcion && <p className="text-secondary">{categoria.descripcion}</p>}
                        <ProductGrid productos={deCategoria} onAgregar={manejarAgregar} mensajeVacio="Aún no hay productos en esta categoría." />
                    </section>
                );
            })}
        </>
    );
}

export default Categorias;
