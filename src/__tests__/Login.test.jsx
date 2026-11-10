import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import { SesionProvider } from '../context/SesionContext.jsx';

// Mock parcial de react-router-dom: se reemplaza solo useNavigate por una función espía
const navegarMock = vi.fn();
vi.mock('react-router-dom', async (original) => ({
    ...(await original()),
    useNavigate: () => navegarMock
}));

function renderizar() {
    return render(
        <MemoryRouter>
            <SesionProvider><Login /></SesionProvider>
        </MemoryRouter>
    );
}

describe('<Login />', () => {
    beforeEach(() => navegarMock.mockClear());

    // Prueba 13
    it('con credenciales de administrador inicia sesión y redirige al panel /admin', async () => {
        renderizar();
        await userEvent.type(screen.getByLabelText('Correo'), 'macarena@duoc.cl');
        await userEvent.type(screen.getByLabelText('Contraseña'), 'admin123');
        await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

        expect(navegarMock).toHaveBeenCalledWith('/admin');
        expect(JSON.parse(localStorage.getItem('msabores_sesion')).tipo).toBe('Administrador');
    });

    // Prueba 14
    it('con contraseña incorrecta muestra un error y no navega', async () => {
        renderizar();
        await userEvent.type(screen.getByLabelText('Correo'), 'macarena@duoc.cl');
        await userEvent.type(screen.getByLabelText('Contraseña'), 'mala123');
        await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

        expect(screen.getByText('Correo o contraseña incorrectos.')).toBeInTheDocument();
        expect(navegarMock).not.toHaveBeenCalled();
    });
});
