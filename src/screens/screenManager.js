const fs = require("fs");
const prompt = require("prompt-sync")();
const characterControlers = require("../../../../../src/controllers/characterController");

var dataJSON = fs.readFileSync(`${__dirname}/screenConfigFile.json`);
var config = JSON.parse(dataJSON);
 
const dbPath = "./src/database/db.json";

const log_Archive = "../../../../../Logs.txt";

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

function showOptions(actions) {
  console.log("Go to next screen: ");

  //Show possible actions
  actions.forEach((element) => {
    console.log(element);
  });
}

function exitProgram() {
  process.on("exit", function (code) {
    showScreen("exitScreen");

    return console.log(`Process to exit with code ${code}`);
  });
}

function transferToScreen(actions, content) {
  let screenFound = false;
  let crudButtons = [];
  showOptions(actions);

  actions.forEach((element) => {
    if (["c", "r", "u", "d"].includes(element.button)) {
      crudButtons.push(element.button);
    }
  });

  const input = prompt("Go to: ");

  if (crudButtons.includes(input)) {
    crudManager(input, content);
    return;
  }

  if (input == "q") {
    exitProgram();
    return;
  } else {
    actions.forEach((element) => {
      console.log(element);

      if (element.button == input) {
        nextScreenToShow = element.screenName;
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

function showInfoScreen(screenToShow) {
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions, content);
}

function showCrudScreen(screenToShow) {
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions, content);
}

function crudManager(input, content) {
  const { actions } = content;

  var today = new Date();
  var now = today.toLocaleString();
  var dbData = fs.readFileSync(dbPath);

  try {
    data = JSON.parse(dbData);
  } catch (error) {
    console.log("Check if screenConfigFile.json exists and configured.");
  }

  if (input === "c") {
    
    characterControlers.createNewCharacter();
    const contentLog = "\n" + now + " - Se ha ejecutado un CREATE";
    getHistoric(contentLog)
    prompt("Press enter to continue.");
  }

  if (input === "r") {
    
    characterControlers.getOneCharacter();
    const contentLog = "\n" + now + " - Se ha ejecutado un READ";
    getHistoric(contentLog)
    prompt("Press enter to continue.");
  }

  if (input === "u") {

    characterControlers.updateOneCharacter();
    const contentLog = "\n" + now + " - Se ha ejecutado un UPDATE";
    getHistoric(contentLog)
    prompt("Press enter to continue.");
  }

  if (input === "d") {
    
    characterControlers.deleteOneCharacter();
    const contentLog = "\n" + now + " - Se ha ejecutado un DELETE";
    getHistoric(contentLog)
    prompt("Press enter to continue.");
  }

  if (input === "all") {
    
    characterControlers.getAllCharacters();
    const contentLog = "\n" + now + " - Se ha ejecutado un GET ALL";
    getHistoric(contentLog)
    prompt("Press enter to continue.");
  }

  actions.forEach((element) => {
    if (element.button == input) {
        showScreen(element.screenName);
    }
  });
}

function screenManager(activeScreenName) {
  showScreen(activeScreenName);
};

function getHistoric(contentLog) {
  fs.access(log_Archive, fs.constants.F_OK, (err) =>{
    if(err){
      fs.writeFile(log_Archive, contentLog, (err) =>{
          if(err) throw("hubo un error al escribir en el archivo");
          console.log("se ha escrito en el archivo");
      });
    }else{
      fs.appendFile(log_Archive, contentLog, (err) =>{
          if(err) throw("No se pudo adjuntar el texto");
          console.log("Se adjunto mas informacion");
      });
    }
  });
}

screenManager.prototype.getHistoric = getHistoric;

module.exports = screenManager;

