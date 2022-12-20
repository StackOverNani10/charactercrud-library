const fs = require("fs");
const prompt = require("prompt-sync")();
const characterControlers = require("../controllers/characterController");

var dataJSON = fs.readFileSync(`${__dirname}/screenConfigFile.json`);
var config = JSON.parse(dataJSON);
 
const dbPath = "./src/database/db.json";

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
  if (type === "get") {
    showGetScreen(screenToShow);
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

  //Detect available buttons of crud
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

  //Exit if pressed q
  if (input == "q") {
    exitProgram();
    return;
  } else {
    //Call screen
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
  //Define screen parts
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions, content);
}

function showGetScreen(screenToShow) {
  //Define screen parts
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions, content);
}

function showCrudScreen(screenToShow) {
  //Define screen parts
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions, content);
}

function crudManager(input, content) {
  const { actions } = content;

  var dbData = fs.readFileSync(dbPath);

  try {
    data = JSON.parse(dbData);
  } catch (error) {
    console.log("Check if screenConfigFile.json exists and configured.");
  }

  if (input === "c") {
    
    characterControlers.createNewCharacter();
    prompt("Press enter to continue.");
  }

  if (input === "r") {
    
    characterControlers.getOneCharacter();
    prompt("Press enter to continue.");
  }

  if (input === "u") {

    characterControlers.updateOneCharacter();
    prompt("Press enter to continue.");
  }

  if (input === "d") {
    
    characterControlers.deleteOneCharacter();
    prompt("Press enter to continue.");
  }

  if (input === "all") {
    
    characterControlers.getAllCharacters();
    prompt("Press enter to continue.");
  }

  //Show next screen
  actions.forEach((element) => {
    if (element.button == input) {
        showScreen(element.screenName);
    }
  });
}

module.exports = function screenBuilder(activeScreenName) {
    showScreen(activeScreenName);
};