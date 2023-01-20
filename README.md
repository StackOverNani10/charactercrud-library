# charactercrud-library

[Por Daniel Domínguez](https://www.linkedin.com/in/daniel-domínguez-pimentel-818306198/)

# Introduction
This library allows you to interact with a JSON that contains the configuration 
of each screen used in the CRUD (create, read, update and delete) of characters 
with certain attributes. 

## Installation
For installing de library charactercrud-library on your proyect, you have to 
run the next npm command:
```
npm install @stackovernani/charactercrud-library

```
You can also put:
```
npm i @stackovernani/charactercrud-library

```

## 🚨Important❗

In your program you have to create a basic crud application and for the controllers you have to create a folder with the name "controllers" and inside a file with the name "characterControllers" where all the functions are.

Also the name of the crud functions has to be like this:
- **getOneCharacter**
- **createNewCharacter**
- **updateOneCharacter**
- **deleteOneCharacter**

if you want to modify one of those you have to make it by your self inside the (node_modules\@stackovernani\charactercrud-library).

## 📒 Usage example
You have to put this code block below to run the library:

```javascript
const sM = require("@stackovernani/charactercrud-library");

sM.screenManager("mainScreen");

```
screenManager recieves name of main screen as a parameter, so, you need to 
write a correct name to make it work.

## Extentions
This library has different extension points, using these extension points 
allows you to customize your program according to what you want to achieve.

- getHistoric extension

With this first extension you will be able to obtain a history of the 
executions carried out on it.

If you want to run this extension you must place the following block of code:

```javascript
sM.screenManager("mainScreen", { getHistoric: true });

```
By placing (getHistoric: true) we tell the program to execute the function 
created for this extension.

- colorTerminal extension

With this extension you will be able to color the main messages that your 
console displays.

If you want to run this extension you must place the following block of code:

```javascript
sM.screenManager("mainScreen", { colorTerminal: true });

```
By placing (colorTerminal: true) we tell the program to execute the function 
created for this extension.

- upperCase extension

With this extension you will be able to capitalize all the letters of the 
main messages that your console displays.

If you want to run this extension you must place the following block of code:

```javascript
sM.screenManager("mainScreen", { upperCase: true });

```
By placing (upperCase: true) we tell the program to execute the function 
created for this extension.

## Documentation
This library uses the following JSON type base structure, which all screens 
created include:

```json
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