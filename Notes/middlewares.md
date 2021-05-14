# Middlewares
## Que son?
>Es uns funcion que tiene  tres argumentos, `req,res,next`, donde next es un callback que se encarga de llamar al siguiente middleware

>Estos funcionan para hacer validaciones/modificaciones al req o al res, manejo de errores.

>La parte mas importante es llamar la funcion next

## Log de errores
>Para que un middleware que maneje errores sea detectado por express este debe de tener la siguiente estructura en sus parametros.
```
function errorHandler(err,req,res,next)
{
    res.status(err.status||500)
    res.render("error",{error:err})
}
```
Podemos crear una carpeta de middlewares en la carpeta de utilidades

```
function logErrors(err,req,res,next){
    console.log(err.stack);
    next(err)
}
```
Al llamar la funcion next con el error, este llama al middleware de error y en caso de que no exista este lo manda al manejador nativo.
## Errores en el cliente
> Verficamos con la cabecera  `xhr` para detectar qeue la peticion fue hecha por un cliente.
```
function clientError(err,req,res,next){
    if(req.xhr){
        res.status(500).json({err:err.message})
    }else{
        next(err)
    }

}
```
>Para poder tener habilitado los errores en el api debemos habilitar la cabecera `X-Requested-With`con el valor `XMLHttpRequest`
## Middleware por defecto
> En caso de que sucedan errores con archivos de tipo streaming express no es capaz decapturarlo, por lo tanto con la cabecera res.headersSent llamamos la funcion next con el error
```
function errorHandler(err,req,res,next){
    if(req.headersSent){
        next(err)
    }
    //Eliminamos el stack de errores para ///que no sean visibles a los usuarios
    if(!config.dev){
        delete err.stack
    }
    res.status(err.status||500)
    res.render('error',{err:err})
}
```
> Los middlewares de error debe de estar al final ya que en caso de algun error en las rutas estos caigan en el middleware

>Podemos lazar errores con throw new Error('Mensaje de error')
## Middleware de validacion de datos
>Esta va a ser una funcion de tipo closure, esta funcion retorna otra  funcion la cual va a ser el middleware, esto parapoder grabar el esquema(las reglas de como deben de ser nuestros datos), y como segundo parametro va  ser donde se recibe el request