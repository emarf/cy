/// <reference types="Cypress" />

import { popUp } from "../../../component/tenant/popUp";

const integrations = require("../../../../fixtures/integrations.json");
const message = require("../../../../fixtures/messages.json");

class SlackPage {
  constructor() {
    this.pageHeader = ".zeb-page-header";
    this.providerName = ".integration-config-intro__provider-name";
    this.goToDocumentation =
      ".integration-config-intro__documentation-link-text";
    this.arrowForward = "arrow_forward_ios";
    this.arrowBack = "arrow_back_ios";
    this.powerButton = ".power_settings_new";
    this.deleteButton = "delete_outline";
    this.tokenField = "#slackIntegrationToken";
    this.botNameField = "#slackIntegrationBotName";
    this.footerActions = ".slack-form__footer-actions";
    this.description = ".integration-config-intro__description-paragraph";
    this.testMessage = ".slack-form__footer-message-text";
    this.fieldRequiredBot =
      ".slack-form__wrapper > .md-input-has-placeholder > .md-input-messages-animation > .md-input-message-animation > .ng-binding";
    this.fieldRequireToken =
      ":nth-child(1) > .md-input-messages-animation > .md-input-message-animation > .ng-binding";
  }

  getPopUp() {
    return popUp;
  }

  verifyBreadCrums() {
    cy.invokeText(this.pageHeader).then((text) => {
      expect(text).to.contain(integrations.MESSAGING_AND_NOTIFICATIONS.SLACK);
    });
  }
  verifyTestingProvider() {
    cy.invokeText(this.providerName).then((text) => {
      expect(text).to.equal(integrations.MESSAGING_AND_NOTIFICATIONS.SLACK);
    });
  }

  verifyDescriptionText() {
    cy.invokeText(this.description).then((docText) => {
      expect(docText).to.contain(
        integrations.MESSAGING_AND_NOTIFICATIONS.SLACK
      );
    });
  }

  verifyGoToDocumentation() {
    cy.invokeText(this.goToDocumentation).then((docText) => {
      expect(docText).to.eq(message.GO_TO_DOCUMENTATION);
    });
  }

  verifyTestButton() {
    cy.get(this.footerActions).contains("Test").should("be.visible");
  }

  verifySaveButton() {
    cy.get(this.footerActions).contains("Save").should("be.visible");
  }

  verifyCancelButton() {
    cy.get(this.footerActions).contains("Cancel").should("be.visible");
  }

  verifyPowerButton() {
    cy.contains(this.powerButton).should("be.visible");
  }

  verifyDeleteButton() {
    cy.contains(this.deleteButton).should("be.visible");
  }

  verifyBotNameField() {
    cy.get(this.botNameField).should("be.visible");
  }

  verifyTokenField() {
    cy.get(this.tokenField).should("be.visible");
  }

  enterSlackToken() {
    cy.clearField(this.tokenField).type(Cypress.env("slackToken"), {
      log: false,
    });
  }

  enterSlackBotName() {
    cy.clearField(this.botNameField).type(Cypress.env("slackBotName"), {
      log: false,
    });
  }

  enterRandomBotName(botName) {
    cy.clearField(this.botNameField).type(`${botName}`, { log: false });
  }

  enterRandomToken(token) {
    cy.clearField(this.tokenField).type(`${token}`, { log: false });
  }

  verifyEmptyBotNameField() {
    cy.clearField(this.botNameField);
    cy.clickOn(this.tokenField);
    cy.invokeText(this.fieldRequiredBot).then((text) => {
      expect(text).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyEmptyTokenNameField() {
    cy.clearField(this.tokenField);
    cy.clickOn(this.botNameField);
    cy.invokeText(this.fieldRequireToken).then((text) => {
      expect(text).to.contain(message.FIELD_REQUIRED);
    });
  }

  clickTestButtonAndVerifyMessage() {
    cy.get(this.footerActions).contains("Test").should("be.enabled");
    cy.get(this.footerActions).contains("Test").click({ force: true });
    cy.invokeText(this.testMessage).then((text) => {
      expect(text).to.equal(message.CONNECTED_INTEGRATION);
    });
    cy.get(this.testMessage).should("have.css", "color", "rgb(68, 196, 128)");
  }

  clickPowerButton() {
    cy.contains(this.powerButton).should("be.visible");
    cy.contains(this.powerButton).click({ force: true });
  }

  clickDeleteButton() {}

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

export const slackPage = new SlackPage();
