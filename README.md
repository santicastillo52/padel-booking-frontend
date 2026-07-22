# Padel Booking — Frontend

Aplicación web para reservar canchas de pádel. Permite a jugadores buscar turnos disponibles y a administradores de clubes gestionar canchas, horarios y reservas.

Frontend en **Angular 18**, conectado a una API REST.

### Demo en vivo

**[https://padel-booking-frontend-navy.vercel.app/](https://padel-booking-frontend-navy.vercel.app/)**

> El backend corre en Render (plan free): la primera request puede tardar unos segundos si el servicio estaba dormido.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| Angular 18 | Framework principal (componentes standalone + lazy loading) |
| TypeScript 5.5 | Tipado estático |
| RxJS | Streams y llamadas HTTP |
| Bootstrap 5 + Bootstrap Icons | Utilidades base e iconografía |
| SweetAlert2 | Alertas y confirmaciones |
| SCSS | Design system propio (tokens + componentes UI) |

---

## Requisitos

- Node.js 18+ (recomendado LTS)
- npm 9+
- Backend de Padel Booking corriendo (local o remoto)

---

## Instalación y arranque

```bash
# Clonar el repositorio (si aplica)
cd Padel-Frontend

# Instalar dependencias
npm install

# Servidor de desarrollo
npm start
```

La app queda disponible en [http://localhost:4200/](http://localhost:4200/).

### Configurar la API

La URL del backend se define en `src/app/shared/utils/constants.ts`:

```ts
// Producción / remoto
export const API_BASE_URL = 'https://padel-booking-backend.onrender.com';

// Local (descomentar y comentar la de arriba)
// export const API_BASE_URL = 'http://localhost:3000';
```

Asegurate de apuntar a un backend activo antes de probar login, reservas o carga de imágenes.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Levanta el servidor de desarrollo (`ng serve`) |
| `npm run build` | Build de producción en `dist/` |
| `npm run watch` | Build en modo watch (development) |
| `npm test` | Tests unitarios con Karma/Jasmine |

---

## Roles y funcionalidades

### Cliente (`client`)

- Ver landing / inicio
- Buscar canchas por día, horario, club, tipo y pared
- Reservar turnos disponibles
- Ver y cancelar sus reservas
- Consultar clubes y detalle
- Editar su perfil (nombre, posición, categoría)

### Administrador de club (`admin`)

- Gestionar canchas del club (alta, edición, baja)
- Administrar imágenes de canchas
- Crear y eliminar horarios
- Confirmar / cancelar / eliminar reservas
- Ver perfil del club

---

## Estructura del proyecto

```
src/
├── app/
│   ├── core/                 # Núcleo de la app
│   │   ├── guards/           # AuthGuard
│   │   ├── interceptors/     # Token JWT en requests
│   │   ├── models/           # Interfaces (User, Club, Court, etc.)
│   │   └── services/         # Auth, clubs, courts, bookings, alerts...
│   ├── features/             # Módulos por dominio (lazy loaded)
│   │   ├── auth/             # Login y registro
│   │   ├── bookings/         # Búsqueda y reserva de canchas
│   │   ├── clubs/            # Listado y detalle de clubes
│   │   ├── courts/           # Gestión, horarios, reservas
│   │   ├── dashboard/        # Landing
│   │   └── users/            # Perfil de usuario
│   ├── layout/               # Header y footer
│   └── shared/
│       ├── components/       # Slider, loading, etc.
│       ├── pipes/            # position, gender, dayName, status...
│       ├── ui/               # Design system (botones, cards, panels...)
│       └── utils/            # Constantes y helpers
├── assets/                   # Imágenes y estáticos
└── styles/                   # Tokens, base, layout y componentes globales
```

Más detalle de carpetas en [`src/app/README.md`](src/app/README.md) y de rutas en [`src/app/ROUTES.md`](src/app/ROUTES.md).

---

## Rutas principales

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Landing |
| `/auth/login` | Público | Inicio de sesión |
| `/auth/register` | Público | Registro de usuario |
| `/bookings` | Auth | Buscar y reservar canchas |
| `/courts/reservations` | Auth | Mis reservas / gestión de reservas |
| `/clubs` | Auth | Listado de clubes |
| `/clubs/detail/:id` | Auth | Detalle de un club |
| `/users/profile` | Auth (client) | Perfil del jugador |
| `/courts/management` | Auth (admin) | Gestor de canchas |
| `/courts/detail/:id` | Auth (admin) | Detalle / edición de cancha |

Las rutas de `users`, `clubs`, `courts` y `bookings` están protegidas con `AuthGuard`.

---

## Autenticación

1. Login / registro guardan el token en `localStorage` (`STORAGE_KEYS.TOKEN`).
2. Un interceptor HTTP adjunta el token a las peticiones.
3. `AuthGuard` bloquea el acceso a rutas privadas si no hay sesión.
4. El header muestra navegación distinta según el rol (`client` / `admin`).

---

## Design system (UI)

Paleta inspirada en una cancha de pádel (azul césped + estructura negra + blanco):

| Token | Color | Uso |
|---|---|---|
| Court blue | `#1a52d4` | Acciones primarias, acentos |
| Black | `#111111` | Header, paneles, bordes |
| White | `#ffffff` | Superficies y texto sobre oscuro |
| Page bg | `#eef1f6` | Fondo general |

### Componentes reutilizables (`src/app/shared/ui/`)

| Selector | Descripción |
|---|---|
| `app-ui-button` | Botón con variantes: `primary`, `secondary`, `ghost`, `danger`, `success`, `outline` |
| `app-ui-card` | Tarjeta con slots `card-media` y `card-footer` |
| `app-ui-panel` | Contenedor de formularios (`wide` para ancho completo) |
| `app-ui-badge` | Etiquetas: `blue`, `dark`, `outline` |
| `app-ui-page-header` | Título + subtítulo de página |
| `app-ui-empty-state` | Estado vacío con ícono |

Estilos globales en:

- `src/styles/_tokens.scss` — variables
- `src/styles/_base.scss` — tipografía y reset
- `src/styles/_layout.scss` — utilidades de página
- `src/styles/_components.scss` — botones, forms, tablas, cards

### Ejemplo de uso

```html
<app-ui-button variant="primary" [fullWidth]="true" [disabled]="isSubmitting">
  {{ messageButton }}
</app-ui-button>

<app-ui-card title="Club Norte" [clickable]="true" (cardClick)="verClub(id)">
  <div card-media>
    <img src="assets/files/club1.jpg" alt="Club" />
  </div>
  <p>Av. Siempre Viva 123</p>
</app-ui-card>
```

---

## Feedback de operaciones

En formularios y acciones async se usa el patrón:

1. `isSubmitting = true`
2. Texto del botón → `"Guardando..."` / `"Reservando..."` / etc.
3. Botón deshabilitado
4. Al terminar (éxito o error) se restaura el estado

Esto aplica en login, edición de cancha, imágenes, horarios, perfil y reserva de turnos.

---

## Convenciones de código

- Carpetas y archivos en **kebab-case**
- Clases en **PascalCase**
- Variables/métodos en **camelCase**
- Features con **lazy loading** por módulo
- Preferir componentes **standalone** y exports vía `index.ts`
- No hardcodear la URL de API: usar `API_BASE_URL`

---

## Build de producción

```bash
npm run build
```

Los artefactos se generan en `dist/padel-front-end/`.

---

## Documentación relacionada

- [`src/app/README.md`](src/app/README.md) — estructura interna de `app/`
- [`src/app/ROUTES.md`](src/app/ROUTES.md) — mapa de rutas y guards

---

## Licencia

Proyecto privado (`"private": true` en `package.json`).
