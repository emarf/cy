const message = require("../../../fixtures/messages.json");

class Launcher {
  constructor() {
    this.launcherButton = "Launcher";
    this.newLauncher = "Add new launcher";
    this.integrationList = ".dropdown-with-icon__button";
    this.integrationItem = ".dropdown-with-icon__item";
  }

  openLauncher() {
    cy.clickOn(this.launcherButton);
  }

  verifyLauncherButtonPresence() {
    cy.contains(this.launcherButton).should(
      "have.css",
      "background-color",
      "rgb(38, 166, 154)"
    );
  }

  addNewLauncher() {
    cy.clickOn(this.newLauncher);
  }

  openIntegrationList() {
    cy.clickOnFirst(this.integrationList);
  }

  verifyConectedIntegrations() {
    cy.get(this.integrationItem).then((item) => {
      const itemName = item.text().trim();
      cy.invokeText(this.integrationItem).should("contain", itemName);
    });
  }
}

export const launcher = new Launcher();
