import { Link, useParams } from 'react-router-dom';
import { obtenerBlogPorId } from '../data/blogs.js';

function BlogDetalle() {
    const { id } = useParams();
    const blog = obtenerBlogPorId(id);

    if (!blog) {
        return <p>No encontramos esta publicación. <Link to="/blogs">Volver a Blogs</Link>.</p>;
    }

    return (
        <article className="mx-auto" style={{ maxWidth: 760 }}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/blogs">Blogs</Link></li>
                    <li className="breadcrumb-item active">{blog.titulo}</li>
                </ol>
            </nav>
            <div className="text-center display-1">{blog.icono}</div>
            <h1>{blog.titulo}</h1>
            <p>{blog.cuerpo}</p>
            <Link to="/blogs" className="btn btn-secundario">Volver a Blogs</Link>
        </article>
    );
}

export default BlogDetalle;
