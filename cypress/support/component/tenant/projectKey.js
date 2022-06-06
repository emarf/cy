const message = require("../../../fixtures/messages.json");

class ProjectKey {
  constructor() {
    this.projectKey = "vpn_key";
    this.integrationItem = ".tab-item__name";
    this.titleName = "#modalTitle";
    this.tabWrapper = ".tabs-wrapper";
  }

  openProjectKey() {
    cy.contains(this.projectKey).click({ force: true });
  }

  openConnection(connection) {
    cy.get(this.integrationItem).contains(connection).click({ force: true });
  }

  verifyAccessKeyIsOpened() {
    cy.invokeText(this.titleName).then((text) => {
      expect(text).to.equal(message.HUB_ACCESS);
    });
  }

  verifyDisabledTabItem(integrationName) {
    cy.waitUntil(() =>
      cy.get(this.tabWrapper).should("not.contain", integrationName)
    );
  }
}

export const projectKey = new ProjectKey();
