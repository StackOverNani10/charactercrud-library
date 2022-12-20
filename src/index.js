const jsonChecker = require("./screens/jsonChecker");
const screenBuilder = require("./screens/screenBuilder");

module.exports.screenBuilder = (activeScreenName) => {
  if (jsonChecker()) {
    screenBuilder(activeScreenName);
  }
};
