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
const chalk = require("chalk");

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
 * @param {("mainScreen" | "crudCharacter" | "exitScreen" | "error404Screen")} activeScreenName - Name of the first screen you want to show
 * @param {{ getHistoric: true, colorTerminal: true }} [options] - You can activate the different Extension by putting -> (Extension name): true
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

  /**
   *  first extention
   */
  if (opt.colorTerminal) {
    showScreen(activeScreenName, { colorTerminal: true });
  } else {
    showScreen(activeScreenName);
  }

  /**
   * second extention
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

  /**
   * third extention
   */
  if (opt.upperCase) {
    showScreen(activeScreenName, { upperCase: true });
  } else {
    showScreen(activeScreenName);
  }
};

/**
 * 
 * Param for getScreenToShow function.
 * 
 * @param {string} screenName 
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
 * @param {string} screenName 
 * @param {object} options 
 * @returns 
 */

function showScreen(screenName, options) {
  console.clear();
  const screenToShow = getScreenToShow(screenName);
  const { type } = screenToShow;
  var opt = options || {};

  if (opt.upperCase && type === "info") {
    showInfoScreen(screenToShow, { upperCase: true });
    return;
  }
  if (opt.upperCase && type === "crud") {
    showCrudScreen(screenToShow, { upperCase: true });
    return;
  }
  if (opt.colorTerminal && type === "info") {
    showInfoScreen(screenToShow, { colorTerminal: true });
    return;
  }
  if (opt.colorTerminal && type === "crud") {
    showCrudScreen(screenToShow, { colorTerminal: true });
    return;
  }
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
 * @param {string} actions 
 * @param {object} options 
 */

function showOptions(actions, options) {
  var opt = options || {};
  if (opt.colorTerminal){
    console.log(chalk.red.bold("Go to next screen: "));
  } else {
    if (opt.upperCase){
      console.log("Go to next screen: ".toUpperCase());
    } else{
      console.log("Go to next screen: ");
    }
  }

  //Show possible actions
  actions.forEach((element) => {
    console.log(element);
  });
}

/**
 * 
 * Param for exitProgram function.
 * 
 * @param {object} options 
 */

function exitProgram(options) {
  var opt = options || {};
  process.on("exit", function (code) {
    if (opt.colorTerminal) {
      showScreen("exitScreen", { colorTerminal: true });
    } else {
      if (opt.upperCase){
        showScreen("exitScreen", { upperCase: true });
      } else {
        showScreen("exitScreen");
      }
    }

    return console.log(`Process to exit with code ${code}`);
  });
}

/**
 * 
 * Param for transferToScreen function.
 * 
 * @param {*} actions 
 * @param {*} content 
 * @param {object} options 
 * @returns 
 */

function transferToScreen(actions, content, options) {
  let screenFound = false;
  let crudButtons = [];
  var opt = options || {};

  if (opt.colorTerminal){
    showOptions(actions, { colorTerminal: true });
  } else {
    showOptions(actions);
  }
  if (opt.upperCase){
    showOptions(actions, { upperCase: true });
  } else {
    showOptions(actions);
  }

  actions.forEach((element) => {
    if (["c", "r", "u", "d"].includes(element.button)) {
      crudButtons.push(element.button);
    }
  });

  const inputVal = prompt("Go to: ");

  if (crudButtons.includes(inputVal)) {
    if (opt.colorTerminal){
      crudManager(inputVal, content, { colorTerminal: true });
    } else {
      if (opt.upperCase){
        crudManager(inputVal, content, { upperCase: true });
      } else {
        crudManager(inputVal, content);
      }
    }
    return;
  }

  if (inputVal == "q") {
    if (opt.colorTerminal) {
      exitProgram({ colorTerminal: true });
    } else {
      if (opt.upperCase){
        exitProgram({ upperCase: true });
      } else {
        exitProgram();
      }
    }
    return;
  } else {
    actions.forEach((element) => {
      console.log(element);

      if (element.button == inputVal) {
        var nextScreenToShow = element.screenName;
        console.log(nextScreenToShow);
        if (opt.colorTerminal) {
          showScreen(nextScreenToShow, { colorTerminal: true });
        } else {
          if (opt.upperCase){
            showScreen(nextScreenToShow, { upperCase: true });
          } else {
            showScreen(nextScreenToShow);
          }
        }
        screenFound = true;
        return;
      }
    });

    if (!screenFound) {
      if (opt.colorTerminal) {
        showScreen("error404Screen", { colorTerminal: true });
      } else {
        if (opt.upperCase){
          showScreen("error404Screen", { upperCase: true });
        } else {
          showScreen("error404Screen");
        }
      }
      return;
    }
  }
}

/**
 * 
 * Param for showInfoScreen function.
 * 
 * @param {string} screenToShow 
 * @param {object} options 
 */

function showInfoScreen(screenToShow, options) {
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;
  var opt = options || {};

  if (opt.colorTerminal){
    console.log(chalk.red.bold(screenMessage));
    transferToScreen(actions, content, { colorTerminal: true });
  } else {
    if (opt.upperCase){
      console.log(screenMessage.toUpperCase());
      transferToScreen(actions, content, { upperCase: true });
    } else {
      console.log(screenMessage);
      transferToScreen(actions, content);
    }
  }
}

/**
 * 
 * Param for showCrudScreen function.
 * 
 * @param {string} screenToShow 
 * @param {object} options 
 */

function showCrudScreen(screenToShow, options) {
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;
  var opt = options || {};

  if (opt.colorTerminal){
    console.log(chalk.red.bold(screenMessage));
    transferToScreen(actions, content, { colorTerminal: true });
  } else {
    if (opt.upperCase){
      console.log(screenMessage.toUpperCase());
      transferToScreen(actions, content, { upperCase: true });
    } else {
      console.log(screenMessage);
      transferToScreen(actions, content);
    }
  }
}

/**
 * 
 * Param for crudManager function.
 * 
 * @param {string} inputVal 
 * @param {*} content 
 * @param {object} options 
 */

function crudManager(inputVal, content, options) {
  const { actions } = content;
  var opt = options || {};

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
      if (opt.colorTerminal){
        showScreen(element.screenName, { colorTerminal: true });
      } else {
        if (opt.upperCase){
          showScreen(element.screenName, { upperCase: true });
        } else {
          showScreen(element.screenName);
        }
      }
    }
  });
}
