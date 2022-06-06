/// <reference types="Cypress" />

const integrations = require("../../../../fixtures/integrations.json");
const message = require("../../../../fixtures/messages.json");

import { integration } from "../../../component/tenant/integration.js";
import { popUp } from "../../../component/tenant/popUp.js";
import { sidebar } from "../../../component/tenant/sidebar.js";

class TestTrailPage {
  constructor() {
    this.zebHeader = ".zeb-page-header";
    this.providerName = ".integration-config-intro__provider-name";
    this.goToDocumentation =
      ".integration-config-intro__documentation-link-text";
    this.descriptionText = ".integration-config-intro__description-text";
    this.urlField = "#integrationHubUrl";
    this.userNameField = "#integrationUsername";
    this.passwordField = "#integrationAccessKey";
    this.footerForm = ".test-provider-form__footer-actions";
    this.powerButton = "power_settings_new";
    this.deleteButton = "delete_outline";
    this.arrowForward = "arrow_forward_ios";
    this.errorMessage = ".md-input-message-animation > .ng-binding";
    this.arrowBack = "arrow_back_ios";
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

  verifyBreadCrumsPresence() {
    cy.invokeText(this.stackBreadCrum).then((text) => {
      expect(text).to.contain(integrations.TESTING_PLATFORMS.BROWSERSTACK);
    });
  }

  verifyIntegrationProvider() {
    cy.invokeText(this.nameProvider).then((text) => {
      expect(text).to.contain(integrations.TEST_CASES_BUG_TRACKING.TEST_RAIL);
    });
  }

  verifyGoToDocumentationButtonPresence() {
    cy.get(this.documentationLink).should("be.visible");
    cy.invokeText(this.documentationLink).then((docText) => {
      expect(docText).to.contain(message.GO_TO_DOCUMENTATION);
    });
  }

  verifyFieldUrlPresence() {
    cy.get(this.urlField).should("be.visible");
  }

  verifyUserNameField() {
    cy.get(this.userNameField).should("be.visible");
  }

  verifyPasswordField() {
    cy.get(this.passwordField).should("be.visible");
  }

  enterURLText() {
    cy.clearField(this.urlField);
    cy.get(this.urlField).type(Cypress.env("testRailURL"), { log: false });
  }

  enterUserName() {
    cy.clearField(this.userNameField);
    cy.get(this.userNameField).type(Cypress.env("testRailUserName"), {
      log: false,
    });
  }

  enterPassword() {
    cy.clearField(this.passwordField);
    cy.get(this.passwordField).type(Cypress.env("testRailPassword"), {
      log: false,
    });
  }

  verifyTestButton() {
    cy.get(this.footerForm).contains("Test").should("be.enabled");
  }

  clickTestButton() {
    cy.get(this.footerForm).contains("Test").click();
  }

  verifyTestMessage() {
    cy.invokeText(this.footerMessage).then((text) => {
      expect(text).to.include(message.CONNECTED_INTEGRATION);
    });
  }

  verifyPowerButton() {
    cy.contains(this.powerButton).should("be.enabled");
  }

  clickPowerButton() {
    cy.contains(this.powerButton).should("be.enabled").click({ force: true });
  }

  verifyDeleteButton() {
    cy.contains(this.deleteIntegration).should("be.enabled");
  }

  clickDeleteButton() {
    cy.contains(this.deleteIntegration).click({ force: true });
  }

  clickSwipeRightButton() {
    cy.contains(this.scrollForward).should("be.visible");
    cy.contains(this.scrollForward).click({ force: true });
  }

  clickSwipeLeftButton() {
    cy.contains(this.scrollBack).should("be.visible");
    cy.contains(this.scrollBack).click({ force: true });
  }

  clickSaveButton() {
    cy.get(this.footerForm).contains("Save").should("be.enabled");
    cy.get(this.footerForm)
      .contains("Save")
      .should("have.css", "background-color", "rgb(38, 166, 154)");
    cy.get(this.footerForm).contains("Save").click();
  }

  verifyEmptyURLField() {
    cy.clearField(this.urlField).click({ force: true });
    cy.clickOn(this.userNameField);
    cy.wait(1000);
    cy.invokeText(this.errorMessage).then((wrongURL) => {
      expect(wrongURL).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyEmptyUserNameField() {
    cy.clearField(this.userNameField).click({ force: true });
    cy.clickOn(this.urlField);
    cy.wait(1000);
    cy.invokeText(this.errorMessage).then((wrongURL) => {
      expect(wrongURL).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyEmptyPasswordField() {
    cy.clearField(this.passwordField).click({ force: true });
    cy.clickOn(this.urlField);
    cy.wait(1000);
    cy.invokeText(this.errorMessage).then((wrongURL) => {
      expect(wrongURL).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyWrongUrlFormat() {
    cy.clearField(this.urlField).type(message.WRONG_EMAIL);
    cy.clickOn(this.userNameField);
    cy.wait(1000);
    cy.invokeText(this.errorMessage).then((wrongURL) => {
      expect(wrongURL).to.contain(message.INVALID_URL);
    });
  }
}

export const testTrailPage = new TestTrailPage();
