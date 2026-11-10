import { Link } from 'react-router-dom';

function NoEncontrado() {
    return (
        <div className="text-center py-5">
            <div className="display-1">🧁</div>
            <h1>Página no encontrada</h1>
            <Link to="/" className="btn btn-primario mt-3">Volver al inicio</Link>
        </div>
    );
}

export default NoEncontrado;
