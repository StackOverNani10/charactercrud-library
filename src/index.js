/*!
 * charactercrud-library
 * Author Daniel Domínguez
 * ISC Licensed
 */

'use strict';

/**
 * Module exports.
 * @public
 */

const fs = require("fs");
const prompt = require("prompt-sync")();

/**
 * Required files
 */
const characterControlers = require("../../../../src/controllers/characterController");
var dataJSON = fs.readFileSync(`${__dirname}/screens/screenConfigFile.json`);
var config = JSON.parse(dataJSON);
const log_Archive = "Logs.txt";

/**
 * Module to export
 */
exports.screenManager = screenManager;

/**
 * Param for screenManager module.
 *
 * screenManager("mainScreen", { getHistoric: true })
 *   => "show The Screen; run getHistoric function"
 *
 * @param {string} activeScreenName
 * @param {object} [options]
 * @return {object}
 * @public
 */

function screenManager(activeScreenName, options) {
  var opt = options || {};

  if (typeof activeScreenName !== 'string') {
    throw new TypeError('argument activeScreenName must be a string');
  }

  if (typeof opt !== 'object') {
    throw new TypeError('option is invalid');
  }

 showScreen(activeScreenName);
  
  /**
   * first extention
   */
  if (opt.getHistoric) {
    var today = new Date();
    var now = today.toLocaleString();
    var contentLog = "\n" + now + " - Se ejecutó una función dentro del programa";

    fs.access(log_Archive, fs.constants.F_OK, (err) =>{
      if(err){
        fs.writeFile(log_Archive, contentLog, (err) =>{
            if(err) throw("hubo un error al escribir en el archivo");
            console.clear();
            prompt("Se ha escrito informacion en el archivo Logs.txt\nPresione Enter para continuar...");
        });
      }else{
        fs.appendFile(log_Archive, contentLog, (err) =>{
            if(err) throw("No se pudo adjuntar el texto");
            console.clear();
            prompt("Se adjunto mas informacion en el archivo Logs.txt\nPresione Enter para continuar...");
        });
      }
    });
  }
};

/**
 * 
 * Param for getScreenToShow function.
 * 
 * @param {*} screenName 
 * @returns 
 */

function getScreenToShow(screenName) {
  const JSONconfig = config;
  let screenNameToShow = [];

  JSONconfig.forEach(element => {
    if (screenName === element.screenName) {
        screenNameToShow = element;
    }
  });

  return screenNameToShow;
}

/**
 * 
 * Param for showScreen function.
 * 
 * @param {*} screenName 
 * @returns 
 */

function showScreen(screenName) {
  console.clear();
  const screenToShow = getScreenToShow(screenName);
  const { type } = screenToShow;

  if (type === "info") {
    showInfoScreen(screenToShow);
    return;
  }
  if (type === "crud") {
    showCrudScreen(screenToShow);
    return;
  }
}

/**
 * 
 * Param for showOptions function.
 * 
 * @param {*} actions 
 */

function showOptions(actions) {
  console.log("Go to next screen: ");

  //Show possible actions
  actions.forEach((element) => {
    console.log(element);
  });
}

/**
 * 
 * exitProgram function.
 */

function exitProgram() {
  process.on("exit", function (code) {
    showScreen("exitScreen");

    return console.log(`Process to exit with code ${code}`);
  });
}

/**
 * 
 * Param for transferToScreen function.
 * 
 * @param {*} actions 
 * @param {*} content 
 * @returns 
 */

function transferToScreen(actions, content) {
  let screenFound = false;
  let crudButtons = [];
  showOptions(actions);

  actions.forEach((element) => {
    if (["c", "r", "u", "d"].includes(element.button)) {
      crudButtons.push(element.button);
    }
  });

  const inputVal = prompt("Go to: ");

  if (crudButtons.includes(inputVal)) {
    crudManager(inputVal, content);
    return;
  }

  if (inputVal == "q") {
    exitProgram();
    return;
  } else {
    actions.forEach((element) => {
      console.log(element);

      if (element.button == inputVal) {
        var nextScreenToShow = element.screenName;
        console.log(nextScreenToShow);
        showScreen(nextScreenToShow);
        screenFound = true;
        return;
      }
    });

    if (!screenFound) {
        showScreen("error404Screen");
      return;
    }
  }
}

/**
 * 
 * Param for showInfoScreen function.
 * 
 * @param {*} screenToShow 
 */

function showInfoScreen(screenToShow) {
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions, content);
}

/**
 * 
 * Param for showCrudScreen function.
 * 
 * @param {*} screenToShow 
 */

function showCrudScreen(screenToShow) {
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions, content);
}

/**
 * 
 * Param for crudManager function.
 * 
 * @param {*} inputVal 
 * @param {*} content 
 */

function crudManager(inputVal, content) {
  const { actions } = content;

  if (inputVal === "c") {
    characterControlers.createNewCharacter();
    prompt("Press enter to continue.");
  }

  if (inputVal === "r") {
    characterControlers.getOneCharacter();
    prompt("Press enter to continue.");
  }

  if (inputVal === "u") {
    characterControlers.updateOneCharacter();
    prompt("Press enter to continue.");
  }

  if (inputVal === "d") {
    characterControlers.deleteOneCharacter();
    prompt("Press enter to continue.");
  }

  if (inputVal === "all") {
    characterControlers.getAllCharacters();
    prompt("Press enter to continue.");
  }

  actions.forEach((element) => {
    if (element.button == inputVal) {
        showScreen(element.screenName);
    }
  });
}
