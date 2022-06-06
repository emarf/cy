/// <reference types="Cypress" />

const integrations = require("../../../../fixtures/integrations.json");
const message = require("../../../../fixtures/messages.json");

import { integration } from "../../../component/tenant/integration.js";
import { popUp } from "../../../component/tenant/popUp.js";
import { sidebar } from "../../../component/tenant/sidebar.js";

class LambdaTestPage {
  constructor() {
    this.breadCrum = ".zeb-page-header__title";
    this.nameProvider = ".integration-config-intro__provider-name";
    this.documentationLink =
      ".integration-config-intro__documentation-link-text";
    this.noAccount = ".integration-config-intro__create-account-text";
    this.createAccount = ".integration-config-intro__create-account-link";
    this.fieldURL = "#integrationHubUrl";
    this.userNameField = "#integrationUsername";
    this.tokenAPIField = "#integrationAccessKey";
    this.testProviderFooter = ".test-provider-form__footer-actions";
    this.enabledIntegration = "power_settings_new";
    this.deleteIntegration = "delete_outline";
    this.footerMessage = ".test-provider-form__footer-message-text";
    this.scrollForward = "arrow_forward_ios";
    this.scrollBack = "arrow_back_ios";
    this.powerButton = ".test-provider-form__integration-actions";
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
      expect(text).to.eq(integrations.TESTING_PLATFORMS.LAMBDA_TEST);
    });
  }

  verifyIntegrationProvider() {
    cy.invokeText(this.nameProvider).then((text) => {
      expect(text).to.contain(integrations.TESTING_PLATFORMS.LAMBDA_TEST);
    });
  }

  verifyGoToDocumentationButtonPresence() {
    cy.get(this.documentationLink).should("be.visible");
    cy.invokeText(this.documentationLink).then((docText) => {
      expect(docText).to.contain(message.GO_TO_DOCUMENTATION);
    });
  }

  verifyNoAccountText() {
    cy.invokeText(this.noAccount).then((noAccText) => {
      expect(noAccText).to.contain(message.NO_ACCOUNT);
    });
  }

  verifyCreateButtonPresence() {
    cy.get(this.createAccount).should("be.visible");
  }

  verifyFieldUrlPresence() {
    cy.get(this.fieldURL).should("be.empty");
  }

  verifyUserNameField() {
    cy.get(this.userNameField).should("be.empty");
  }

  verifyAPITokenField() {
    cy.get(this.tokenAPIField).should("be.empty");
  }

  enterURLText() {
    cy.clearField(this.fieldURL).type(Cypress.env("lambdaTestURL"), {
      log: false,
    });
  }

  enterUserName() {
    cy.clearField(this.userNameField).type(Cypress.env("lambdaUserName"), {
      log: false,
    });
  }

  enterAPIToken() {
    cy.clearField(this.tokenAPIField).type(Cypress.env("lambdaTokenAPI"), {
      log: false,
    });
  }

  verifyTestButton() {
    cy.get(this.testProviderFooter).contains("Test").should("be.enabled");
  }

  clickTestButton() {
    cy.get(this.testProviderFooter).contains("Test").click();
  }

  verifyTestMessage() {
    cy.invokeText(this.footerMessage).then((text) => {
      expect(text).to.include(message.CONNECTION_FAILED);
    });
  }

  verifyPowerButton() {
    cy.contains(this.enabledIntegration).should("be.enabled");
  }

  clickPowerButton() {
    cy.contains(this.enabledIntegration)
      .should("be.enabled")
      .click({ force: true });
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
    cy.get(this.testProviderFooter).contains("Save").should("be.enabled");
    cy.get(this.testProviderFooter)
      .contains("Save")
      .should("have.css", "background-color", "rgb(38, 166, 154)");
    cy.get(this.testProviderFooter).contains("Save").click();
  }
}

export const lambdaTestPage = new LambdaTestPage();
