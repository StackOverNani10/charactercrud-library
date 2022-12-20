const crypto = require("crypto");
const Character = require("../database/Character");

function getAllCharacters() { 
   const allCharacters = Character.getAllCharacters();
   return allCharacters;
};

function getOneCharacter(characterId) { 
    const character = Character.getOneCharacter(characterId);
    return character; 
};

function createNewCharacter(newCharacter) { 
    const characterToInsert = {
        id: crypto.randomUUID(),
        ...newCharacter,
    }

    const createdCharacter = Character.createNewCharacter(characterToInsert);
    return createdCharacter;
};

function updateOneCharacter(characterId, changes) { 
    const updatedCharacter = Character.updateOneCharacter(characterId, changes);
    return updatedCharacter;
};

function deleteOneCharacter(characterId) { 
    Character.deleteOneCharacter(characterId); 
};

module.exports = {
    getAllCharacters,
    getOneCharacter,
    createNewCharacter,
    updateOneCharacter,
    deleteOneCharacter
};
