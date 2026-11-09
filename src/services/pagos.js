
export function procesarPago({ total, simularRechazo = false }) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (simularRechazo || total <= 0) {
                resolve({ aprobado: false, motivo: 'El pago fue rechazado por el medio de pago.' });
            } else {
                resolve({ aprobado: true, codigoAutorizacion: `AUT-${Date.now().toString().slice(-6)}` });
            }
        }, 600);
    });
}