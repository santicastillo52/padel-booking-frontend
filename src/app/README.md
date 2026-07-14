# Estructura del Proyecto Angular - Padel Booking

## 📁 Estructura de Carpetas

```
src/app/
├── core/                    # Funcionalidades core de la aplicación
│   ├── guards/             # Guards de autenticación y autorización
│   ├── interceptors/       # Interceptores HTTP
│   ├── models/             # Interfaces y tipos globales
│   └── services/           # Servicios singleton de la aplicación
├── shared/                 # Componentes y utilidades compartidas
│   ├── components/         # Componentes reutilizables
│   ├── directives/         # Directivas personalizadas
│   ├── pipes/             # Pipes personalizados
│   └── utils/             # Utilidades, constantes y helpers
├── features/               # Módulos de características
│   ├── auth/              # Módulo de autenticación
│   ├── clubs/             # Módulo de clubes
│   ├── courts/            # Módulo de pistas
│   ├── bookings/          # Módulo de reservas
│   └── dashboard/         # Módulo del dashboard
└── layout/                # Componentes de layout
    ├── header/
    └── footer/
```

## 🏗️ Organización por Características

### Core
- **Guards**: Protección de rutas y autorización
- **Interceptors**: Manejo automático de tokens HTTP
- **Models**: Interfaces TypeScript para tipos de datos
- **Services**: Servicios singleton para lógica de negocio

### Shared
- **Components**: Componentes reutilizables (botones, modales, etc.)
- **Directives**: Directivas personalizadas
- **Pipes**: Pipes para transformación de datos
- **Utils**: Constantes, helpers y utilidades comunes

### Features
Cada feature contiene:
- Componentes específicos de la funcionalidad
- Servicios específicos (si aplica)
- Modelos específicos (si aplica)
- Archivo index.ts para exportaciones

### Layout
- Componentes de estructura de la aplicación
- Header, footer, sidebar, etc.

## 📦 Archivos de Índice

Cada carpeta tiene un archivo `index.ts` que exporta todos sus elementos:

```typescript
// Ejemplo: src/app/core/models/index.ts
export * from './user.model';
export * from './club.model';
export * from './court.model';
export * from './schedules.model';
```

## 🔧 Importaciones

### Importaciones desde Core
```typescript
import { User, Club, Court } from '@core/models';
import { AuthService, CourtService } from '@core/services';
import { AuthGuard } from '@core/guards';
```

### Importaciones desde Shared
```typescript
import { SliderComponent } from '@shared/components';
import { formatDate, isValidEmail } from '@shared/utils';
```

### Importaciones desde Features
```typescript
import { LoginComponent, RegisterComponent } from '@features/auth';
import { ClubListComponent } from '@features/clubs';
```

## 🚀 Beneficios de esta Estructura

1. **Escalabilidad**: Fácil agregar nuevas características
2. **Mantenibilidad**: Código organizado y fácil de encontrar
3. **Reutilización**: Componentes y utilidades compartidas
4. **Separación de Responsabilidades**: Cada carpeta tiene un propósito específico
5. **Importaciones Limpias**: Archivos de índice facilitan las importaciones

## 📝 Convenciones

- **Nombres de carpetas**: kebab-case (ej: `court-management`)
- **Nombres de archivos**: kebab-case (ej: `court-form.component.ts`)
- **Nombres de clases**: PascalCase (ej: `CourtFormComponent`)
- **Nombres de variables**: camelCase (ej: `courtService`)

## 🔄 Próximos Pasos

1. Configurar path mapping en `tsconfig.json` para importaciones más limpias
2. Implementar lazy loading para los features
3. Crear módulos específicos para cada feature
4. Agregar testing para cada componente y servicio 