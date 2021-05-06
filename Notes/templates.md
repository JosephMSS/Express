# Templates

> Express permite crear nuestros propios templates

### Composicion

`app.engine('ext',function(filepath,options,,callback){})`

> `ext`: hace referencia a la extension del archivo.

> `function(filepath,options,,callback)`:

- `filePath`: ubicacion donde se aloja el archivo.
- `options`: Las variables que le vamos a enviar al template.
- `callback`: Es el metodo que va a retornar toso el contenido.

### Especificar el directorio de las vistas

`app.set('views','./views')`

> `'views'`: Especifica que estamos registrando las vistas.

> `'./views'`:se uede llamar de esta u otra manera, aqui especificamos el directorio donde se va a encontrar las vistas.

###  Registrar el template engine
```app.set('view engine','ext')```
>`'view engine'`: especifica que estamos registrando un template engine.
>`'ext'`: la extension del archivo que vamos a utilizar.

 