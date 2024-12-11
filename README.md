# Proyecto: IA Humanizer

## Introducción
Este proyecto es una aplicación web que permite a los usuarios transformar texto generado por inteligencia artificial en un estilo más natural y "humanizado". Para acceder a esta funcionalidad, los usuarios deben registrarse e iniciar sesión. La aplicación implementa un flujo seguro de autenticación y autorización, garantizando que solo los usuarios autenticados puedan acceder a la funcionalidad principal.

## ✨ Funcionalidades Principales

### Registro e Inicio de Sesión
- Los usuarios pueden registrarse y, tras la verificación, iniciar sesión para acceder a la funcionalidad de "humanización" de texto.
- Autenticación protegida con JWT para garantizar la seguridad de las sesiones.

### Humanización de Texto
- Los usuarios pueden pegar un texto en un campo de texto (*textarea*) proporcionado.
- Al hacer clic en "Humanizar", el texto se envía a un modelo de IA integrado en el backend.
- El modelo procesa el texto para hacerlo más natural y coloquial.
- El resultado transformado se devuelve al usuario y se muestra en pantalla.

### Gestión de Historial de Texto
- Los textos procesados se almacenan para cada usuario, permitiendo acceso a su historial de humanizaciones pasadas.
- Los usuarios pueden volver a humanizar textos anteriores o copiar los resultados actuales con un solo clic.

## 💻 Tecnologías Utilizadas

### Frontend
- **Next.js**: Framework de React para renderizado del lado del servidor (SSR) y manejo eficiente de rutas.
- **Tailwind CSS**: Framework de estilos para personalización rápida y componentes responsivos.
- **shadcn/ui**: Biblioteca de componentes estilizados para una interfaz moderna y funcional.
- **TypeScript**: Tipado estático que mejora la legibilidad y ayuda a evitar errores.

### Backend
- **MongoDB**: Base de datos NoSQL para el almacenamiento eficiente de usuarios e historial de textos.
- **Prisma**: ORM utilizado para facilitar las consultas y la gestión de datos.
- **Modelo IA**: La transformación de textos utiliza un modelo de IA integrado en el backend.

## 🔍 Diagrama de la Base de Datos (MongoDB)

El diseño de la base de datos está centrado en colecciones para MongoDB:

### 1. **Users**
Almacena los datos de los usuarios registrados.
- **Campos:**
  - `userId` (ObjectId): ID único para el usuario.
  - `username` (String): Nombre de usuario único.
  - `email` (String): Correo electrónico único.
  - `passwordHash` (String): Hash de la contraseña del usuario.
  - `createdAt` (Date): Fecha de creación de la cuenta.
  - `updatedAt` (Date): Fecha de última actualización de la cuenta.

### 2. **TextTransformations**
Almacena los textos humanizados y su historial.
- **Campos:**
  - `transformationId` (ObjectId): ID único para el registro de transformación.
  - `userId` (ObjectId): ID de referencia del usuario, enlazado a la colección **Users**.
  - `originalText` (String): Texto original proporcionado por el usuario.
  - `humanizedText` (String): Texto transformado a un estilo más natural.
  - `createdAt` (Date): Fecha en que se procesó el texto.

## 🚀 Instalación y Uso
1. Clona este repositorio:
   ```bash
   git clone https://github.com/CarlosPProjects/ia-humanizer.git
   ```
2. Instala las dependencias:
   ```bash
   npm install --force
   ```
3. Configura las variables de entorno necesarias:
   - **DATABASE_URL**: URL de la base de datos.
   - **AUTH_SECRET**: Clave para la autenticación con JWT.
   - **AUTH_GITHUB_ID**: Clave id de usuario Github
   - **AUTH_GITHUB_SECRET**: Clave secreta de usuario Github
   - **OPENAI_API_KEY**: Clave para el modelo de IA.
4. Inicia la aplicación:
   ```bash
   npm run dev
   ```
5. Accede a `http://localhost:3000` en tu navegador para usar la aplicación.

## 🔧 Retos y Aprendizajes
- Implementación de **autenticación segura** con JWT.
- Gestión de estados complejos en React utilizando `useState` y `useEffect`.
- Integración con un modelo de IA para procesar texto en tiempo real.
- Uso de **Prisma** para modelar y consultar una base de datos MongoDB.

## Contribuciones
Las contribuciones son bienvenidas. Si tienes sugerencias o encuentras errores, por favor abre un *issue* o envía un *pull request*.

---

¡Gracias por revisar este proyecto! Espero que te inspire a experimentar con el uso de IA en aplicaciones web.

