import ProductCard from './ProductCard.jsx';

// Grilla responsiva: 1 columna en móvil, 2 en tablet, 4 en escritorio
function ProductGrid({ productos, onAgregar, mensajeVacio = 'No se encontraron productos.' }) {
    if (productos.length === 0) {
        return <p className="text-center text-secondary py-4">{mensajeVacio}</p>;
    }

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {productos.map((p) => (
                <div className="col" key={p.codigo}>
                    <ProductCard producto={p} onAgregar={onAgregar} />
                </div>
            ))}
        </div>
    );
}

export default ProductGrid;
