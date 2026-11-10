import { describe, it, expect } from 'vitest';
import { validarRun, dominioCorreoPermitido, validarRegistro } from '../utils/validaciones.js';

describe('Validaciones (lógica pura)', () => {
    // Prueba 1
    it('valida el RUN y el dominio del correo según las reglas del negocio', () => {
        expect(validarRun('190110229')).toBe(true);
        expect(validarRun('12345678K')).toBe(true);
        expect(validarRun('12-34')).toBe(false); // muy corto y con guion

        expect(dominioCorreoPermitido('ana@duoc.cl')).toBe(true);
        expect(dominioCorreoPermitido('profe@profesor.duoc.cl')).toBe(true);
        expect(dominioCorreoPermitido('ana@hotmail.com')).toBe(false);
    });

    // Prueba 2
    it('validarRegistro detecta campos obligatorios vacíos y contraseñas distintas', () => {
        const errores = validarRegistro({ run: '', nombre: '', apellidos: '', correo: '', clave: 'abcd', clave2: 'zzzz', region: '', comuna: '', direccion: '' });

        expect(errores.run).toBe('El RUN es obligatorio.');
        expect(errores.correo).toBe('El correo es obligatorio.');
        expect(errores.clave2).toBe('Las contraseñas no coinciden.');
        expect(errores.region).toBeDefined();
        expect(errores.clave).toBeUndefined(); // "abcd" sí cumple 4-10 caracteres
    });
});
