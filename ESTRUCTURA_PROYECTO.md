# 📋 Documentación Completa - Plataforma de Gestión de Pasantías UPDS

## 📚 Tabla de Contenidos
1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Descripción Detallada de Carpetas](#descripción-detallada-de-carpetas)
4. [Descripción Detallada de Archivos](#descripción-detallada-de-archivos)
5. [Tecnologías Utilizadas](#tecnologías-utilizadas)
6. [Configuración y Setup](#configuración-y-setup)
7. [Rutas de la Aplicación](#rutas-de-la-aplicación)
8. [Flujo de Datos](#flujo-de-datos)

---

## 🎯 Descripción General

**Plataforma de Gestión de Pasantías UPDS** es una aplicación web moderna, responsive y completamente tipada con TypeScript construida con React, Vite y Tailwind CSS. La plataforma facilita a estudiantes de la UPDS explorar, filtrar y postular a oportunidades de pasantías en instituciones reales, mientras proporciona a administradores herramientas para gestionar ofertas.

### Características Principales:
- ✅ **Landing page educativa** con guía de pasantías
- ✅ **Sistema de filtrado dinámico** por carrera y búsqueda
- ✅ **Priorización de ofertas urgentes** vs. generales
- ✅ **Visualización expandible** de detalles de empresas con mapas
- ✅ **Galería de casos de éxito** con historias reales
- ✅ **Centro de documentos** descargables
- ✅ **Panel administrativo** para gestionar ofertas
- ✅ **Diseño 100% responsive** optimizado para móvil

---

## 📁 Estructura del Proyecto

```
UPDS-Pasantias/
├── 📄 package.json              # Dependencias y scripts npm
├── 📄 package-lock.json         # Lock file de npm
├── 📄 tsconfig.json             # Configuración de TypeScript
├── 📄 vite.config.js            # Configuración de Vite
├── 📄 eslint.config.js          # Reglas de linting
├── 📄 index.html                # Archivo HTML principal
├── 📄 README.md                 # README original (template)
├── 📄 ESTRUCTURA_PROYECTO.md    # Este archivo
│
├── 📂 src/                      # Código fuente principal
│   ├── 📄 main.tsx              # Punto de entrada React
│   ├── 📄 App.tsx               # Componente raíz y router
│   ├── 📄 App.css               # Estilos globales de App
│   ├── 📄 index.css             # Estilos globales + Tailwind
│   ├── 📄 vite-env.d.ts         # Tipos de ambiente Vite
│   │
│   ├── 📂 types/                # Definiciones de tipos TypeScript
│   │   └── 📄 index.ts          # Interfaces y tipos globales
│   │
│   ├── 📂 data/                 # Base de datos mock
│   │   ├── 📄 mockDatabase.ts   # Datos simulados (TS tipado)
│   │   └── 📄 mockDatabase.js   # Datos simulados (JS legacy)
│   │
│   ├── 📂 layouts/              # Layouts compartidos
│   │   ├── 📄 StudentLayout.tsx # Layout para estudiantes
│   │   └── 📄 AdminLayout.tsx   # Layout para administradores
│   │
│   ├── 📂 pages/                # Páginas principales
│   │   ├── 📄 Guide.tsx         # Landing page - Guía de pasantías
│   │   │
│   │   ├── 📂 student/          # Rutas para estudiantes
│   │   │   ├── 📄 Home.tsx      # Catálogo de empresas con filtros
│   │   │   ├── 📄 Documents.tsx # Descarga de documentos
│   │   │   └── 📄 SuccessStories.tsx  # Historias de éxito
│   │   │
│   │   └── 📂 admin/            # Rutas para administradores
│   │       ├── 📄 Login.tsx     # Página de login
│   │       ├── 📄 Dashboard.tsx # Panel de estadísticas
│   │       └── 📄 Manage.tsx    # Gestión de ofertas
│   │
│   └── 📂 components/           # Componentes reutilizables
│       └── 📂 public/           # Componentes públicos
│           ├── 📄 CompanyCard.tsx     # Tarjeta expandible de empresa
│           └── 📄 SuccessCard.tsx     # Tarjeta de caso de éxito
│
├── 📂 public/                   # Archivos estáticos
├── 📂 dist/                     # Build de producción (generado)
└── 📂 node_modules/             # Dependencias (generadas)
```

---

## 📂 Descripción Detallada de Carpetas

### **`/src`** - Código Fuente Principal
Contiene toda la lógica, componentes y estilos de la aplicación.

### **`/src/types`** - Definiciones de Tipos
```
Propósito: Centralizar todas las interfaces y tipos TypeScript
Archivos:
  - index.ts: Exporta tipos globales como CompanyOffer y DocumentItem
```
**Tipos principales:**
- `CompanyOffer`: Interface para datos de empresas
- `DocumentItem`: Interface para documentos descargables

### **`/src/data`** - Base de Datos Mock
```
Propósito: Simular datos de una base de datos real sin conexión a backend
Archivos:
  - mockDatabase.ts: Datos tipados (versión TypeScript)
  - mockDatabase.js: Datos legacy (versión JavaScript)
```
**Contiene:**
- `mockOffers[]`: Lista de 5+ empresas con ofertas de pasantía
- `mockDocuments[]`: Documentos de apoyo descargables
- Cada oferta incluye: institución, carreras, vacantes, ubicación, mapa, etc.

### **`/src/layouts`** - Layouts Compartidos
```
Propósito: Wrappers que definen la estructura visual común
```
**StudentLayout.tsx:**
- Header con navegación (Guía, Empresas, Documentos, Casos de éxito)
- Footer con información
- Mantiene consistencia visual entre páginas de estudiantes

**AdminLayout.tsx:**
- Sidebar con navegación admin
- Dashboard y opciones de gestión
- Acceso exclusivo para administradores

### **`/src/pages`** - Páginas Principales
```
Propósito: Vistas principales de la aplicación
```

**Guide.tsx** (Landing Page)
- Guía educativa sobre pasantías
- 6 secciones: Hero, Qué es, Consejos, Pasos, FAQ, CTA

**student/Home.tsx** (Catálogo de Empresas)
- Filtros dinámicos por carrera y búsqueda
- Separación clara: Urgentes → Generales → No vigentes
- Mostrador de estadísticas

**student/Documents.tsx** (Centro de Documentos)
- Descarga de plantillas y convenios
- Interfaz limpia y organizada

**student/SuccessStories.tsx** (Historias de Éxito)
- Testimonios de estudiantes reales
- Impacto profesional de pasantías

**admin/Login.tsx** (Autenticación)
- Acceso a panel administrativo

**admin/Dashboard.tsx** (Panel de Control)
- Estadísticas generales
- Resumen de ofertas activas

**admin/Manage.tsx** (Gestión de Ofertas)
- Toggle de visibilidad de ofertas
- Control total sobre catálogo

### **`/src/components`** - Componentes Reutilizables
```
Propósito: Componentes que se usan en múltiples lugares
```

**CompanyCard.tsx**
- Tarjeta expandible de empresa
- Muestra: nombre, logo, descripción, carreras, vacantes
- Al expandir: mapa de Google, detalles completos

**SuccessCard.tsx**
- Tarjeta de historias de éxito
- Testimonio + impacto + institución

---

## 📄 Descripción Detallada de Archivos

### **Archivos de Configuración**

#### **package.json**
```json
Propósito: Gestionar dependencias y scripts npm

Scripts principales:
  - npm run dev: Inicia servidor de desarrollo
  - npm run build: Compila para producción
  - npm run preview: Previsualiza build de producción
  - npm run lint: Ejecuta ESLint

Dependencias clave:
  - react: Framework UI
  - react-router-dom: Enrutamiento
  - tailwindcss: Framework CSS
  - typescript: Tipado estático
  - vite: Bundler y dev server
```

#### **tsconfig.json**
```json
Propósito: Configurar compilador de TypeScript

Configuraciones:
  - target: ES2020 (compatibilidad con navegadores modernos)
  - moduleResolution: Node (resolución de módulos)
  - strict: true (verificación de tipos estricta)
  - ignoreDeprecations: "6.0" (silencia advertencias de Node)
  - jsx: react-jsx (soporte para JSX moderno)
```

#### **vite.config.js**
```javascript
Propósito: Configurar Vite (bundler)

Plugins:
  - @vitejs/plugin-react: Soporte para React
  - @tailwindcss/vite: Tailwind integrado

Características:
  - Hot Module Replacement (HMR)
  - Compilación rápida con esbuild
```

#### **eslint.config.js**
```javascript
Propósito: Configurar reglas de linting para código limpio

Incluye:
  - Reglas de React
  - React Hooks linting
  - React Refresh support
```

---

### **Archivos Principales del Código**

#### **src/main.tsx**
```typescript
Propósito: Punto de entrada de la aplicación React

Función:
  1. Monta React en el elemento #root
  2. Renderiza el componente App
  3. Aplica estilos globales
```

#### **src/App.tsx**
```typescript
Propósito: Router central y gestor de estado global

Rutas:
  / → /guide (redirección a guía)
  
  Público (estudiantes):
    /guide → Guide.tsx (landing)
    /student → Home.tsx (catálogo)
    /student/documents → Documents.tsx
    /student/success-stories → SuccessStories.tsx
  
  Admin:
    /admin/login → Login.tsx
    /admin/dashboard → Dashboard.tsx
    /admin/manage → Manage.tsx

Estado:
  - offers[]: Lista de empresas (actualizable)
  - setOffers(): Setter para actualizar ofertas
```

#### **src/index.css**
```css
Propósito: Estilos globales e importación de Tailwind

Incluye:
  - @import "tailwindcss" (framework CSS)
  - Estilos de :root (fuentes, colores base)
  - Estilos de body (gradiente de fondo)
  - ::selection (colores de selección)
  - Estilos para inputs y botones
```

#### **src/types/index.ts**
```typescript
Propósito: Definir interfaces TypeScript globales

Interfaces:

  CompanyOffer {
    id: number
    institution: string        // Nombre de empresa
    address: string            // Ubicación
    careers: string[]          // Carreras que busca
    vacancies: number          // Cupos totales
    filled: number             // Cupos ocupados
    visible: boolean           // Visibilidad en catálogo
    type: string               // Tipo de oferta
    description: string        // Descripción del rol
    logo: string               // Logo emoji/iniciales
    status: 'vigente' | 'no-vigente'
    immediateAcceptance: boolean  // ¿Acepta inmediatamente?
    mapUrl: string             // URL de mapa de Google
  }

  DocumentItem {
    id: number
    title: string              // Nombre del documento
    description: string        // Qué contiene
  }
```

#### **src/data/mockDatabase.ts**
```typescript
Propósito: Base de datos simulada con datos de prueba

Exporta:

  mockOffers[]: 5+ empresas con datos completos:
    1. Clínica Santa Lucía (Medicina/Salud)
    2. Radio Aclo (Comunicación)
    3. Consejo de la Magistratura (Derecho)
    4. Tech Solutions (Sistemas)
    5. Energía y más (Tecnología)

  mockDocuments[]: 3 documentos:
    1. Formato de solicitud de práctica
    2. Planilla de evaluación del supervisor
    3. Convenio de prácticas profesionales

Características:
  - Datos completamente tipados
  - Incluye carreras, ubicaciones, mapas
  - Mezcla de ofertas urgentes y normales
  - Algunas empresas no vigentes para referencia
```

---

### **Archivos de Layouts**

#### **src/layouts/StudentLayout.tsx**
```typescript
Estructura visual para página de estudiantes:

  Header:
    - Logo UPDS
    - Navegación con 5 opciones:
      * Guía (link a /guide)
      * Empresas (link a /student)
      * Documentos (link a /student/documents)
      * Casos de éxito (link a /student/success-stories)
      * Acceso admin (link a /admin/login)
    - Estilos: Header fijo, shadow suave, backdrop blur

  Main:
    - Outlet para contenido dinámico
    - Max-width de 7xl (responsive)

  Footer:
    - Información de UPDS
    - Descripción de plataforma
    - Contacto
```

#### **src/layouts/AdminLayout.tsx**
```typescript
Estructura visual para página de administración:

  Layout de 2 columnas (en desktop):
    
    Sidebar (izquierda):
      - Logo de administración
      - Título "Panel de prácticas"
      - Navegación:
        * Dashboard (estadísticas)
        * Gestionar Ofertas (CRUD)
        * Logout (salir)
      - Colores: Fondo oscuro, texto claro

    Main (derecha):
      - Outlet para contenido dinámico
      - Contenido responsivo

  Diseño: Responsive (stack vertical en móvil)
```

---

### **Archivos de Páginas**

#### **src/pages/Guide.tsx** (Landing Page)
```
Estructura de 8 secciones:

1. Header (fijo):
   - Logo + Título "Guía de Pasantías"
   - Navegación: Inicio, Empresas, Consejos, Preguntas
   - Botón "Ver Empresas"

2. Hero Section:
   - Fondo azul gradiente (#223b87 → #0085fc)
   - Título: "Encuentra tu pasantía ideal y construye tu futuro"
   - 2 botones CTA: Explorar / Ver Consejos
   - Placeholder de imagen

3. Sección "Qué es una Pasantía":
   - Texto explicativo
   - 4 tarjetas: Aprende, Conecta, Destaca, Avanza
   - Colores variados (azul, verde, púrpura, naranja)

4. Consejos para Tener Éxito:
   - 6 tarjetas con iconos emoji
   - Temas: CV, Investigación, Pitch, Puntualidad, Comunicación, Aprendizaje
   - Hover effects

5. Pasos para Postularte:
   - 4 tarjetas numeradas (1-4)
   - Flujo: Explora → Selecciona → Postula → Éxito

6. FAQ (Preguntas Frecuentes):
   - 6 acordeones expandibles
   - Preguntas sobre duración, remuneración, postulación, etc.
   - Símbolo "+" que rota al abrir

7. CTA Section:
   - "¿Listo para encontrar tu pasantía?"
   - Botón grande hacia catálogo

8. Footer:
   - 4 columnas: Logo, Enlaces, Recursos, Contacto
   - Copyright
```

#### **src/pages/student/Home.tsx** (Catálogo de Empresas)
```
Estructura de 3 secciones principales:

1. Hero Section (azul gradiente):
   - Título principal
   - Stats: Ofertas vigentes, Aceptación inmediata, Cupos abiertos
   - Descripción de plataforma

2. Sección de Búsqueda y Filtros:
   - 3 botones toggle: "Todas las vigentes" / "Aceptación inmediata" / "Opciones generales"
   - Input: Buscar institución
   - Dropdown: Filtrar por carrera
   - Muestra cantidad de resultados

3. Sección Principal (grid):
   Columna izquierda (Catálogo):
     a) Requerimientos Vigentes:
        - Sub-sección: Aceptación inmediata
        - CompanyCards expandibles
        - Sub-sección: Opciones generales
        - CompanyCards expandibles
     
     b) No vigentes:
        - Para referencia/consulta histórica
        - CompanyCards

   Columna derecha (Sidebar):
     - Casos de éxito (link a /student/success-stories)
     - Qué encontrarás en cada perfil (guía)

Funcionalidad:
  - Filtrado por carrera (dropdown)
  - Búsqueda por texto libre
  - Toggle entre tipos de ofertas
  - Expandir/Contraer detalles de empresa
  - Mostrar mapa en expandido
```

#### **src/pages/student/Documents.tsx** (Centro de Documentos)
```
Contenido:

1. Header:
   - Título: "Descarga los formularios y planes de apoyo"
   - Descripción

2. Grid de Documentos:
   - 3 tarjetas (o más)
   - Cada una con:
     * Icono emoji (📄)
     * Título
     * Descripción
     * Botón "Descargar"
   - Diseño responsivo (1-3 columnas según pantalla)

Datos:
  Vienen de mockDatabase.ts (mockDocuments)
```

#### **src/pages/student/SuccessStories.tsx** (Historias de Éxito)
```
Estructura de 3 secciones:

1. Hero Section (azul gradiente):
   - Título: "Historias reales que muestran valor"
   - Descripción
   - Stats: Estudiantes motivados (3), Impacto (100%)
   - 2 botones: Volver al inicio / +3 experiencias

2. Grid de Historias (3 tarjetas):
   Cada una con:
     - Número de historia (01, 02, 03)
     - Nombre del estudiante
     - Institución
     - Testimonio (comillas)
     - Box de "Impacto": Resultado concreto
   - Hover effects

3. Sección "Por qué importa":
   - Texto explicativo
   - 4 bullet points de ventajas
   - Llamada a la acción
```

#### **src/pages/admin/Login.tsx** (Autenticación)
```
Formulario simple de login:
  - Email input
  - Password input
  - Botón "Ingresar"
  - Link "Volver a inicio"

Nota: Mock (sin validación real de seguridad)
```

#### **src/pages/admin/Dashboard.tsx** (Panel de Estadísticas)
```
Estadísticas mostradas:
  - Total de ofertas
  - Ofertas vigentes
  - Ofertas con aceptación inmediata
  - Ofertas cerradas
  - Cupos totales disponibles
  - Cupos ocupados

Diseño:
  - Tarjetas de stat con iconos
  - Colores indicativos (verde=activo, rojo=cerrado)
```

#### **src/pages/admin/Manage.tsx** (Gestión de Ofertas)
```
Funcionalidad:
  - Tabla/Lista de todas las ofertas
  - Toggle por cada oferta: Visible / No visible
  - Actualiza el estado en tiempo real
  - Reflejado en /student/Home

Datos:
  Vienen de props (offers, setOffers)
```

---

### **Archivos de Componentes**

#### **src/components/public/CompanyCard.tsx**
```typescript
Props:
  - offer: CompanyOffer (datos de empresa)
  - isExpanded: boolean (expandido o no)
  - onToggle: (id: number) => void (callback de expansión)

Estructura:

  Header (siempre visible):
    - Tipo de oferta (badge)
    - Nombre de institución
    - Dirección
    - Logo (emoji en cuadrado azul)

  Body (siempre visible):
    - Descripción de rol
    - Badges de carreras
    - Resumen: Cupos disponibles, Estado, Aceptación inmediata
    - Botón "Ver más" / "Ocultar detalles"

  Expandido (condicional):
    - "Perfil que buscan": Descripción de competencias
    - "Cupos disponibles": Número exacto y ocupados
    - "Ubicación": Dirección y nota
    - Iframe de Google Maps embebido
    - Estilos: Fondo gris suave, bordes redondeados

Estilos:
  - Gradiente azul en header
  - Shadow suave
  - Hover effects
  - Responsivo en móvil
```

#### **src/components/public/SuccessCard.tsx**
```typescript
Props:
  - No recibe props específicas (datos hardcodeados)

Estructura:
  - Tarjeta simple con historia de éxito
  - Nombre + institución
  - Testimonio (texto citado)
  - Impacto (resultado)

Estilos:
  - Diseño limpio
  - Colores suaves
  - Apto para galería
```

---

## 🛠 Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 19.x | Framework UI |
| **React Router DOM** | 6.x | Enrutamiento SPA |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |
| **Vite** | 8.x | Bundler y dev server |
| **ESLint** | 9.x | Linting de código |

### Dependencias Principales
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^6.28.0",
  "tailwindcss": "^4.0.0"
}
```

### Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^4.3.1",
  "@tailwindcss/vite": "^4.0.0",
  "typescript": "^5.6.3",
  "vite": "^8.1.4",
  "eslint": "^9.17.0"
}
```

---

## ⚙️ Configuración y Setup

### Instalación Inicial
```bash
# 1. Clonar o descargar el proyecto
cd UPDS-Pasantias

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

### Build para Producción
```bash
# Compilar y optimizar para producción
npm run build

# Previsualizar build (local)
npm run preview
```

### Linting
```bash
# Ejecutar ESLint
npm run lint
```

### Servidor de Desarrollo
- **URL Local**: http://localhost:3001
- **Network**: http://[IP]:3001 (acceso desde otros dispositivos)
- **Hot Reload**: Cambios se reflejan automáticamente

---

## 🗺️ Rutas de la Aplicación

### Estudiantes
```
/guide                      → Guía de Pasantías (landing page)
/student                    → Catálogo de Empresas (home)
/student/documents          → Centro de Documentos
/student/success-stories    → Historias de Éxito
```

### Administradores
```
/admin/login                → Página de Login
/admin/dashboard            → Panel de Estadísticas
/admin/manage               → Gestión de Ofertas
```

### Redirecciones
```
/                           → /guide (home)
[ruta no existente]         → /student (fallback)
```

---

## 🔄 Flujo de Datos

### Flujo Principal de Datos

```
1. INICIALIZACIÓN (App.tsx)
   ↓
   useState(mockOffers) 
   ↓
   offers[] ← mockOffers (base de datos mock)

2. ESTUDIANTE EXPLORA (Home.tsx)
   ↓
   Filtros: carrera + búsqueda
   ↓
   Computa ofertas vigentes/urgentes
   ↓
   Renderiza CompanyCards con datos

3. EXPANDIR EMPRESA (CompanyCard.tsx)
   ↓
   onToggle(id)
   ↓
   Muestra detalles + mapa de Google

4. ADMIN GESTIONA (Manage.tsx)
   ↓
   Toggle visible/no visible
   ↓
   setOffers(updatedOffers)
   ↓
   Estado actualizado en App.tsx
   ↓
   Re-render en Home.tsx (cambios reflejados)
```

### Flujo de Estados

```
App.tsx (estado global)
  ├── offers[] (datos de empresas)
  └── setOffers() (actualizador)
      ├── Paso a Home.tsx
      ├── Paso a Dashboard.tsx
      └── Paso a Manage.tsx

En Home.tsx (estado local):
  ├── selectedCareer (dropdown filtro)
  ├── searchTerm (búsqueda)
  ├── activeGroup (tipo de oferta)
  └── expandedCompanyId (expandir/contraer)

En Manage.tsx:
  └── Modifica offers[] vía setOffers()
```

---

## 🎨 Esquema de Colores

```
Primario (Azul UPDS):
  - #223b87 (Azul oscuro - botones, headers)
  - #0085fc (Azul claro - acentos, links)

Secundarios:
  - #f4f8ff (Fondo gris-azul muy claro)
  - #ffffff (Blanco - cards, fondo)
  - #0f172a (Gris oscuro - texto)

Indicadores:
  - Verde: #10b981 (éxito, disponible)
  - Rojo: #ef4444 (alerta, cerrado)
  - Amarillo: #f59e0b (atención)
  - Púrpura: #8b5cf6 (información extra)
```

---

## 📱 Breakpoints Responsive

```
xs: < 640px      → Móvil pequeño
sm: 640px        → Móvil
md: 768px        → Tablet
lg: 1024px       → Laptop
xl: 1280px       → Desktop grande
```

**Clases Tailwind usadas:**
- `sm:`, `md:`, `lg:` para media queries
- `flex-col` → `lg:flex-row` para layouts
- Padding adaptativo: `px-4 sm:px-6 lg:px-8`

---

## 🔐 Seguridad y Mejoras Futuras

### Estado Actual
- ✅ Datos mock sin backend real
- ✅ Login mock (sin validación)
- ✅ Tipado TypeScript completo
- ✅ Responsive y accesible

### Mejoras Recomendadas
- [ ] Conectar a base de datos Supabase
- [ ] Implementar autenticación real (JWT)
- [ ] Validación de formularios
- [ ] Upload de archivos
- [ ] Sistema de notificaciones
- [ ] Dark mode
- [ ] Internacionalización (i18n)
- [ ] Tests unitarios e integración

---

## 📚 Convenciones del Proyecto

### Nomenclatura
- **Componentes**: PascalCase (`CompanyCard.tsx`)
- **Funciones/Variables**: camelCase (`isExpanded`, `handleClick`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_ITEMS = 10`)
- **Tipos/Interfaces**: PascalCase (`CompanyOffer`)

### Estructura de Componentes
```tsx
import { useState } from 'react'
import type { Props } from '../../types'

interface ComponentProps {
  prop1: string
  prop2: number
}

function ComponentName({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState('')
  
  return (
    <div>Contenido</div>
  )
}

export default ComponentName
```

### Estilos Tailwind
```tsx
// Estructura recomendada
<div className="
  responsive base classes
  sm:mobile-medium
  md:tablet
  lg:desktop
  states (hover, focus, active)
">
```

---

## 🚀 Como Ejecutar el Proyecto

### Desarrollo Local
```bash
cd UPDS-Pasantias
npm install
npm run dev
# Accede a http://localhost:3001
```

### Build Producción
```bash
npm run build
npm run preview
# Visualiza build en http://localhost:4173
```

### Estructura de Carpetas Importante
```
/src           → Código fuente
/src/pages     → Páginas principales
/src/components → Componentes
/src/layouts   → Layouts
/src/data      → Datos mock
/src/types     → Definiciones TS
/dist          → Build producción
```

---

## 📞 Información de Contacto

**Proyecto**: Plataforma de Gestión de Pasantías UPDS
**Email**: pasantias@upds.edu
**Ubicación**: La Paz, Bolivia

---

## 📝 Notas Importantes

1. **Mock Database**: Los datos actuales son simulados. Para producción, integrar Supabase/Backend real.

2. **Autenticación**: El login es mock. Implementar JWT/OAuth en producción.

3. **Mapas**: Google Maps está integrado vía iframe. Considerar API para mejor experiencia.

4. **Responsive**: La aplicación se optimiza primero para móvil (mobile-first approach).

5. **TypeScript**: Proyecto completamente tipado. No usar `any`.

---

**Última actualización**: 11 de Julio de 2026
**Versión**: 1.0.0
**Estado**: ✅ En desarrollo activo
