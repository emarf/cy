/// <reference types="Cypress" />

const integrations = require("../../../../fixtures/integrations.json");
const message = require("../../../../fixtures/messages.json");

import { integration } from "../../../component/tenant/integration.js";
import { popUp } from "../../../component/tenant/popUp.js";
import { sidebar } from "../../../component/tenant/sidebar.js";

class MCloudPage {
  constructor() {
    this.breadCrum = ".zeb-page-header__title";
    this.projectName = ":nth-child(2) > .breadcrumb";
    this.breadCrumProject = ":nth-child(1) > .breadcrumb";
    this.breadCrumIntegration = ":nth-child(3) > .breadcrumb";
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

  clickOnProjectName() {
    cy.clickOn(this.projectName);
  }

  clickOnProject() {
    cy.clickOn(this.breadCrumProject);
  }

  clickBreadCrumIntegration() {
    cy.clickOn(this.breadCrumIntegration);
  }

  verifyBreadCrumsPresence() {
    cy.invokeText(this.breadCrum).then((text) => {
      expect(text).to.include(integrations.TESTING_PLATFORMS.MCLOUD);
    });
  }

  verifyIntegrationProvider() {
    cy.invokeText(this.nameProvider).then((text) => {
      expect(text).to.contain(integrations.TESTING_PLATFORMS.MCLOUD);
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
    cy.clearField(this.fieldURL).type(Cypress.env("mcloudURL"), { log: false });
  }

  enterUserName() {
    cy.clearField(this.userNameField).type(Cypress.env("mcloudUserName"), {
      log: false,
    });
  }

  enterAPIToken() {
    cy.clearField(this.tokenAPIField).type(Cypress.env("mcloudTokenAPI"), {
      log: false,
    });
  }

  verifyTestButtonStatus(status) {
    cy.get(this.testProviderFooter).contains("Test").should(`${status}`);
  }

  clickTestButton() {
    cy.get(this.testProviderFooter).contains("Test").click();
  }

  verifyPowerButtonStatus(status) {
    cy.contains(this.enabledIntegration).should(`${status}`);
  }

  clickPowerButton() {
    cy.clickOn(this.enabledIntegration);
  }

  verifyDeleteButton() {
    cy.contains(this.deleteIntegration).should("be.enabled");
  }

  clickDeleteButton() {
    cy.clickOn(this.deleteIntegration);
  }

  clickSwipeRightButton() {
    cy.contains(this.scrollForward).should("be.visible");
    cy.clickOn(this.scrollForward);
  }

  clickSwipeLeftButton() {
    cy.contains(this.scrollBack).should("be.visible");
    cy.clickOn(this.scrollBack);
  }

  clickSaveButton() {
    cy.get(this.testProviderFooter).contains("Save").should("be.enabled");
    cy.get(this.testProviderFooter)
      .contains("Save")
      .should("have.css", "background-color", "rgb(38, 166, 154)");
    cy.get(this.testProviderFooter).contains("Save").click();
  }
}

export const mcloudPage = new MCloudPage();
