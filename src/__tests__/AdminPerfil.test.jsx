import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AdminPerfil from '../pages/admin/AdminPerfil.jsx';
import { SesionProvider } from '../context/SesionContext.jsx';
import { autenticar } from '../data/usuarios.js';

function renderizarConSesion() {
    // Sesión iniciada como el administrador de demostración
    localStorage.setItem('msabores_sesion', JSON.stringify(autenticar('macarena@duoc.cl', 'admin123')));
    return render(<MemoryRouter><SesionProvider><AdminPerfil /></SesionProvider></MemoryRouter>);
}

describe('<AdminPerfil />', () => {
    // Prueba 20
    it('valida que las contraseñas coincidan y guarda los cambios en los datos y en la sesión', async () => {
        renderizarConSesion();
        const nombre = screen.getByLabelText('Nombre');
        expect(nombre).toHaveValue('Macarena');

        await userEvent.type(screen.getByLabelText('Nueva contraseña'), 'nueva1');
        await userEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
        expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument();

        await userEvent.type(screen.getByLabelText('Repetir contraseña'), 'nueva1');
        await userEvent.clear(nombre);
        await userEvent.type(nombre, 'Maca');
        await userEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));

        expect(screen.getByText('Perfil actualizado correctamente.')).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('msabores_sesion')).nombre).toBe('Maca');
        expect(autenticar('macarena@duoc.cl', 'nueva1')).not.toBeNull(); // la nueva clave funciona
    });
});
