import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CampoFormulario from '../../components/CampoFormulario.jsx';
import Alerta from '../../components/Alerta.jsx';
import { nombresCategorias } from '../../data/categorias.js';
import { actualizarProducto, crearProducto, obtenerProductoPorCodigo } from '../../data/productos.js';
import { esFormularioValido, validarProducto } from '../../utils/validaciones.js';

const VACIO = { codigo: '', nombre: '', descripcion: '', precio: '', descuento: '0', categoria: '', stock: '', stockCritico: '', imagen: '' };

// Mismo componente para crear (/admin/productos/nuevo) y editar (/admin/productos/:codigo/editar)
function AdminProductoForm() {
    const { codigo } = useParams();
    const esEdicion = Boolean(codigo);
    const navigate = useNavigate();
    const [datos, setDatos] = useState(() => {
        const existente = esEdicion ? obtenerProductoPorCodigo(codigo) : null;
        return existente ? { ...VACIO, ...existente } : VACIO;
    });
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState(null);

    const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

    function manejarEnvio(e) {
        e.preventDefault();
        const nuevosErrores = validarProducto(datos, { esEdicion, codigoExiste: (c) => Boolean(obtenerProductoPorCodigo(c)) });
        setErrores(nuevosErrores);
        if (!esFormularioValido(nuevosErrores)) {
            setMensaje({ tipo: 'error', texto: 'Revisa los campos marcados en rojo.' });
            return;
        }
        const producto = {
            codigo: datos.codigo.trim(),
            nombre: datos.nombre.trim(),
            descripcion: datos.descripcion.trim(),
            precio: Number(datos.precio),
            descuento: Number(datos.descuento) || 0,
            categoria: datos.categoria,
            stock: Number(datos.stock),
            stockCritico: Number(datos.stockCritico) || 0,
            imagen: datos.imagen.trim() || '🍰'
        };
        if (esEdicion) actualizarProducto(codigo, producto);
        else crearProducto(producto);
        navigate('/admin/productos');
    }

    return (
        <>
            <div className="admin-topbar"><h1>{esEdicion ? 'Editar producto' : 'Nuevo producto'}</h1></div>
            <div className="admin-card" style={{ maxWidth: 720 }}>
                <Alerta tipo={mensaje?.tipo} mensaje={mensaje?.texto} />
                <form onSubmit={manejarEnvio} noValidate>
                    <CampoFormulario id="codigo" name="codigo" label="Código de producto" value={datos.codigo} onChange={manejarCambio}
                                     error={errores.codigo} disabled={esEdicion} ayuda="Obligatorio, mínimo 3 caracteres. No se puede editar tras crear el producto." />
                    <CampoFormulario id="nombre" name="nombre" label="Nombre" maxLength={100} value={datos.nombre} onChange={manejarCambio} error={errores.nombre} />
                    <CampoFormulario como="textarea" id="descripcion" name="descripcion" label="Descripción (opcional)" rows={3} maxLength={500}
                                     value={datos.descripcion} onChange={manejarCambio} error={errores.descripcion} />
                    <div className="row">
                        <CampoFormulario className="col-12 col-md-4" id="precio" name="precio" type="number" min="0" label="Precio (CLP)" value={datos.precio} onChange={manejarCambio} error={errores.precio} />
                        <CampoFormulario className="col-12 col-md-4" id="descuento" name="descuento" type="number" min="0" max="90" label="Descuento (%)" value={datos.descuento} onChange={manejarCambio} error={errores.descuento} ayuda="Mayor a 0 = aparece en Ofertas" />
                        <CampoFormulario className="col-12 col-md-4" como="select" id="categoria" name="categoria" label="Categoría" value={datos.categoria} onChange={manejarCambio} error={errores.categoria}>
                            <option value="">-- Seleccione --</option>
                            {nombresCategorias().map((c) => <option key={c} value={c}>{c}</option>)}
                        </CampoFormulario>
                    </div>
                    <div className="row">
                        <CampoFormulario className="col-12 col-md-4" id="stock" name="stock" type="number" min="0" step="1" label="Stock" value={datos.stock} onChange={manejarCambio} error={errores.stock} />
                        <CampoFormulario className="col-12 col-md-4" id="stockCritico" name="stockCritico" type="number" min="0" step="1" label="Stock crítico (opcional)" value={datos.stockCritico} onChange={manejarCambio} error={errores.stockCritico} />
                        <CampoFormulario className="col-12 col-md-4" id="imagen" name="imagen" label="Ícono (emoji)" maxLength={4} placeholder="🎂" value={datos.imagen} onChange={manejarCambio} />
                    </div>
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primario">Guardar producto</button>
                        <Link to="/admin/productos" className="btn btn-secundario">Cancelar</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AdminProductoForm;
