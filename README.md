# simple-real-time-service

## Stack

- Nodejs
- Express
- MongoDB

## Guía rápida para levantar la aplicación
Puede levantar la aplicación de 3 maneras.

- **Entorno de desarrollo:** A nivel local con configuración para desarrollo. (Punto 1)
- **docker-compose:** Ejecutando el comando `docker-compose up -d --build`, la manera mas sencilla. (Punto 2)
- **docker:** Creando la imagen y corriendo el contenedor. (Punto 3)

**NOTA:** No olvide crear el archivo `.env` antes de ejecutar los anteriores puntos. Puede copiarse del archivo `.env.example` que ya tiene las variables configuradas.

## 1. Configuración del entorno de desarrollo

Clonar repositorio

```bash
git clone .....
```

Instalar dependencias

```bash
npm install
```

Generar archivo `.env`
```bash
cp .env.example .env
```

Ejecuta la aplicación en el modo de desarrollo.Disponible [http://localhost:8002](http://localhost:8002).

```bash
npm run start
```

La aplicación es accesible a través del puerto 8002.

## 2. Docker-compose

El siguiente proyecto contiene `docker-compose.yml` que configura todo el entorno de desarrollo.
Ejecute `docker-compose up -d --build` para ejecutar la pila de desarrollo. Tenga en cuenta que la
carpeta del proyecto se monta en la imagen docker y aplicación se inicia en modo `development`,
cualquier cambio en el código fuente se volverá a cargar la aplicación por lo que es más fácil para el desarrollador.

La aplicación es accesible a través del puerto `8000`.

## 3. Docker

Para el despliegue en un entorno de `production` de la aplicación:

1. Cree la imagen del contenedor `docker build -t simple-real-time-application:latest -f Dockerfile.prod .`.
2. Cree o copie el archivo `.env`. `cp .env.example .env`
3. Inicie el contenedor y monte el archivo `.env` como volumen

```bash
docker run -d -v /$(pwd)/.env:/app/.env -p 8000:8002 --name simple-real-time-service simple-real-time-service:latest
```

La aplicación es accesible a través del puerto `8000`.

### 4. Configuración

### Variables de entorno `.env`
Las variables de configuración de la aplicación se encuentran en los ficheros `.env.*`.

Tenga en cuenta que `.env` no se registra en el repositorio Git. Debe crearse por separado y suministrarse
al contenedor Docker en ejecución, por ejemplo, a través de volúmenes montados.

### Base de Datos

El servicio se comunica con una base de datos MongoDB, la cual esta alojada en MongoDB Atlas.
Los credenciales y accesos se encuentran en el `.env.example` para mas facilidad.