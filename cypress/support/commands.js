require("@zebrunner/javascript-agent-cypress/lib/commands/commands");
import "cypress-wait-until";

Cypress.Commands.add("login", (username, password) => {
  const quiet = { log: false };
  cy.get("#username").type(Cypress.env("zebUserName"), quiet);

  cy.get("#signin").then((disabledButton) => {
    cy.wrap(disabledButton).should("be.visible").and("be.disabled");
  });
  cy.get("#password").type(Cypress.env("zebPassword"), quiet);
  cy.get("#signin").then((button) => {
    cy.wrap(button).should("be.visible").and("be.enabled");
    cy.wrap(button).click();
  });
});

Cypress.Commands.add("qpsLogin", (username, password) => {
  const quiet = { log: false };
  cy.get("#username").type(Cypress.env("qpsUserName"), quiet);
  cy.get("#signin").then((disabledButton) => {
    cy.wrap(disabledButton).should("be.visible").and("be.disabled");
    cy.get("#password").type(Cypress.env("qpsPassword"), quiet);
    cy.wrap(disabledButton).should("be.enabled");
    cy.wrap(disabledButton).click({ force: true });
  });
});

Cypress.Commands.add("findElement", (getElement, searchElement) => {
  return cy.wrap(getElement).find(searchElement);
});

Cypress.Commands.add("invokeText", (getElement) => {
  return cy.get(getElement).invoke("text");
});

Cypress.Commands.add("clearField", (getElement) => {
  return cy.getElement(getElement).clear();
});

Cypress.Commands.add("clickOn", (elmt) => {
  var element = cy.getElement(elmt).should("not.be.disabled");
  if (element !== null) {
    element.trigger("mouseover", { force: true }).click({ force: true });
  } else {
    cy.log("Null Element");
  }
});

Cypress.Commands.add("clickOnFirst", (elmt) => {
  var element = cy.getElement(elmt).should("not.be.disabled");
  if (element !== null) {
    element.first().click({ force: true });
  } else {
    cy.log("Null Element");
  }
});

Cypress.Commands.add("getElement", (elmt) => {
  var sLocatorType = elmt.trim().charAt(0);
  switch (sLocatorType) {
    case "^":
      elmt = elmt.replace("^", "");
      cy.waitUntil(() =>
        cy
          .contains(elmt)
          .should("be.visible")
          .then(() => {
            return cy.contains(elmt);
          })
      );
      break;
    default:
      cy.waitUntil(() =>
        cy
          .get(elmt)
          .should("be.visible")
          .then(() => {
            return cy.get(elmt);
          })
      );
      break;
  }
});
