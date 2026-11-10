# Pastelería Mil Sabores — Tienda online en React

Proyecto semestral **DSY1104 Desarrollo Fullstack II** · Evaluación Parcial 2 (DuocUC) · Sección 001D · Individual · Macarena Leighton.

Migración de la tienda HTML/CSS/JS de la EP1 (caso Forma C) a **React + Vite**, con **React Router**, **Bootstrap 5** y pruebas unitarias con **Vitest + React Testing Library**.

## Requisitos
- Node.js 20 o superior

## Ejecución
```bash
npm install
npm run dev          # abre http://localhost:5173
```

## Pruebas
```bash
npm test               # ejecuta las 20 pruebas una vez
npm run test:watch     # modo observador
npm run test:coverage  # pruebas + reporte de cobertura (carpeta coverage/)
```

## Usuarios de demostración
| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | macarena@duoc.cl | admin123 |
| Vendedor | javier.munoz@gmail.com | vende123 |
| Cliente | camila.torres@gmail.com | cliente1 |

> Los datos se guardan en `localStorage`. Para reiniciar la demo: DevTools → Application → Local Storage → borrar las claves `msabores_*`.

## Estructura
```
src/
├── components/         Componentes reutilizables (Header, Footer, Layout, ProductCard, ProductGrid,
│   │                   CampoFormulario, SelectorRegionComuna, ItemCarrito, ResumenOrden, Alerta...)
│   └── admin/          AdminLayout, TarjetaEstadistica
├── pages/              Vistas de la tienda (Home, Productos, Categorías, Ofertas, Carrito, Checkout,
│   │                   CompraExitosa, CompraFallida, Login, Registro, Contacto, Blogs, Nosotros)
│   └── admin/          Dashboard, productos, críticos, categorías, usuarios + historial,
│                       órdenes/boleta, reportes y perfil
├── context/            CarritoContext y SesionContext (estado global)
├── data/               Fuente de datos simulada con CRUD (productos, categorías, usuarios, órdenes,
│                       regiones, blogs) + funciones de reportes
├── services/           pagos.js (pago simulado, se reemplaza por backend en EP3)
├── utils/              validaciones.js, carrito.js, formato.js (lógica pura)
├── styles/app.css      Estilos propios que complementan Bootstrap
└── __tests__/          20 pruebas unitarias (Vitest + RTL)
```

## Rutas
| Ruta | Vista |
|---|---|
| `/` | Home |
| `/productos`, `/productos/:codigo` | Catálogo con filtros y detalle |
| `/categorias?c=...` | Productos por categoría |
| `/ofertas` | Productos con descuento |
| `/carrito` → `/checkout` | Carrito y pago |
| `/compra-exitosa/:id`, `/compra-fallida` | Resultado de la compra |
| `/login`, `/registro`, `/contacto`, `/nosotros`, `/blogs` | Vistas informativas y formularios |
| `/admin` | Dashboard con indicadores y accesos rápidos |
| `/admin/ordenes`, `/admin/ordenes/:id` | Órdenes y boleta |
| `/admin/productos` (+ `/nuevo`, `/:codigo`, `/:codigo/editar`) | CRUD de productos y detalle |
| `/admin/productos/criticos` | Productos con stock crítico |
| `/admin/categorias` (+ `/nueva`, `/:id/editar`) | CRUD de categorías (solo Administrador) |
| `/admin/usuarios` (+ `/nuevo`, `/:run`, `/:run/editar`) | CRUD de usuarios e historial de compras (solo Administrador) |
| `/admin/reportes` | Reportes de ventas |
| `/admin/perfil` | Perfil del usuario conectado |

El panel exige sesión de **Administrador** o **Vendedor**; el Vendedor no ve Categorías ni Usuarios.

En el checkout, la casilla **"Modo demostración: simular pago rechazado"** permite mostrar el flujo de pago fallido.