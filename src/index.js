const screenManager = require("./screens/screenManager");

module.exports.screenManager = (activeScreenName) => {
  screenManager(activeScreenName);
};
