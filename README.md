# CharacterCRUD-API

[Por Daniel Domínguez](https://www.linkedin.com/in/daniel-domínguez-pimentel-818306198/)

<br>

Esta api te permite crear, leer, actualizar y eliminar caracteres con 
desterminados atributos. Contiene una base de datos local en formato json
con el nombre (db.json).

<br>

## 📒 Ejemplo de uso
```
###
POST http://localhost:3000/api/v1/characters
Content-Type: application/json

{
    "nombre": "Bruno",
    "apellido": "Pie",
    "puntaje": "82",
    "habilidad": "Super patada"
}

###
GET http://localhost:3000/api/v1/characters

###
PATCH  http://localhost:3000/api/v1/characters/{id}
Content-Type: application/json

{
    "nombre": "Herald"
}

###
DELETE http://localhost:3000/api/v1/characters/{id}

```
