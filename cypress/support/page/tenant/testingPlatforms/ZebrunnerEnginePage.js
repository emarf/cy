/// <reference types="Cypress" />

const integrations = require("../../../../fixtures/integrations.json");
const message = require("../../../../fixtures/messages.json");

import { integration } from "../../../component/tenant/integration.js";
import { popUp } from "../../../component/tenant/popUp.js";
import { sidebar } from "../../../component/tenant/sidebar.js";

class ZebrunnerEnginePage {
  constructor() {
    this.breadCrum = ".zeb-page-header";
    this.description = ".integration-config-intro__description";
    this.goToDocumentation =
      ".integration-config-intro__documentation-link-text";
    this.arrowForward = "arrow_forward_ios";
    this.warning = ".integration-config-intro__description-paragraph";
    this.arrowBack = "arrow_back_ios";
    this.hubURLField = "#integrationHubUrl";
    this.userNameField = "#integrationUsername";
    this.accessKeyField = "#integrationAccessKey";
    this.footerForm = ".test-provider-form__footer-actions";
    this.powerButton = "power_settings_new";
  }

  clickDeleteButton() {
    cy.clickOn(this.deleteButton);
  }

  clickGoToDucumentationButton() {
    cy.clickOn(this.goToDocumentation);
  }

  clickSwipeRightButton() {
    cy.contains(this.scrollForward).should("be.visible");
    cy.clickOn(this.scrollForward);
  }

  clickSwipeLeftButton() {
    cy.contains(this.scrollBack).should("be.visible");
    cy.clickOn(this.scrollBack);
  }

  clickPowerButton() {
    cy.clickOn(this.powerButton);
  }

  clickTestButton() {
    cy.get(this.footerActions).contains("Test").click({ force: true });
  }

  enterFieldURL() {
    cy.clearField(this.urlField).type(Cypress.env("zebEngineURL"), {
      log: false,
    });
  }

  enterUserName() {
    cy.clearField(this.keyField).type(Cypress.env("zebEngineUserName"), {
      log: false,
    });
  }

  enterPassword() {
    cy.clearField(this.secretField).type(Cypress.env("zebEngineKey"), {
      log: false,
    });
  }

  getSidebar() {
    return sidebar;
  }

  getPopUp() {
    return popUp;
  }

  getIntegration() {
    return integration;
  }

  verifyBreadCrums() {
    cy.invokeText(this.headerTitle).then((headerText) => {
      expect(headerText).to.eq(integrations.TESTING_PLATFORMS.ZEBRUNNER_ENGINE);
    });
  }

  verifyGoToDocumentationButton() {
    cy.get(this.goToDocumentation).should(
      "contain",
      message.GO_TO_DOCUMENTATION
    );
  }

  verifyWarningMessage() {
    const warningMessage = cy.get(this.warning).text().trim();
    cy.get(this.description).should("contain", warningMessage);
  }

  verifyPowerButtonStatus(status) {
    cy.contains(this.powerButton).should(status);
  }
}

export const zebrunnerEngine = new ZebrunnerEnginePage();
