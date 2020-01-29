# Servidor RESTful con NodeJS

En este servidor se podrá hacer peticiones para modificar los registros de una base moongosee de datos local
o en línea a traves de llamados GET,POST,PUT Y DELETE.
Recuerda instalar los paquetes

```
npm install
```
EJECUCION

```
node server/server
```

LISTAR USAURIOS
LLAMADO GET
```
localhost:[puerto_asignado]/usuario
```
REGISTRAR USAURIOS
LLAMADO POST
```
localhost:[puerto_asignado]/usuario
INGRESOS:
    nombre-
    email-
    password-
    role-'ADMIN_ROLE' o 'USER_ROLE'
    img-
```
EDITAR USAURIOS
LLAMADO PUT
```
localhost:[puerto_asignado]/usuario/:id
INGRESOS:
    nombre-
    email-
    password-
    role-'ADMIN_ROLE' o 'USER_ROLE'
    img-
```

ELIMINAR USAURIOS
LLAMADO DELETE
NOTA: ESTA PETICION NO ES BUENA PARA BASES DE DATOS, NO ES BUENO ELIMINAR DATOS DE LA BASE
DADO QUE SIEMPRE ES BUENO TENER UN BUEN REGISTRO DE TODOS LOS SUCESOS.
```
localhost:[puerto_asignado]/usuario/:id

```