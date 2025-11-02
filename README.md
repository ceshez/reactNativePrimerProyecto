# Primer Proyecto React Native

Aplicación móvil creada con Expo que incorpora un flujo completo de autenticación con Supabase:

- **Login funcional** con validación de campos y autenticación en Supabase.
- **Registro de usuarios** con almacenamiento en Supabase y verificación de email.
- **Pantalla principal** que muestra una lista de tareas de ejemplo después de iniciar sesión.

## Requisitos previos

- Node.js 18 o superior.
- Cuenta de [Supabase](https://supabase.com) y una base de datos con una tabla opcional `tasks`.

## Configuración

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` en la raíz del proyecto con la clave anónima de tu proyecto Supabase:

   ```bash
   SUPABASE_KEY=tu_clave_anonima
   ```

   También puedes establecer la clave en `app.json` dentro de `expo.extra.supabaseAnonKey`.

3. Inicia el proyecto:

   ```bash
   npm start
   ```

4. Si deseas cargar tareas reales, crea una tabla `tasks` con los campos `id`, `title` (texto) y `completed` (booleano) en tu proyecto de Supabase.

## Estructura del proyecto

```
.
├── App.js
├── app.json
├── assets/
├── package.json
├── src/
│   ├── components/
│   ├── hooks/
│   ├── screens/
│   └── services/
└── README.md
```

La aplicación utiliza React Navigation para administrar las pantallas y un hook personalizado `useAuthForm` que centraliza la validación y el manejo del formulario.
