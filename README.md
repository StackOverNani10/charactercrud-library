# charactercrud-library

[Por Daniel Domínguez](https://www.linkedin.com/in/daniel-domínguez-pimentel-818306198/)

# Introduction

This library allows you to interact with a JSON that contains the configuration 
of each screen used in the CRUD (create, read, update and delete) of characters 
with certain attributes. Contains a local database in json format with the name 
(db.json).

## Installation
For installing de library charactercrud-library on your proyect, you have to 
run the next npm command:
```
npm install charactercrud-library

```
You can also put:
```
npm i charactercrud-library

```
## 📒 Ejemplo de uso
You have to put this code block below to run the library:

```
const sh = require("charactercrud-library");

sh.screenBuilder("mainScreen");

```
Screen Builder recieves name of main screen as a parameter, so, you need to 
write a correct name to make it work.

## Documentation
This library uses the following JSON type base structure, which all screens 
created include:

```
{
    "screenName": "Name of this screen",
    "type": "Type of screen",
    "content": {
        "screenMessage": "Message of screen",
        "actions": [
            {
                "name": "Screen name",
                "button": "Button name",
                "screenName": "Next screen name"
            },
            {
                "name": "Another Screen name",
                "button": "Another Button name",
                "screenName": "Another Next screen name"
            }
        ]
    }
}

```
- It is important that each screen has a name so that it can be called from another screen.

- The screen type must be defined according to the following options "info" or "crud".

- Within the content of the screen we have the option to insert a message which will be displayed when the screen is displayed, this field is optional.

- The "actions" field contains all the possible alternatives that the user will have, each of these has a "name" field of the required type, a "button" field which contains the name that executes the action and finally a "screenName" field. where the name of the screen to be redirected to is placed.