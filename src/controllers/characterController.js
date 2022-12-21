const characterService = require("../services/characterService");
const prompt = require('prompt-sync')();

function switchFieldSelected(changeMade) {
    switch (changeMade) {
        case "name":
            const newName = prompt('Escriba el nuevo nombre: ');
            const Updatedname = {
                name: newName
            };
            return Updatedname;
        
        case "surname":
            const newSurname = prompt('Escriba el nuevo apellido: ');
            const Updatedsurname = {
                surname: newSurname
            };
            return Updatedsurname;

        case "points":
            const newPoints = prompt('Escriba el nuevo puntaje: ');
            const Updatedpoints = {
                points: newPoints
            };
            return Updatedpoints;

        case "skill":
            const newSkill = prompt('Escriba la habilidad nueva: ');
            const Updatedskill = {
                skill: newSkill
            };
            return Updatedskill;
        
        case "all":
            const name = prompt('Escriba el nuevo nombre: ');
            const surname = prompt('Escriba el nuevo apellido: ');
            const points = prompt('Escriba el nuevo puntaje: ');
            const skill = prompt('Escriba la habilidad nueva: ');
            const UpdatedAll = {
                name: name,
                surname: surname,
                points: points,
                skill: skill
            };
            return UpdatedAll;

        default:
            const defaultMsg = "Introduzca un nombre da campo valido";
            return defaultMsg;
    }
};

function getAllCharacters() {
    const allCharacters = characterService.getAllCharacters();
    console.log({ status: 'OK', data: allCharacters });
};

function getOneCharacter() {
    console.clear();
    const characterId = prompt('Escriba el id del caracter a buscar: ');

    if (!characterId) {
        return;
    }

    const character = characterService.getOneCharacter(characterId);

    if (character) {
        console.clear()
        console.log({ status: "OK", data: character });
    } else {
        console.log(`Elemento con id ${characterId} no existe!`);
    }
};

function createNewCharacter() {
    console.clear();
    const name = prompt('Escriba el nombre: ');
    const surname = prompt('Escriba el apellido: ');
    const points = prompt('Escriba el puntaje: ');
    const skill = prompt('Escriba la habilidad: ');

    if (
        !name || 
        !surname || 
        !points || 
        !skill
    ) {
        console.log({ status: "No OK", msg: "Ingrese todos los campos requeridos" });
        return;
    } else {
        const newCharacter = {
            name: name,
            surname: surname,
            points: points,
            skill: skill
        };
        
        var createdCharacter = characterService.createNewCharacter(newCharacter);
        console.clear();
        console.log({ status: "OK", data: createdCharacter });
    }
};

function updateOneCharacter() {
    console.clear();
    const characterId = prompt('Escriba el id del caracter: ');

    if (!characterId) {
        console.log("Inserte un id");
    } else {
        const changeMade = prompt("Escriba el campo que desee cambiar (name | surname | points | skill | all) campo: ");

        var newData = switchFieldSelected(changeMade);
        if (newData != "Introduzca un nombre da campo valido") {
            const updatedCharacter =  characterService.updateOneCharacter(characterId, newData);
            console.clear();
            console.log({ status: "OK", data: updatedCharacter });
        } else {
            console.log({ status: "No OK", msg: "Revise el nombre de campo insertado" });
        }
        
    }
};

function deleteOneCharacter() {
    console.clear();
    const characterId = prompt('Escriba el id del caracter: ');

    if (!characterId) {
        console.log("Inserte un id");
        return;
    }

    characterService.deleteOneCharacter(characterId);
    console.log({ status: "OK", msg: `Caracter de id ${characterId} eliminado` });
};

module.exports = {
    getAllCharacters,
    getOneCharacter,
    createNewCharacter,
    updateOneCharacter,
    deleteOneCharacter
};