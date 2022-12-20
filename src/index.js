//const jsonValidator = require("./screens/jsonValidator");
const screenBuilder = require("./screens/screenBuilder");

module.exports.screenBuilder = (activeScreenName) => {
  //if (jsonValidator()) {
  //  screenBuilder(activeScreenName);
  //}
  screenBuilder(activeScreenName);
};
