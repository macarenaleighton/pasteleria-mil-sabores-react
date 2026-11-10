import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Checkout from '../pages/Checkout.jsx';
import { CarritoProvider } from '../context/CarritoContext.jsx';
import { SesionProvider } from '../context/SesionContext.jsx';
import { procesarPago } from '../services/pagos.js';

// Mock del servicio de pago: aísla la prueba de la demora y decide el resultado
vi.mock('../services/pagos.js', () => ({ procesarPago: vi.fn() }));

const usuarioSesion = { run: '178965038', nombre: 'Camila', apellidos: 'Torres Díaz', correo: 'camila.torres@gmail.com', tipo: 'Cliente', region: 'Región de la Araucanía', comuna: 'Temuco', direccion: 'Pasaje Los Aromos 789' };

function renderizarCheckout() {
    localStorage.setItem('msabores_carrito', JSON.stringify([{ codigo: 'PI001', nombre: 'Mousse de Chocolate', precio: 5000, imagen: '🍮', stock: 30, cantidad: 2 }]));
    localStorage.setItem('msabores_sesion', JSON.stringify(usuarioSesion));
    return render(
        <MemoryRouter initialEntries={['/checkout']}>
            <SesionProvider>
                <CarritoProvider>
                    <Routes>
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/compra-exitosa/:id" element={<p>Pantalla de éxito</p>} />
                        <Route path="/compra-fallida" element={<p>Pantalla de pago fallido</p>} />
                    </Routes>
                </CarritoProvider>
            </SesionProvider>
        </MemoryRouter>
    );
}

describe('<Checkout />', () => {
    beforeEach(() => procesarPago.mockReset());

    // Prueba 15
    it('autocompleta los datos de la sesión y, si el pago es rechazado, redirige a compra fallida', async () => {
        procesarPago.mockResolvedValue({ aprobado: false, motivo: 'Rechazado' });
        renderizarCheckout();

        expect(screen.getByLabelText('Nombre')).toHaveValue('Camila');
        expect(screen.getByTestId('total-orden')).toHaveTextContent('$13.990'); // 2×5.000 + 3.990 envío

        await userEvent.click(screen.getByRole('button', { name: 'Pagar ahora' }));

        expect(procesarPago).toHaveBeenCalledWith({ total: 13990, simularRechazo: false });
        expect(await screen.findByText('Pantalla de pago fallido')).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('msabores_carrito'))).toHaveLength(1); // el carrito se conserva
    });

    // Prueba 16
    it('si el pago es aprobado registra la orden, vacía el carrito y muestra compra exitosa', async () => {
        procesarPago.mockResolvedValue({ aprobado: true });
        renderizarCheckout();

        await userEvent.click(screen.getByLabelText(/Retiro en tienda/));
        await userEvent.click(screen.getByRole('button', { name: 'Pagar ahora' }));

        expect(await screen.findByText('Pantalla de éxito')).toBeInTheDocument();
        const ordenes = JSON.parse(localStorage.getItem('msabores_ordenes'));
        const nueva = ordenes[ordenes.length - 1]; // después de las 3 órdenes de ejemplo
        expect(nueva).toMatchObject({ id: 'ORD-0004', estado: 'Pagada', total: 10000, usuarioRun: '178965038' });
        expect(JSON.parse(localStorage.getItem('msabores_carrito'))).toEqual([]);
    });
});
