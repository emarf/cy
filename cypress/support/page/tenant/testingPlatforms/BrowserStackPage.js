/// <reference types="Cypress" />

const integrations = require("../../../../fixtures/integrations.json");
const message = require("../../../../fixtures/messages.json");

import { integration } from "../../../component/tenant/integration.js";
import { popUp } from "../../../component/tenant/popUp.js";
import { sidebar } from "../../../component/tenant/sidebar.js";

class BrowserStackPage {
  constructor() {
    this.stackBreadCrum = ".zeb-page-header__title";
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
    this.powerAndDelete = ".test-provider-form__integration-actions";
    this.powerButton = ".test-provider-form__integration-actions";
    this.errorData = ".md-input-message-animation > .ng-binding";
    this.enabledPowerButton = "._enabled > .ng-scope";
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

  getIntegration(locator) {
    cy.get(locator);
  }

  verifyBreadCrumsPresence() {
    cy.invokeText(this.stackBreadCrum).then((text) => {
      expect(text).to.eq(integrations.TESTING_PLATFORMS.BROWSERSTACK);
    });
  }

  verifyIntegrationProvider() {
    cy.invokeText(this.nameProvider).then((text) => {
      expect(text).to.contain(integrations.TESTING_PLATFORMS.BROWSERSTACK);
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
    cy.clearField(this.fieldURL).type(Cypress.env("browserStackURL"), {
      log: false,
    });
  }

  enterUserName() {
    cy.clearField(this.userNameField).type(
      Cypress.env("browserStackUserName"),
      {
        log: false,
      }
    );
  }

  enterWrongUserName() {
    cy.clearField(this.userNameField).type(message.INVALID_URL_TEXT);
  }

  enterAPIToken() {
    cy.clearField(this.tokenAPIField).type(
      Cypress.env("browserStackTokenAPI"),
      {
        log: false,
      }
    );
  }

  verifyTextInTheURLField() {
    cy.invokeText(this.fieldURL).should(
      "contain",
      Cypress.env("browserStackURL")
    );
  }

  verifyTestButtonStatus(status) {
    cy.get(this.testProviderFooter).contains("Test").should(`${status}`);
  }

  clickTestButton() {
    cy.get(this.testProviderFooter).contains("Test").click();
  }

  clickCancelButton() {
    cy.get(this.testProviderFooter).contains("Cancel").click();
  }

  verifyPowerButton() {
    cy.get(this.powerAndDelete)
      .contains(this.enabledIntegration)
      .should("be.visible");
  }

  verifyEnabledPowerButton() {
    cy.get(this.enabledPowerButton).should(
      "have.css",
      "color",
      "rgb(68, 196, 128)"
    );
  }

  clickPowerButton() {
    cy.get(this.powerAndDelete)
      .contains(this.enabledIntegration)
      .click({ force: true });
  }

  verifyDisabledPowerButton() {
    cy.contains(this.powerButtonFirst)
      .first()
      .then((powerButton) => {
        if (
          cy.wrap(powerButton).should("have.css", "color", "rgb(68, 196, 128)")
        ) {
          cy.contains(this.enabledIntegration).click({ force: true });
        }
      });
  }

  verifyDeleteButtonStatus(status) {
    cy.get(this.powerAndDelete)
      .contains(this.deleteIntegration)
      .should(`${status}`);
  }

  clickDeleteButton() {
    cy.get(this.powerAndDelete)
      .contains(this.deleteIntegration)
      .click({ force: true });
  }

  clickSwipeRightButton() {
    cy.contains(this.scrollForward).should("be.visible", { force: true });
    cy.contains(this.scrollForward).click({ force: true });
  }

  clickSwipeLeftButton() {
    cy.contains(this.scrollBack).should("be.visible");
    cy.contains(this.scrollBack).click({ force: true });
  }

  clickSaveButton() {
    cy.get(this.testProviderFooter)
      .contains("Save")
      .should("be.enabled", { force: true });
    cy.get(this.testProviderFooter)
      .contains("Save")
      .should("have.css", "background-color", "rgb(38, 166, 154)");
    cy.get(this.testProviderFooter).contains("Save").click();
  }

  verifyEmtyURLField() {
    cy.clearField(this.fieldURL);
    cy.invokeText(this.errorData).then((wrongURL) => {
      expect(wrongURL).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyEmptyEmailField() {
    cy.clearField(this.userNameField);
    cy.invokeText(this.errorData).then((wrongURL) => {
      expect(wrongURL).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyEmptyTokenField() {
    cy.clearField(this.tokenAPIField);
    cy.invokeText(this.errorData).then((wrongData) => {
      expect(wrongData).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyInvalidURL() {
    cy.clearField(this.fieldURL)
      .type(message.INVALID_URL_TEXT)
      .click({ force: true });
    cy.invokeText(this.errorData).then((wrongURL) => {
      expect(wrongURL).to.contain(message.INVALID_URL);
    });
  }

  verifySpaceOnTheFields() {
    cy.clearField(this.userNameField).type(" ").click({ force: true });
    cy.invokeText(this.errorData).then((wrongURL) => {
      expect(wrongURL).to.contain(message.SPACE_IN_FIELD);
    });
  }

  verifySaveButtonStatus(status) {
    cy.get(this.testProviderFooter).contains("Save").should(`${status}`);
  }

  verifyCancelButtonStatus(status) {
    cy.get(this.testProviderFooter).contains("Cancel").should(`${status}`);
  }

  clearURLText() {
    cy.clearField(this.fieldURL);
  }

  clearUserName() {
    cy.clearField(this.userNameField);
  }

  clearAPIToken() {
    cy.clearField(this.tokenAPIField);
  }

  verifyPowerButtonDisabled() {
    cy.contains(this.enabledIntegration).should("be.disabled", { force: true });
  }

  verifyTestButtonDisabled() {
    cy.get(this.testProviderFooter)
      .contains("Test")
      .should("not.be.enabled", { force: true });
  }

  verifySaveButtonDisabled() {
    cy.get(this.testProviderFooter)
      .contains("Save")
      .should("not.be.enabled", { force: true });
  }

  verifyEnabledIntegrationMessage() {
    cy.get(this.enabledIntegration)
      .trigger("mouseover", {
        timeout: 2000,
      })
      .invoke("show");
  }

  verifyDeleteMessage() {
    cy.get(this.powerAndDelete)
      .contains(this.deleteIntegration)
      .trigger("mouseover", {
        timeout: 2000,
      })
      .invoke("show");
  }

  verifyRedirectionAfterCreateClick() {
    cy.clickOn(this.createAccount);
    cy.get(this.createAccount)
      .should("have.attr", "target", "_blank")
      .invoke("attr", "href")
      .should("contain", Cypress.env("browserStack"));
  }
}

export const browserStackPage = new BrowserStackPage();
