# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

﻿# Plataforma de Gestión de Pasantías UPDS

## Guía de presentación y manual de usuario

Este documento organiza la demostración de la plataforma para presentar sus secciones en orden y explica cómo seleccionar una empresa y cómo cargar una vacante.

## 1. Objetivo

La plataforma centraliza las oportunidades de Prácticas Profesionales de la Universidad Privada Domingo Savio (UPDS). Permite orientar al estudiante, consultar empresas y ofertas, buscar por nombre o carrera, revisar cupos y ubicación, mostrar casos de éxito y administrar la información desde un panel protegido.

> **Alcance actual:** funciona como directorio y herramienta de gestión de ofertas. La postulación del estudiante no se registra dentro de la plataforma; el siguiente paso se realiza según las indicaciones de la empresa o de la coordinación.

## 2. Recorrido recomendado para la presentación

### Parte 1: Guía inicial

1. Abrir la plataforma en `/guide`.
2. Presentar la guía general sobre las Prácticas Profesionales.
3. Explicar que esta sección orienta al estudiante antes de buscar una oportunidad.
4. Seleccionar la opción para explorar empresas.

### Parte 2: Directorio de empresas y vacantes

1. Entrar a **Empresas** o abrir `/student`.
2. Mostrar el buscador **Buscar empresa o área**.
3. Mostrar el filtro de **carrera**.
4. Explicar las categorías:
	- **Solicitudes activas:** empresas que solicitan estudiantes y tienen un proceso vigente.
	- **Empresas con convenio:** instituciones con un proceso basado en convenio y carta de compromiso.
5. Abrir una tarjeta para mostrar nombre, descripción, carrera, cupos, dirección y mapa.

### Parte 3: Cómo selecciona una empresa el estudiante

1. Buscar por nombre o área de interés.
2. Elegir la carrera en el selector.
3. Comparar las empresas disponibles.
4. Abrir la tarjeta de la empresa elegida.
5. Revisar descripción, cupos, dirección, mapa y vigencia.
6. Confirmar que la carrera coincida con el perfil solicitado.
7. Seguir las instrucciones de contacto y requisitos indicados por la empresa o la coordinación.

**Criterios de selección:** carrera compatible, cupos disponibles, vigencia, tipo de oportunidad, ubicación y requisitos.

### Parte 4: Casos de éxito

1. Abrir **Casos de Éxito** desde el directorio.
2. Presentar las experiencias publicadas.
3. Explicar que sirven como referencia para orientar al estudiante.

La ruta directa es `/student/success-stories`.

### Parte 5: Acceso administrativo

1. Abrir `/admin/login`.
2. Ingresar el correo y la contraseña asignados.
3. Mostrar que una cuenta sin permisos no puede entrar al panel.
4. Presentar el menú: **Resumen general**, **Empresas, carreras y cupos** y **Cerrar sesión**.

### Parte 6: Resumen general

En `/admin/dashboard` se muestran empresas registradas, ofertas activas, cupos abiertos y solicitudes cerradas. También se pueden administrar las carreras disponibles y crear, editar o eliminar casos de éxito con título, institución, descripción, resultado y video.

### Parte 7: Gestión de empresas y vacantes

En `/admin/manage` se consultan, buscan, editan y eliminan las ofertas registradas. Esta es la pantalla para cargar una nueva vacante.

## 3. Manual para cargar una vacante

1. Ingresar al panel administrativo.
2. Abrir **Empresas, carreras y cupos**.
3. Presionar **Nueva empresa / oferta**.
4. Completar los campos obligatorios:
	- Nombre de la empresa.
	- Tipo: `Solicitud activa` o `Empresa con convenio`.
	- Dirección.
	- URL del mapa de Google.
	- Logo en PNG, JPG o WEBP.
	- Descripción, requisitos y actividades.
	- Al menos una carrera compatible.
	- Cupos totales y cupos ocupados.
5. Marcar **Mostrar en la web** para publicar la oferta.
6. Revisar la información y verificar que los cupos ocupados no superen los totales.
7. Presionar **Guardar oferta**.
8. Volver al directorio público y comprobar la publicación.

Si no se proporciona una fecha, la vigencia se establece automáticamente. Una oferta deja de estar disponible cuando vence o cuando todos sus cupos están ocupados.

### Editar o eliminar

- Buscar la oferta por empresa, carrera, tipo o dirección.
- Presionar **Editar** para actualizar datos, cupos, logo o visibilidad.
- Presionar **Eliminar** y confirmar solo cuando la oferta ya no deba conservarse.

## 4. Manual para administrar carreras

1. Entrar a **Resumen general**.
2. En **Carreras disponibles**, escribir el nombre.
3. Presionar **Agregar**.
4. Verificar que aparezca en el formulario de ofertas y en el filtro público.
5. Usar **Eliminar** solo si ya no debe estar disponible.

Conviene crear las carreras antes de cargar una oferta.

## 5. Preparación técnica

### Requisitos

- Node.js y npm instalados.
- Dependencias instaladas con `npm install`.
- Variables de entorno configuradas si se usará Supabase.

Crear `.env.local` en la raíz:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon
VITE_ADMIN_EMAIL=correo-del-administrador
VITE_ADMIN_PASSWORD=contraseña-del-administrador
```

Para Supabase, ejecutar `supabase/schema.sql` y `supabase-setup.sql`, crear el usuario administrador y asignarle el rol `admin` en `profiles`. Los buckets utilizados son `company-logos` y `success-story-videos`.

### Ejecutar y comprobar

```bash
npm install
npm run dev
npm run lint
npm run build
```

### Lista de comprobación para la demo

- [ ] Carga la guía inicial.
- [ ] El directorio muestra empresas y vacantes.
- [ ] Funcionan el buscador y el filtro por carrera.
- [ ] Las tarjetas muestran detalles y mapa.
- [ ] Funciona el acceso administrativo.
- [ ] Se puede crear o editar una oferta.
- [ ] La oferta publicada aparece en el directorio.
- [ ] Se visualizan los casos de éxito.
- [ ] Se puede cerrar la sesión.

## 6. Tecnologías

React 19, TypeScript, Vite, React Router, Tailwind CSS, Framer Motion, Lucide React y Supabase.

## 7. Rutas principales

| Ruta | Sección | Usuario |
| --- | --- | --- |
| `/guide` | Guía inicial | Público |
| `/student` | Directorio de empresas y vacantes | Estudiante |
| `/student/success-stories` | Casos de éxito | Público |
| `/admin/login` | Inicio de sesión | Administrador |
| `/admin/dashboard` | Resumen, carreras y casos de éxito | Administrador |
| `/admin/manage` | Empresas, ofertas y cupos | Administrador |

## 8. Cierre sugerido

La plataforma conecta la orientación, la consulta y la administración de las Prácticas Profesionales en un solo lugar. El estudiante encuentra una oportunidad compatible con su carrera y revisa sus datos antes de contactarse; la coordinación mantiene actualizadas las empresas, los cupos y la información publicada.
