export function formatearCLP(valor) {
    const numero = Math.round(Number(valor) || 0);
    return '$' + numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatearFecha(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('es-CL') + ' ' + d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
}