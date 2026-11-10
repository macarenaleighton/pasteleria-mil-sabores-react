const EQUIPO = [
    { img: '/img/equipo-reposteria.png', titulo: 'Repostería', texto: 'Maestros pasteleros con más de 50 años de tradición.' },
    { img: '/img/equipo-duoc.png', titulo: 'Comunidad Duoc', texto: 'Impulsamos la formación de nuevos talentos en gastronomía.' },
    { img: '/img/equipo-web.png', titulo: 'Equipo Web', texto: 'Estudiantes desarrollando esta tienda online como proyecto académico.' }
];

function Nosotros() {
    return (
        <>
            <h1>Nuestra historia</h1>
            <p>Pastelería 1000 Sabores celebra su 50° aniversario como un referente en la repostería chilena. En 1995 colaboramos en la creación de la torta más grande del mundo, un hito que reconoce nuestra pasión por la repostería a gran escala. Hoy renovamos nuestra tienda online para ofrecer una experiencia de compra moderna y accesible para todos nuestros clientes.</p>
            <div className="row g-4 my-3">
                <section className="col-12 col-md-6">
                    <h2>Misión</h2>
                    <p>Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces históricas y fomentamos la creatividad en la repostería.</p>
                </section>
                <section className="col-12 col-md-6">
                    <h2>Visión</h2>
                    <p>Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos talentos en gastronomía.</p>
                </section>
            </div>
            <h2>Nuestro equipo</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {EQUIPO.map((m) => (
                    <div className="col" key={m.titulo}>
                        <div className="tarjeta-simple h-100">
                            <img src={m.img} alt={m.titulo} className="img-fluid rounded mb-2" />
                            <h3>{m.titulo}</h3>
                            <p className="mb-0">{m.texto}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Nosotros;
