### Guía de Instalación y Uso de la API

#### Requisitos Previos

Asegúrate de que el sistema del usuario cumpla con los siguientes requisitos antes de instalar y utilizar la API:

1. **Node.js y npm:** Instala Node.js y npm en tu sistema. Puedes descargarlos desde [https://nodejs.org/](https://nodejs.org/).

2. **MySQL Server:** Asegúrate de tener un servidor MySQL instalado y en ejecución. Puedes descargar MySQL desde [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/).

#### Pasos de Instalación

Sigue estos pasos para instalar y configurar la API en tu sistema:

1. **Descargar el Código Fuente:**
   - Descarga el código fuente de la API desde [https://github.com/brunonoel/A02-WEB2.git].

2. **Instalar Dependencias:**
   - Abre una terminal en el directorio raíz del proyecto.
   - Ejecuta el siguiente comando para instalar las dependencias:
     ```
     npm i express multer mysql2 cors ejs 
     ```

3. **Configurar la Base de Datos:**
   - Crea una base de datos MySQL llamada `bd_catalogo`.
   - Ejecuta el script SQL proporcionado en el archivo de creación de la tabla, por ejemplo, `create_table.sql`, para crear la tabla `productos`.
   - Ten en cuenta que la tabla 'productos' debe tener los siguientes atributos: idProductos, nombre, descripcion, precio, marca, stock y foto_path - donde 
idProductos sera INT auto_increment primary key, y donde nombre y descripcion seran NOT NULL.

4. **Configurar la Conexión a la Base de Datos:**
   - Abre el archivo `db.js` y asegúrate de que la configuración de conexión a la base de datos sea correcta. Debe coincidir con tu "host", "user", "password" y "database"

5. **Iniciar la Aplicación:**
   - Ejecuta el siguiente comando para iniciar la aplicación:
     ```
     node app.js
     ```

6. **Acceder a la API:**
   - La API estará disponible en `http://localhost:3020/api/1.0/`. Puedes acceder a los endpoints a través de esta URL.

#### Uso de la API

La API proporciona los siguientes endpoints:

- **GET `/api/1.0/productos`:** Obtener la lista de productos.
- **GET `/api/1.0/productos/:id`:** Obtener un producto específico por ID.
- **POST `/api/1.0/productos`:** Agregar un nuevo producto.
- **PUT `/api/1.0/productos`:** Actualizar un producto existente.
- **DELETE `/api/1.0/productos/:id`:** Eliminar un producto por ID.

Para interactuar con la API, puedes utilizar herramientas como [Postman](https://www.postman.com/) o realizar solicitudes HTTP desde tu aplicación.

#### Manejo de Imágenes

- Para cargar imágenes de productos, utiliza el formulario `multipart/form-data` con el campo `foto`.

---