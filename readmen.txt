# API de Gestión de Compras y Clientes

Este proyecto es una API para gestionar compras y clientes en una empresa. Permite crear, consultar, actualizar y eliminar información de compras y clientes.

---

## Requisitos previos

Antes de comenzar, necesitas tener instalado en tu computadora:

- [Node.js](https://nodejs.org/) (versión recomendada: 18 o superior)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (para la base de datos)
- [Git](https://git-scm.com/) (opcional, para descargar el proyecto)

---

## Instalación paso a paso

### 1. Descargar el proyecto

Puedes descargar el proyecto de dos formas:

**Opción A: Usando Git**
1. Abre la aplicación "Terminal" o "Símbolo del sistema" en tu computadora.
2. Escribe el siguiente comando y presiona Enter:
   ```
   git clone https://github.com/usuario/apifinall.git
   ```
3. Ingresa a la carpeta del proyecto:
   ```
   cd apifinall
   ```

**Opción B: Descarga manual**
1. Haz clic en el botón "Code" en la página de GitHub y selecciona "Download ZIP".
2. Descomprime el archivo ZIP en tu computadora.
3. Abre la carpeta descomprimida.

---

### 2. Instalar dependencias

1. Abre la terminal en la carpeta del proyecto.
2. Escribe el siguiente comando y presiona Enter:
   ```
   npm install
   ```
   Esto instalará todos los programas necesarios para que la API funcione.

---

### 3. Importar la base de datos

1. Abre MySQL o una herramienta como [phpMyAdmin](https://www.phpmyadmin.net/).
2. Busca el archivo `database/schema.db` en la carpeta del proyecto.
3. Importa ese archivo en MySQL para crear todas las tablas y datos necesarios:
   - Si el archivo es `.sql`, puedes usar la opción "Importar" en phpMyAdmin y seleccionar el archivo.
   - Si el archivo es `.db`, verifica si es un archivo de texto con sentencias SQL. Si es así, ábrelo y copia su contenido en la consola de MySQL o en phpMyAdmin.


---

### 4. Ejecutar las pruebas locales

Las pruebas incluidas en la carpeta `__tests__` son **pruebas locales**.  
No requieren conexión a servicios externos y se ejecutan únicamente en tu computadora.

1. Para verificar que todo funciona correctamente, ejecuta:
   ```
   npm test
   ```
2. Esto ejecutará todos los archivos de prueba que están en la carpeta `__tests__` y mostrará los resultados en la terminal.

---

## Estructura de carpetas importante

- **database/schema.db**  
  Archivo con la estructura de la base de datos.

- **__tests__/**  
  Carpeta con todas las pruebas automáticas del proyecto.
  - **models/**: Pruebas de los modelos (clientes, compras, ventas, etc.).
  - **integration/**: Pruebas de integración de la API.
  - **utils/**: Utilidades para las pruebas.
  - **setup.js**: Configuración para las pruebas.

---



## Preguntas frecuentes

- **¿Qué hago si aparece un error de conexión?**  
  Verifica que los datos en `src/config/db.js` sean correctos y que MySQL esté funcionando.

- **¿Cómo detengo la API?**  
  Presiona `Ctrl + C` en la terminal.

---

Si tienes dudas, puedes pedir ayuda a alguien con experiencia en informática o buscar tutoriales sobre