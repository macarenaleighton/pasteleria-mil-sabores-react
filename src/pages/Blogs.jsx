import { Link } from 'react-router-dom';
import { BLOGS } from '../data/blogs.js';

function Blogs() {
    return (
        <>
            <h1>Noticias importantes</h1>
            {BLOGS.map((b) => (
                <article key={b.id} className="tarjeta-blog row g-3 align-items-center">
                    <div className="col-12 col-sm-3 text-center">
                        <img src={b.imagen} alt={b.titulo} className="img-fluid rounded" style={{ maxWidth: 160 }} />
                    </div>
                    <div className="col-12 col-sm-9">
                        <h2 className="h4">{b.titulo}</h2>
                        <p>{b.resumen}</p>
                        <Link to={`/blogs/${b.id}`} className="btn btn-secundario btn-pequeno">Ver caso</Link>
                    </div>
                </article>
            ))}
        </>
    );
}

export default Blogs;
