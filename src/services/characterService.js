const crypto = require("crypto");
const Character = require("../database/Character");

const getAllCharacters = () => { 
   const allCharacters = Character.getAllCharacters();
   return allCharacters;
};
const getOneCharacter = (characterId) => { 
    const character = Character.getOneCharacter(characterId);
    return character; 
};

const createNewCharacter = (newCharacter) => { 
    const characterToInsert = {
        id: crypto.randomUUID(),
        ...newCharacter,
    }

    const createdCharacter = Character.createNewCharacter(characterToInsert);
    return createdCharacter;
};
const updateOneCharacter = (characterId, changes) => { 
    const updatedCharacter = Character.updateOneCharacter(characterId, changes);
    return updatedCharacter;
};
const deleteOneCharacter = (characterId) => { 
    Character.deleteOneCharacter(characterId); 
};

module.exports = {
    getAllCharacters,
    getOneCharacter,
    createNewCharacter,
    updateOneCharacter,
    deleteOneCharacter
};
