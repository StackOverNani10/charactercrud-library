const fs = require("fs");
const { callbackify } = require("util");
const prompt = require("prompt-sync")();

var dataJSON = fs.readFileSync(`${__dirname}/screenConfigFile.json`);
// var config = JSON.parse(dataJSON);

function exitProgram() {
  process.on("exit", function (code) {
    return console.log(`Process to exit with code 1`);
  });
}

function isJsonString() {
  try {
    config = JSON.parse(dataJSON);
  } catch (e) {
    console.log("JSON structure is invalid");
    console.log(e);
    return false;
  }
  return true;
}

module.exports = () => {
  const isJsonValid = isJsonString();
  console.log("\033[2J");

  let screenNames = [];
  let errorEncountred = false;

  if (!isJsonValid) {
    errorEncountred = true;
    exitProgram();
    return false;
  }

  config.forEach((e) => {
    if (e.screenName) {
      screenNames.push(e.screenName);
    }
  });
  screenNames.push("");

  config.forEach((e, index) => {
    let screenName = "";
    //Check if have name:
    if (!e.screenName) {
      console.log(`ERROR: Screen number ${index + 1} does not have a name`);
      screenName = `Screen ${index + 1}`;
      errorEncountred = true;
    } else {
      screenName = e.screenName;
    }
    //

    //Check if type exists
    const validTypes = ["info", "crud"];

    if (!e.type) {
      console.log(`ERROR: Screen ${screenName} does not have a type`);
      errorEncountred = true;
    } else {
      //Check if type is valid
      if (!validTypes.includes(e.type)) {
        console.log(
          `ERROR: Type of ${screenName} "${e.type}" is not correct. It should be one of this: ${validTypes}`
        );
        errorEncountred = true;
      }
    }

    //CHeck if content exists
    if (!e.content) {
      console.log(`ERROR: Screen ${screenName} does not have a content`);
      errorEncountred = true;
    } else {
      //Check if screenMessage is in content
      if (!e.content.screenMessage) {
        console.log(
          `ERROR: Inside the content of ${screenName} does not appear screen message "screenMessage":`
        );
        errorEncountred = true;
      }

      if (!e.content.actions) {
        console.log(
          `ERROR: Inside the content of ${screenName} does not appear actions "actions":`
        );
        errorEncountred = true;
      } else {
        var elements = [];

        e.content.actions.forEach((e, i) => {
          Object.keys(e).forEach((element) => {
            elements.push(element);
          });

          if (!elements.includes("name")) {
            console.log(
              `ERROR: Inside the action N. ${
                i + 1
              } of ${screenName} does not appear name "name".`
            );
            errorEncountred = true;
          }
          if (!elements.includes("button")) {
            console.log(
              `ERROR: Inside the action N. ${
                i + 1
              } of ${screenName} does not appear button "button".`
            );
            errorEncountred = true;
          }
          if (!elements.includes("screenName")) {
            console.log(
              `ERROR: Inside the action N. ${
                i + 1
              } of ${screenName} does not appear screen name "screenName.`
            );
            errorEncountred = true;
          }

          elements = [];

          //Check if screen name is defined
          if (!screenNames.includes(e.screenName)) {
            console.log(
              `ERROR: Inside the action N. ${
                i + 1
              } of ${screenName} appear screen named ${
                e.screenName
              } but it doesn exists`
            );
            errorEncountred = true;

            console.log(`Next screens are defined: ${screenNames}`);
          }
        });
      }
    }

    //content
  });
  if (errorEncountred) {
    exitProgram();
    prompt();
    return false;
  }
  return true;
};
//Screen does not have some component

//Redirects to screen which does not exist

//type is written incorrectly