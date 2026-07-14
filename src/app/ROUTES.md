# 🗺️ Rutas de la Aplicación - Padel Booking

## 📍 Estructura de Rutas

### 🏠 Dashboard
- `/` — Landing page principal
- `/landing` — Landing page alternativa

### 🔐 Autenticación
- `/auth/login` — Página de inicio de sesión
- `/auth/register` — Página de registro

### 🏟️ Clubes
- `/clubs` — Lista de clubes (por defecto)
- `/clubs/detail/:id` — Detalle de un club específico

### 🎾 Pistas
- `/courts` — Lista de pistas (por defecto)
- `/courts/form` — Formulario para crear pista
- `/courts/edit/:id` — Editar una pista específica
- `/courts/management` — Gestión de pistas

### 📅 Reservas
- `/bookings` — Módulo de reservas (protegido)

## 🔒 Protección de Rutas

- Todas las rutas bajo `/clubs`, `/courts` y `/bookings` requieren autenticación (`AuthGuard`).
- Las rutas de autenticación y dashboard son públicas.

## ⚡ Lazy Loading

Cada módulo se carga de forma perezosa:
- **Auth Module**: `/auth/*`
- **Clubs Module**: `/clubs/*`
- **Courts Module**: `/courts/*`
- **Dashboard Module**: `/` y `/landing`
- **Bookings Module**: `/bookings/*`

## 🛡️ Guards

- **AuthGuard**: Protege rutas que requieren autenticación.

## 🔄 Redirecciones

- Cualquier ruta no encontrada (`**`) redirige a `/` (home).

## 📱 Ejemplos de Navegación Programática

```typescript
this.router.navigate(['/auth/login']);
this.router.navigate(['/clubs/detail', clubId]);
this.router.navigate(['/courts/edit', courtId]);
```

## ✅ Buenas Prácticas

- Usar rutas limpias y descriptivas.
- Implementar guards para rutas sensibles.
- Usar lazy loading para optimizar el rendimiento.
- Mantener este archivo actualizado tras cada cambio de rutas. 