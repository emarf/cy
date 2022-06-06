/// <reference types="Cypress" />

const integrations = require("../../../../fixtures/integrations.json");
const message = require("../../../../fixtures/messages.json");

import { sidebar } from "../../../component/tenant/sidebar.js";
import { popUp } from "../../../component/tenant/popUp.js";
import { integration } from "../../../component/tenant/integration.js";

class SauceLabPage {
  constructor() {
    this.nameProvider = ".integration-config-intro__provider-name";
    this.pageHeader = ".zeb-page-header__title";
    this.documentationLink =
      ".integration-config-intro__documentation-link-text";
    this.noAccountText = ".integration-config-intro__create-account-text";
    this.createAccount = ".integration-config-intro__create-account-link";
    this.arrowBack = "arrow_back_ios";
    this.arrowForward = "arrow_forward_ios";
    this.hubURLField = "#integrationHubUrl";
    this.userNameField = "#integrationUsername";
    this.tokenAPIField = "#integrationAccessKey";
    this.footerActions = ".test-provider-form__footer-actions";
    this.powerButton = "power_settings_new";
    this.deleteButton = "delete_outline";
    this.testMessage = ".test-provider-form__footer-message-text";
  }

  clickCreateButton() {
    cy.clickOn(this.createAccount);
  }

  clickDeleteButton() {
    cy.clickOn(this.deleteButton);
  }

  clickGoToDucumentationButton() {
    cy.clickOn(this.documentationLink);
  }

  clickSwipeRightButton() {
    cy.contains(this.scrollForward).should("be.visible");
    cy.clickOn(this.scrollForward);
  }

  clickSwipeLeftButton() {
    cy.contains(this.scrollBack).should("be.visible");
    cy.clickOn(this.scrollBack);
  }

  clickTestButton() {
    cy.get(this.footerActions).contains("Test").click({ force: true });
  }

  clickSaveButton() {
    cy.get(this.footerActions)
      .contains("Save")
      .should("be.enabled", { force: true });
    cy.get(this.footerActions)
      .contains("Save")
      .should("have.css", "background-color", "rgb(38, 166, 154)");
    cy.get(this.footerActions).contains("Save").click();
  }

  clickPowerButton() {
    cy.contains(this.powerButton).should("be.enabled").click({ force: true });
  }

  enterFieldURL() {
    cy.clearField(this.hubURLField).type(Cypress.env("sauceLabsURL"), {
      log: false,
    });
  }

  enterUsername() {
    cy.clearField(this.userNameField).type(Cypress.env("sauceLabsUserName"), {
      log: false,
    });
  }

  enterTokenAPI() {
    cy.clearField(this.tokenAPIField).type(Cypress.env("sauceLabsTokenAPI"), {
      log: false,
    });
  }

  getSidebar() {
    return sidebar;
  }

  getIntegration() {
    return integration;
  }

  getPopUp() {
    return popUp;
  }

  verifyBreadCrums() {
    cy.invokeText(this.pageHeader).then((headerText) => {
      expect(headerText).to.eq(integrations.TESTING_PLATFORMS.SAUCE_LABS);
    });
  }

  verifyCreateButtonPresence() {
    cy.invokeText(this.createAccount).then((createText) => {
      expect(createText).to.equal(message.CREATE);
    });
  }

  verifyDeleteButtonPresence() {
    cy.contains(this.deleteButton).should("be.visible");
  }

  verifyGoToDocumentationButton() {
    cy.invokeText(this.documentationLink).then((doccText) => {
      expect(doccText).to.eq(message.GO_TO_DOCUMENTATION);
    });
    cy.get(this.documentationLink).should("be.visible");
  }

  verifyIntegrationNameField() {
    cy.get(this.userNameField).should("be.empty");
  }

  verifyIntegrationTokenField() {
    cy.get(this.tokenAPIField).should("be.empty");
  }

  verifyIntegrationURL() {
    cy.get(this.hubURLField).should("be.empty");
  }

  verifyPowerButton() {
    cy.contains(this.powerButton).should("be.enabled");
  }
}

export const sauceLabPage = new SauceLabPage();
