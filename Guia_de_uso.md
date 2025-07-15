# -----------guia de uso L.i.Store-----------


# Instalación

1. --clonar el repositorio--
   ```bash
   git clone https://github.com/nachopep10/L.-I.-Store.git
   ```
2. --Acceder a la carpeta back-end del proyecto--
   ```bash
   cd L.-I.-Store
   ```
3. --Instalar las dependencias--
   ```bash
   npm install
   ```
4 --Configurar las variables de entorno--
    -Crear un archivo .env en la raiz del proyecto con el siguente conetinido(modificable según tu configuración)
    
    DB_TYPE=mysql
    DB_NAME=li_store
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_HOST=localhost
    DB_PORT=3306

    JWT_SECRET=tu_clave_secreta

5 --base de datos--
    -Verificar que la base de datos esté creada en tu servidor MySQL

# Uso
1. --Acceder a la carpeta back-end del proyecto--
   ```bash
   cd L.-I.-Store
   ```
2. --Inicias la aplicación--
   ```bash
   npm start
   ```
   o, por dependencia Nodemon
      ```bash
   npm run dev
   ```
3. --Acceder a la interfaz--
   - abrir el navegador y dirigirse a `http://localhost:3000` (o el puerto configurado).

# Acceso a las interfaces

- **Cliente / autoservicio**:  
  Ingresar a `http://localhost:3000/screens/autoservicio.html`

- **Administrador**:  
  Ingresar a `http://localhost:3000/screens/iniciarSesion.html`  
  *(Requiere login con credenciales válidas)*


## Autores
- Lucila Micaela Suarez
- Ignacio Pepe Valverde
- Juan Pablo Rodrigues Ferreira Maltez

Proyecto final. Programación III. Julio, 2025.