const express = require("express");
const router = express.Router();
const characterController = require("../../controllers/characterController");

router
    .get("/", characterController.getAllCharacters)
    .get("/:characterId", characterController.getOneCharacter)
    .post("/", characterController.createNewCharacter)
    .patch("/:characterId", characterController.updateOneCharacter)
    .delete("/:characterId", characterController.deleteOneCharacter);

module.exports = router;
