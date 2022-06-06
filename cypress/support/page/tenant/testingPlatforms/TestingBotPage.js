/// <reference types="Cypress" />

const integrations = require("../../../../fixtures/integrations.json");
const message = require("../../../../fixtures/messages.json");

import { integration } from "../../../component/tenant/integration.js";
import { popUp } from "../../../component/tenant/popUp.js";
import { sidebar } from "../../../component/tenant/sidebar.js";

class TestingBotPage {
  constructor() {
    this.headerTitle = ".zeb-page-header__title";
    this.providerName = ".integration-config-intro__provider-name";
    this.descriptionText = ".integration-config-intro__description-paragraph";
    this.goToDocumentation =
      ".integration-config-intro__documentation-link-text";
    this.noAccountText = ".integration-config-intro__create-account-text";
    this.createAccount = ".integration-config-intro__create-account-link";
    this.urlField = "#integrationHubUrl";
    this.keyField = "#integrationAccessKey";
    this.secretField = "#integrationSecret";
    this.footerActions = ".test-provider-form__footer-actions";
    this.powerButton = "power_settings_new";
    this.deleteButton = "delete_outline";
    this.arrowForward = "arrow_forward_ios";
    this.arrowBack = "arrow_back_ios";
  }

  clickCreateButton() {
    cy.clickOn(this.createAccount);
  }

  clickDeleteButton() {
    cy.clickOn(this.deleteButton);
  }

  clickGoToDucumentationButton() {
    cy.clickOn(this.goToDocumentation);
  }

  clickSaveButton() {
    cy.get(this.testProviderFooter).contains("Save").should("be.enabled");
    cy.get(this.testProviderFooter)
      .contains("Save")
      .should("have.css", "background-color", "rgb(38, 166, 154)");
    cy.get(this.testProviderFooter).contains("Save").click();
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
    cy.clearField(this.urlField).type(Cypress.env("testingBotURL"), {
      log: false,
    });
  }

  enterKey() {
    cy.clearField(this.keyField).type(Cypress.env("testingBotKey"), {
      log: false,
    });
  }

  enterSecret() {
    cy.clearField(this.secretField).type(Cypress.env("testingBotSecret"), {
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
      expect(headerText).to.eq(integrations.TESTING_PLATFORMS.TESTING_BOT);
    });
  }

  verifyCreateButtonPresence() {
    cy.invokeText(this.createAccount).then((text) => {
      expect(text).to.contain(message.CREATE);
    });
  }

  verifyDeleteButtonPresence() {
    cy.contains(this.deleteButton).should("be.visible");
  }

  verifyGoToDocumentationButton() {
    cy.get(this.goToDocumentation).should(
      "contain",
      message.GO_TO_DOCUMENTATION
    );
  }

  verifyPowerButtonStatus(status) {
    cy.contains(this.powerButton).should(status);
  }
}

export const testingBotPage = new TestingBotPage();
