import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario.jsx';
import SelectorRegionComuna from '../components/SelectorRegionComuna.jsx';
import ResumenOrden from '../components/ResumenOrden.jsx';
import Alerta from '../components/Alerta.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { useSesion } from '../context/SesionContext.jsx';
import { crearOrden } from '../data/ordenes.js';
import { descontarStock } from '../data/productos.js';
import { procesarPago } from '../services/pagos.js';
import { OPCIONES_ENTREGA, costoEntrega } from '../utils/carrito.js';
import { esFormularioValido, validarCheckout } from '../utils/validaciones.js';

// Si hay sesión iniciada, los datos del cliente se completan automáticamente
function datosIniciales(usuario) {
    return {
        nombre: usuario?.nombre || '',
        apellidos: usuario?.apellidos || '',
        correo: usuario?.correo || '',
        region: usuario?.region || '',
        comuna: usuario?.comuna || '',
        calle: usuario?.direccion || '',
        departamento: '',
        indicaciones: '',
        entrega: 'domicilio',
        simularRechazo: false
    };
}

function Checkout() {
    const { carrito, total, vaciar } = useCarrito();
    const { usuario } = useSesion();
    const navigate = useNavigate();
    const [datos, setDatos] = useState(() => datosIniciales(usuario));
    const [errores, setErrores] = useState({});
    const [procesando, setProcesando] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    if (carrito.length === 0) {
        return (
            <div className="carrito-vacio">
                <p>No hay productos para pagar.</p>
                <Link to="/productos" className="btn btn-primario">Ver productos</Link>
            </div>
        );
    }

    const envio = costoEntrega(datos.entrega);
    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target;
        setDatos({ ...datos, [name]: type === 'checkbox' ? checked : value });
    };

    async function manejarEnvio(e) {
        e.preventDefault();
        const nuevosErrores = validarCheckout(datos);
        setErrores(nuevosErrores);
        if (!esFormularioValido(nuevosErrores)) {
            setMensaje('Revisa los campos marcados en rojo.');
            return;
        }
        setMensaje(null);
        setProcesando(true);
        const resultado = await procesarPago({ total: total + envio, simularRechazo: datos.simularRechazo });
        setProcesando(false);

        // eslint-disable-next-line no-unused-vars
        const { simularRechazo, ...cliente } = datos;
        const orden = crearOrden({
            usuarioRun: usuario?.run || null,
            cliente,
            items: carrito,
            subtotal: total,
            envio,
            total: total + envio,
            estado: resultado.aprobado ? 'Pagada' : 'Rechazada',
            motivo: resultado.motivo || null
        });

        if (resultado.aprobado) {
            descontarStock(carrito);
            vaciar();
            navigate(`/compra-exitosa/${orden.id}`);
        } else {
            navigate('/compra-fallida', { state: { ordenId: orden.id } });
        }
    }

    return (
        <>
            <h1>Checkout</h1>
            <div className="row g-4">
                <div className="col-12 col-lg-7">
                    <form className="bg-white rounded p-4" onSubmit={manejarEnvio} noValidate>
                        {usuario && <p className="small text-success">Datos completados desde tu cuenta ({usuario.correo}).</p>}
                        <Alerta tipo="error" mensaje={mensaje} />
                        <h2 className="h5">Información del cliente</h2>
                        <div className="row">
                            <CampoFormulario className="col-12 col-md-6" id="nombre" name="nombre" label="Nombre" value={datos.nombre} onChange={manejarCambio} error={errores.nombre} />
                            <CampoFormulario className="col-12 col-md-6" id="apellidos" name="apellidos" label="Apellidos" value={datos.apellidos} onChange={manejarCambio} error={errores.apellidos} />
                        </div>
                        <CampoFormulario id="correo" name="correo" label="Correo" value={datos.correo} onChange={manejarCambio} error={errores.correo} />

                        <h2 className="h5 mt-3">Dirección de entrega</h2>
                        <div className="row">
                            <CampoFormulario className="col-12 col-md-8" id="calle" name="calle" label="Calle y número" value={datos.calle} onChange={manejarCambio} error={errores.calle} />
                            <CampoFormulario className="col-12 col-md-4" id="departamento" name="departamento" label="Depto. (opcional)" value={datos.departamento} onChange={manejarCambio} />
                        </div>
                        <SelectorRegionComuna region={datos.region} comuna={datos.comuna} errores={errores}
                                              onChange={(cambio) => setDatos({ ...datos, ...cambio })} />
                        <CampoFormulario como="textarea" id="indicaciones" name="indicaciones" label="Indicaciones para la entrega (opcional)" rows={2}
                                         value={datos.indicaciones} onChange={manejarCambio} error={errores.indicaciones} />

                        <h2 className="h5 mt-3">Opciones de entrega</h2>
                        {OPCIONES_ENTREGA.map((o) => (
                            <div className="form-check" key={o.valor}>
                                <input className="form-check-input" type="radio" name="entrega" id={`entrega-${o.valor}`}
                                       value={o.valor} checked={datos.entrega === o.valor} onChange={manejarCambio} />
                                <label className="form-check-label" htmlFor={`entrega-${o.valor}`}>
                                    {o.etiqueta} {o.costo > 0 ? `(+$${o.costo.toLocaleString('es-CL')})` : '(gratis)'}
                                </label>
                            </div>
                        ))}
                        {errores.entrega && <div className="invalid-feedback d-block">{errores.entrega}</div>}

                        <div className="form-check mt-4 demo-pago">
                            <input className="form-check-input" type="checkbox" id="simularRechazo" name="simularRechazo"
                                   checked={datos.simularRechazo} onChange={manejarCambio} />
                            <label className="form-check-label small" htmlFor="simularRechazo">
                                Modo demostración: simular pago rechazado
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primario w-100 mt-3" disabled={procesando}>
                            {procesando ? 'Procesando pago...' : 'Pagar ahora'}
                        </button>
                    </form>
                </div>
                <div className="col-12 col-lg-5">
                    <ResumenOrden items={carrito} envio={envio} />
                </div>
            </div>
        </>
    );
}

export default Checkout;

