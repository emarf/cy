/// <reference types="Cypress" />

import { popUp } from "../../../component/tenant/popUp";

const integrations = require("../../../../fixtures/integrations.json");
const message = require("../../../../fixtures/messages.json");

class MicrosoftTeamsPage {
  constructor() {
    this.pageHeader = ".zeb-page-header";
    this.testProvider = ".integration-config-intro__provider-name";
    this.description = ".integration-config-intro__description-paragraph";
    this.goToDocumentation =
      ".integration-config-intro__documentation-link-text";
    this.arrowForward = "arrow_forward_ios";
    this.backArrow = "arrow_back_ios";
    this.powerButton = "power_settings_new";
    this.channelName = "#msteamsIntegrationChannelName";
    this.webHook = "#msteamsIntegrationWebhook";
    this.deleteButton = "delete_outline";
    this.mdRaised = ".md-raised";
    this.itemForm = ".msteams-integration-form__item";
    this.addChanelButton = "Add Channel";
    this.footerActions = ".msteams-integration-form__footer-actions";
    this.testMessage = "msteams-integration-form__body-message-text";
    this.chanelFailedMessage =
      ".text-input > .md-input-messages-animation > .md-input-message-animation > .ng-binding";
    this.webHookFailedMessage =
      ":nth-child(2) > .md-input-messages-animation > .md-input-message-animation > .ng-binding";
  }

  getPopUp() {
    return popUp;
  }

  verifyBreadCrums() {
    cy.invokeText(this.pageHeader).then((text) => {
      expect(text).to.contain(
        integrations.MESSAGING_AND_NOTIFICATIONS.MICROSOFT_TEAMS
      );
    });
  }
  verifyTestingProvider() {
    cy.invokeText(this.testProvider).then((text) => {
      expect(text).to.equal(
        integrations.MESSAGING_AND_NOTIFICATIONS.MICROSOFT_TEAMS
      );
    });
  }

  verifyDescriptionText() {
    cy.invokeText(this.description).then((docText) => {
      expect(docText).to.contain(
        integrations.MESSAGING_AND_NOTIFICATIONS.MICROSOFT_TEAMS
      );
    });
  }

  verifyGoToDocumentation() {
    cy.invokeText(this.goToDocumentation).then((docText) => {
      expect(docText).to.eq(message.GO_TO_DOCUMENTATION);
    });
  }

  verifyTestButton(status) {
    cy.get(this.mdRaised).contains("Test").should(`${status}`);
  }

  verifySaveButton(status) {
    cy.get(this.footerActions).contains("Save").should(`${status}`);
  }

  verifyCancelButton(status) {
    cy.get(this.footerActions).contains("Cancel").should(`${status}`);
  }

  verifyAddChannelButton() {
    cy.get(this.footerActions).contains("Add Channel").should("be.visible");
    cy.get(this.footerActions)
      .contains("Add Channel")
      .should("have.css", "color", "rgb(38, 166, 154)");
  }

  verifyPowerButton() {
    cy.contains(this.powerButton).should("be.visible");
  }

  verifyDeleteButton() {
    cy.contains(this.deleteButton).should("be.visible");
  }

  verifyBotNameField() {
    cy.get(this.channelName).should("be.visible");
  }

  verifyTokenField() {
    cy.get(this.webHook).should("be.visible");
  }

  enterChanelName() {
    cy.clearField(this.channelName).type(Cypress.env("msChanelName"), {
      log: false,
    });
  }

  enterWebhook() {
    cy.clearField(this.webHook).type(Cypress.env("msWebHook"), { log: false });
  }

  clickTestButtonAndVerifyMessage() {
    cy.get(this.mdRaised).contains("Test").should("be.enabled");
    cy.get(this.mdRaised).contains("Test").click({ force: true });
    cy.invokeText(this.testMessage).then((text) => {
      expect(text).to.equal(message.CONNECTED_INTEGRATION);
    });
    cy.get(this.testMessage).should("have.css", "color", "rgb(68, 196, 128)");
  }

  clickPowerButton() {
    cy.contains(this.powerButton).should("be.visible");
    cy.contains(this.powerButton).click({ force: true });
  }

  clickDeleteButton() {
    cy.contains(this.deleteButton).click({ force: true });
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

  verifyEmptyChanelField() {
    cy.clearField(this.channelName);
    cy.clickOn(this.webHook);
    cy.invokeText(this.chanelFailedMessage).then((text) => {
      expect(text).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyEmptyWebhookField() {
    cy.clearField(this.webHook);
    cy.clickOn(this.channelName);
    cy.invokeText(this.webHookFailedMessage).then((text) => {
      expect(text).to.contain(message.FIELD_REQUIRED);
    });
  }

  enterRandomChanelName(name) {
    cy.clearField(this.channelName).type(`${name}`, { log: false });
  }
}

export const msTeamsPage = new MicrosoftTeamsPage();
