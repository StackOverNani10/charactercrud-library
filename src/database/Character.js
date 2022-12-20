const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllCharacters = () => {
    return DB.characters;
};

const getOneCharacter = (characterId) => {
    const character = DB.characters.find(
        (characters) => characters.id === characterId
    );
    if (!character) {
        return;
    }
    return character
};

const createNewCharacter = (newCharacter) => {
    const isAlreadyAdded = 
    DB.characters.findIndex(
        (characters) => characters.name === newCharacter.name) > -1;
    
    if (isAlreadyAdded) {
        return;
    }

    DB.characters.push(newCharacter);
    saveToDatabase(DB);
    return newCharacter;
};

const updateOneCharacter = (characterId, changes) => {
    const indexForUpdated = DB.characters.findIndex(
        (characters) => characters.id === characterId
    );

    if (indexForUpdated === -1) {
        return;
    }

    const updatedCharacter = {
        ...DB.characters[indexForUpdated],
        ...changes,
    };

    DB.characters[indexForUpdated] = updatedCharacter;
    saveToDatabase(DB);
    return updatedCharacter;
};

const deleteOneCharacter = (characterId) => {
    const indexForDeleted = DB.characters.findIndex(
        (characters) => characters.id === characterId
    );

    if (indexForDeleted === -1) {
        return;
    }

    DB.characters.splice(indexForDeleted, 1);
    saveToDatabase(DB);
};

module.exports = { 
    getAllCharacters, 
    getOneCharacter, 
    createNewCharacter, 
    updateOneCharacter,
    deleteOneCharacter,
};