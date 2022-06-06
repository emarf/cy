class Integration {
  constructor() {
    this.zebPageTitle = ".ng-binding";
  }
  verifyIntegrationPageisOpened(elementName) {
    cy.get(this.zebPageTitle).contains(`${elementName}`);
    cy.url().should("contain", `/${elementName.toLowerCase(0)}`.trim());
  }
}

export const integration = new Integration();
