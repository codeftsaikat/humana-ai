Este proyecto es una aplicación web que permite a los usuarios transformar texto generado por inteligencia artificial en un estilo más natural y "humanizado". Para acceder a la funcionalidad de transformación, los usuarios deben registrarse e iniciar sesión. La aplicación sigue un flujo seguro de autenticación y autorización para garantizar que solo los usuarios autenticados puedan acceder a esta funcionalidad.

### Funcionalidades Principales

1.  **Registro e Inicio de Sesión**:
    -   Los usuarios pueden registrarse y, una vez verificados, iniciar sesión para acceder a la funcionalidad de "humanización" de texto.
    -   Autenticación protegida con JWT para seguridad.
2.  **Humanización de Texto**:
    -   Los usuarios pegan un texto en un campo de texto (textarea) proporcionado.
    -   Al hacer clic en "humanizar", el texto se envía a un modelo de IA integrado en el backend, el cual procesa el texto para hacer que suene más natural y coloquial.
    -   El resultado humanizado se devuelve al usuario y se muestra en pantalla.
3.  **Gestión de Historial de Texto**:
    -   La aplicación almacena los textos procesados para cada usuario, permitiéndoles acceder a su historial de humanizaciones pasadas.
    -   Opción para volver a humanizar textos anteriores o copiar los resultados actuales.

### Tecnologías Utilizadas

-   **Frontend**:
    -   **Next.js**: Framework de React para SSR y fácil manejo de rutas.
    -   **Tailwind CSS**: Framework de estilos para una personalización rápida y componentes responsivos.
    -   **shadcn/ui**: Biblioteca de componentes estilizados para una interfaz de usuario moderna y funcional.
    -   **TypeScript**: Tipado estático que ayuda a evitar errores y mejorar la legibilidad del código.
-   **Backend**:
    -   **MongoDB y Prisma**: Base de datos NoSQL y ORM para el almacenamiento eficiente y el acceso a datos, incluyendo la gestión de usuarios y el historial de textos.
    -   **Modelo IA**: La aplicación utiliza un modelo de IA para transformar los textos en una versión más humanizada.

### Diagrama de la Base de Datos en MongoDB

Dado que se usará MongoDB, una base de datos NoSQL, el diseño se centrará en colecciones. A continuación se detalla la estructura de cada colección:

### 1\. **Users**

-   Almacena los datos de los usuarios registrados.
-   Campos:
    -   `userId` (ObjectId): ID único para el usuario.
    -   `username` (String): Nombre de usuario único.
    -   `email` (String): Correo electrónico único.
    -   `passwordHash` (String): Hash de la contraseña del usuario.
    -   `createdAt` (Date): Fecha de creación de la cuenta.
    -   `updatedAt` (Date): Fecha de última actualización de la cuenta.

### 2\. **TextTransformations**

-   Almacena los textos humanizados y su historial.
-   Campos:
    -   `transformationId` (ObjectId): ID único para el registro de transformación.
    -   `userId` (ObjectId): ID de referencia del usuario, enlazado a la colección de **Users**.
    -   `originalText` (String): Texto original proporcionado por el usuario.
    -   `humanizedText` (String): Texto transformado a un estilo más natural.
    -   `createdAt` (Date): Fecha en que se procesó el texto.
 

![diagrama-app](https://github.com/user-attachments/assets/8e50141f-793c-4214-b4de-b9cfe50d5ad9)

