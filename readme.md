# NODEPOP API V1.0.0

Esta API permite el manejo de una base de datos de anuncios de productos para la elaboración de aplicaciones de compra / venta de artículos.

## URL

La URL base de esta API es: **http://localhost:3000/**

## Métodos:

Los métodos implementados son:

```
GET | POST | DELETE | PUT
```

## Rutas de acceso (URLs)

### Lista de productos

**GET /api/products?filtro**

El filtro podrá ser:

**id** = id del anuncio. Será numérico.

**product** = nombre del producto. En mayúsculas o minúsculas. Se puede dar una parte del nombre para su búsqueda.

**sale** = true/false. En mayúsculas o minúsculas. Si es un producto de venta (true) o si es de búsqueda (false)

**price** = rango inferior-rango superior. Un rango de dos precios,separados por el crácter <->. Primero el precio mas bajo y segundo el mas alto. Si no se pone algún precio, el guión ha de ponerse.

**image** = nombre del fichero de la foto. En mayúsculas o minúsculas.

**tag** = tag. En mayusculas o minusculas

**limit** = numero de registros a recibir. Será numérico.

**skip** = cantidad de registros que salto. Será numérico.

**sort** = nombre del campo por el que se ordena el listado.

**fields** = campos deseados en el listado por cada producto. Irán separados por un espacio si se da mas de uno.

Se permite cualquier combinación de ellos y se encadenan con el caracter &

### Crear un producto

**POST /api/product**

En el body de la petición añadiremos: 

**name**: Una cadena con el nombre del producto.

**sale** : true (si es venta) / false (si es búsqueda).

**price**: precio del artículo. Un número.

**image**: El nombre del fichero con la foto del artículo.

**tags**: Un array con los tags a los que corresponde el producto.

### Borrar un producto

**DELETE /api/producto?id=<id>**

id: Identificador del producto.

### Modificar un producto

**PUT /api/producto?id=<id>**

id: Identificador del producto

### lista de tags

**GET /api/tags**. Sin filtros

Devuelve un listado con los diferentes tags definidos en todos los productos

### Parámetros

**Obligatorios:**

**id** = [integer] Para POST, PUT y DELETE

**Opcionales:**

**id** = Number Para GET

**product** = String

**sale** = Boolean Para indicar venta (true) o búsqueda (false)

**price** = Number

**image** = Sring

**tags** = [String]

### Respuesta de error:
{

    "message": "Texto del mensaje",

    "estado": <Código de estado> 
} 

### Instalación:

Tras bajar el proyecto de git, dentro de la carpeta nodepop, y desde el terminal, se ejecuta

```sh
$ npm install
```

para instalar las dependencias.

Luego adaptamos nuestro fichero de variables de entorno a nuestro entorno.

Para ello copiamos rl fichero .env.example rn un fichero .env

```sh
$ cp .env.example .env
```

Y le damos a este fichero nuestra configuración.

A continuación, se crea la base de datos de arranque, teniendo previamente arrancado MongoDB. Para ello, dentro de la carpeta nodepop ejecutamos

```sh
$ npm run initDB
```

Una vez instalada la base de datos de inicio se lanza la API

```sh
$ npm run dev
```

La aplicación está lista

## Arrancar el servidor de mongoDb en MacOS

En el directorio donde se encuentre el servidor, ejecutar:

```sh
$ ./bin/mongod --dbpath ./data/db
```

## Password del desarrollador

Para acceder al API, que no a la página web, el usuario por defecto es **admin** y el password por defecto es **1234**.
