const zbrPlugin = require("@zebrunner/javascript-agent-cypress/lib/plugin");
const cucumber = require("cypress-cucumber-preprocessor").default;

const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress", "config", `${file}.json`);

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  zbrPlugin(on, config);
  on("file:preprocessor", cucumber());

  const file = config.env.name || "default";

  return getConfigurationByFile(file);
};
