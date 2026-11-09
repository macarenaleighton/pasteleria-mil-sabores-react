export const BLOGS = [
    {
        id: '1',
        imagen: '/img/blog-torta-record.png',
        icono: '🏆',
        titulo: 'La torta más grande del mundo',
        resumen: 'En 1995 nuestro equipo participó en un récord Guinness al colaborar en la creación de la torta más grande del mundo.',
        cuerpo: 'En 1995, Pastelería 1000 Sabores participó en la creación de la torta más grande del mundo, un proyecto que reunió a decenas de reposteros y que quedó registrado en el libro Guinness de los récords. Durante semanas se planificó cada detalle: la estructura, los ingredientes en cantidades industriales y la logística para transportar y exhibir la creación. Este hito no solo puso a nuestra pastelería en el mapa, sino que además consolidó nuestra filosofía: no hay límite para la creatividad cuando se trabaja con pasión.'
    },
    {
        id: '2',
        imagen: '/img/blog-aniversario.png',
        icono: '🎉',
        titulo: '50 años endulzando Chile',
        resumen: 'Pastelería 1000 Sabores cumple 50 años acompañando celebraciones familiares. Te contamos cómo nació la receta original.',
        cuerpo: 'Durante cinco décadas, Pastelería 1000 Sabores ha acompañado cumpleaños, matrimonios y celebraciones familiares en todo Chile. Nuestra receta original de manjar casero nació en una pequeña cocina familiar y, con el tiempo, se transformó en el sello que hoy nos identifica. En este aniversario queremos agradecer a cada cliente que confió en nosotros y reafirmar nuestro compromiso de seguir innovando sin perder la tradición.'
    }
];

export function obtenerBlogPorId(id) {
    return BLOGS.find((b) => b.id === id) || null;
}