export const REGIONES = [
    { nombre: 'Región Metropolitana de Santiago', comunas: ['Santiago', 'Providencia', 'Las Condes', 'Maipú', 'Puente Alto'] },
    { nombre: 'Región de la Araucanía', comunas: ['Temuco', 'Villarrica', 'Angol', 'Pucón'] },
    { nombre: 'Región de Ñuble', comunas: ['Chillán', 'San Carlos', 'Bulnes', 'Quirihue'] }
];

export function comunasDeRegion(nombreRegion) {
    const region = REGIONES.find((r) => r.nombre === nombreRegion);
    return region ? region.comunas : [];
}