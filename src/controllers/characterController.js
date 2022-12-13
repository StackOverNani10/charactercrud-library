const characterService = require("../services/characterService");
const isGood = require("succes-character-create");

const getAllCharacters = (req, res) => {
    const allCharacters = characterService.getAllCharacters();
    res.send({ status: 'OK', data: allCharacters });
};

const getOneCharacter = (req, res) => {
    const {
        params: { characterId },
    } = req;

    if (!characterId) {
        return;
    }

    const character = characterService.getOneCharacter(characterId);
    res.send({ status: "OK", data: character });
};

const createNewCharacter = (req, res) => {
    const { body } = req;

    if (
        !body.nombre || 
        !body.apellido || 
        !body.puntaje || 
        !body.habilidad
    ) {
        const result = isGood("No Ok");
        res.send({ status: "No OK", result });
        return;
    }

    const newCharacter = {
        nombre: body.nombre,
        apellido: body.apellido,
        puntaje: body.puntaje,
        habilidad: body.habilidad
    };

    const createdCharacter = characterService.createNewCharacter(newCharacter);
    const result = isGood("OK");
    res.status(201).send({ status: "OK", result, data: createdCharacter });
};

const updateOneCharacter = (req, res) => {
    const { 
        body, 
        params: { characterId },
    } = req;

    if (!characterId) {
        return;
    }

    const updatedCharacter =  characterService.updateOneCharacter(characterId, body);
    res.send({ status: "OK", data: updatedCharacter });
};

const deleteOneCharacter = (req, res) => {
    const { 
        body, 
        params: { characterId },
    } = req;

    if (!characterId) {
        return;
    }

    characterService.deleteOneCharacter(characterId);
    res.status(204).send({ status: "OK" });
};

module.exports = {
    getAllCharacters,
    getOneCharacter,
    createNewCharacter,
    updateOneCharacter,
    deleteOneCharacter
};