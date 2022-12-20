const fs = require("fs");
const prompt = require("prompt-sync")();

var dataJSON = fs.readFileSync(`${__dirname}/screenConfigFile.json`);

function exitProgram() {
  process.on("exit", function (code) {
    return console.log(`Process to exit with code 1`);
  });
}

function isJsonString() {
  try {
    config = JSON.parse(dataJSON);
  } catch (error) {
    console.log("JSON structure is invalid");
    console.log(error);
    return false;
  }
  return true;
}

module.exports = () => {
  const isJsonValid = isJsonString();
  console.clear();

  let screenNames = [];
  let errorEncountred = false;

  if (!isJsonValid) {
    errorEncountred = true;
    exitProgram();
    return false;
  }

  config.forEach((item) => {
    if (item.screenName) {
      screenNames.push(item.screenName);
    }
  });
  screenNames.push("");

  config.forEach((e, index) => {
    let screenName = "";
    
    if (!e.screenName) {
      console.log(`ERROR: Screen number ${index + 1} does not have a name`);
      screenName = `Screen ${index + 1}`;
      errorEncountred = true;
    } else {
      screenName = e.screenName;
    }

    const validTypes = ["info", "crud"];

    if (!e.type) {
      console.log(`ERROR: Screen ${screenName} does not have a type`);
      errorEncountred = true;
    } else {
      
      if (!validTypes.includes(e.type)) {
        console.log(
          `ERROR: Type of ${screenName} "${e.type}" is not correct. It should be one of this: ${validTypes}`
        );
        errorEncountred = true;
      }
    }

    
    if (!e.content) {
      console.log(`ERROR: Screen ${screenName} does not have a content`);
      errorEncountred = true;
    } else {
      
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

    
  });
  if (errorEncountred) {
    exitProgram();
    prompt();
    return false;
  }
  return true;
};