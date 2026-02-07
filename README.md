# TaskApp - Frontend

## Descripción

Aplicación web de gestión de tareas desarrollada con **Angular 17**, que permite a los usuarios:

- Crear, editar y eliminar tareas
- Marcar tareas como completadas
- Buscar tareas por título de forma reactiva
- Filtrar y mostrar tareas en una tabla
- Login con correo electrónico
- Interacción con backend serverless usando **Cloud Functions** y **Firebase Firestore**

La aplicación es **responsive** y está optimizada para diferentes dispositivos.

---

## Tecnologías

- Angular 17 (Standalone Components)
- Angular Material
- RxJS (Observables, BehaviorSubjects)
- Reactive Forms
- TypeScript
- SCSS

---

## Estructura de Carpetas

```plaintext

src/
├── app/
│ │ ├── tasks/
│ │ │ ├── pages/ # Componentes de páginas (list, form)
│ │ │ ├── components/ # Componentes reutilizables (tabla, filtros, modales)
│ │ │ ├── services/ # Servicios específicos de tasks (TaskService, TaskApiService)
│ │ └── auth/
│ │ ├── pages/ # Página de login
│ │ ├── services/ # Servicios de autenticación
│ ├── shared/ # Componentes, pipes y servicios compartidos
│ ├── core/ # Interceptors, Guards, State management
│ └── app.component.ts



---

## Instalación

### 1. Instalar dependencias

npm install

### 2. Ejecutar en modo desarrollo


ng serve

### 3. Ejecutar en modo desarrollo

export const environment = {
  production: false,
  apiUrl: 'https://<tu-cloud-function-url>/api',
};


### 4. Construir para producción

ng build --prod



### Características importantes

Búsqueda de tareas con debounceTime y filtrado reactivo
Manejo de loading con BehaviorSubject
Modal para crear, editar y confirmar eliminación de tareas
Seguridad: envío de JWT con cookies httpOnly al backend
Diseño responsive con Angular Material


Esta aplicación sigue los principios de arquitectura reactiva en Angular. Se priorizó la calidad del código y patrones de diseño como:

Observables y BehaviorSubject para manejo de estado
Reactive Forms para formularios
Modularidad por features
Componentes standalone y lazy loading
El código está preparado para integrarse con backend serverless en Cloud Functions y Firestore.


```bash
