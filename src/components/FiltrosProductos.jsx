import { nombresCategorias } from '../data/categorias.js';

// Filtros controlados: el estado vive en la página padre
function FiltrosProductos({ categoria, busqueda, orden, onChange }) {
    return (
        <div className="row g-2 mb-4 filtros-productos">
            <div className="col-12 col-md-4">
                <select className="form-select" aria-label="Filtrar por categoría" value={categoria}
                        onChange={(e) => onChange({ categoria: e.target.value })}>
                    <option value="">Todas las categorías</option>
                    {nombresCategorias().map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className="col-12 col-md-5">
                <input type="search" className="form-control" placeholder="Buscar producto..." aria-label="Buscar producto"
                       value={busqueda} onChange={(e) => onChange({ busqueda: e.target.value })} />
            </div>
            <div className="col-12 col-md-3">
                <select className="form-select" aria-label="Ordenar" value={orden}
                        onChange={(e) => onChange({ orden: e.target.value })}>
                    <option value="">Orden por defecto</option>
                    <option value="precio-asc">Precio: menor a mayor</option>
                    <option value="precio-desc">Precio: mayor a menor</option>
                    <option value="nombre">Nombre A-Z</option>
                </select>
            </div>
        </div>
    );
}

export default FiltrosProductos;
