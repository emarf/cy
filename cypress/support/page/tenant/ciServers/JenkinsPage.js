/// <reference types="Cypress" />

import { popUp } from "../../../component/tenant/popUp";

const integrations = require("../../../../fixtures/integrations.json");

class JenkinsPage {
  constructor() {
    this.nameField = "#integrationName";
    this.hubURLField = "#integrationHubUrl";
    this.userNameField = "#integrationUsername";
    this.tokenAPIField = "#integrationAccessKey";
    this.footerActions = ".test-provider-form__footer-actions";
    this.pageHeader = ".zeb-page-header";
    this.providerName = ".integration-config-intro__provider-name";
    this.description = ".integration-config-intro__description-text";
    this.powerButton = ".md-icon-button > .ng-scope";
  }

  getPopup() {
    return popUp;
  }

  verifyBreadCrums() {
    cy.invokeText(this.pageHeader).then((headerText) => {
      expect(headerText).to.include(integrations.CI_SERVERS.JENKINS);
    });
  }

  verifyIntegrationName() {
    cy.invokeText(this.providerName).then((headerText) => {
      expect(headerText).to.include(integrations.CI_SERVERS.JENKINS);
    });
  }
  verifyDescriptionText() {
    cy.invokeText(this.description).then((headerText) => {
      expect(headerText).to.include(integrations.CI_SERVERS.JENKINS);
    });
  }

  verifyPowerButton(buttonStatus) {
    cy.get(this.powerButton).should(`${buttonStatus}`);
  }

  verifyApiTokenField() {
    cy.get(this.tokenAPIField).should("be.enabled");
  }

  verfiyTestButton() {
    cy.get(this.footerActions).contains("Test").should("be.visible");
  }

  clickTestButton() {
    cy.get(this.footerActions).contains("Test").click({ force: true });
  }

  clickPowerButton() {
    cy.clickOn(this.powerButton);
  }
}

export const jenkinsPage = new JenkinsPage();
