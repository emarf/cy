/// <reference types="Cypress" />

const integrations = require("../../../../fixtures/integrations.json");
const message = require("../../../../fixtures/messages.json");

import { popUp } from "../../../component/tenant/popUp.js";
import { sidebar } from "../../../component/tenant/sidebar.js";

class JiraPage {
  constructor() {
    this.pageHeader = ".zeb-page-header";
    this.configDescription = ".integration-config-intro__description";
    this.configName = ".integration-config-intro__provider-name";
    this.goToDocumentationLink =
      ".integration-config-intro__documentation-link-text";
    this.noAccountLink = ".integration-config-intro__create-account-text";
    this.createAccount = ".integration-config-intro__create-account-link";
    this.arrowForward = "arrow_forward_ios";
    this.arrowBack = "arrow_back_ios";
    this.integrationOption = ".jira-integration-form__integration-type-option";
    this.headerWarning = ".jira-integration-form__header-warning";
    this.closeWarningButton = "md-icon, .material-icons";
    this.jiraHostField = "#jiraIntegrationHost";
    this.jiraUserName = "#jiraIntegrationUsername";
    this.jiraTokenField = "#jiraIntegrationToken";
    this.checkBox = "md-checkbox";
    this.mdContainer = ".md-container";
    this.xRayHostField = "#integrationXrayHost";
    this.xRayIdField = "#integrationXrayClientId";
    this.xRaySecretField = "#integrationXrayClientSecret";
    this.footerAction = ".jira-integration-form__footer-actions";
    this.dropDownIcon = ".dropdown-with-icon__button";
    this.dropDownItem = ".dropdown-with-icon__item";
    this.zephyrIntegrationTokenField = "#zephyrIntegrationToken";
    this.zephyrAccountIdField = "#zephyrSquadIntegrationAccountId";
    this.zephyrAccessIdField = "#zephyrSquadIntegrationAccessKey";
    this.zephyrSecretIdField = "3zephyrSquadIntegrationSecretKey";
    this.powerButton = "power_settings_new";
    this.deleteButton = "delete_outline";
    this.errorMessage = ".md-input-message-animation > .ng-binding";
    this.wrongHost = ".md-input-message-animation";
    this.radioButton = ".jira-integration-form__integration-type-option";
  }

  getPopUp() {
    return popUp;
  }

  getSideBar() {
    return sidebar;
  }

  clickTCMCheckbox() {
    cy.clickOn(this.checkBox);
  }

  closeWarningMessage() {
    cy.get(this.closeWarningButton).contains("close").click({ force: true });
  }

  verifyDissapearedWarning() {
    cy.get(this.headerWarning).should("not.be.visible");
  }

  verifyHeaderWarning(message) {
    cy.invokeText(this.headerWarning).then((headerText) => {
      expect(headerText).to.contain(message);
    });
  }

  verifyEmtyURLField() {
    cy.clearField(this.jiraHostField);
    cy.invokeText(this.errorData).then((wrongURL) => {
      expect(wrongURL).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyEmptyUserNameField() {
    cy.get(this.jiraUserName).clear();
    cy.invokeText(this.errorData).then((wrongURL) => {
      expect(wrongURL).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyDescriptionText() {
    cy.invokeText(this.configDescription).then((headerText) => {
      expect(headerText).to.contain(integrations.TEST_CASES_BUG_TRACKING.JIRA);
    });
  }

  verifyGoToDocumentationLink() {
    cy.get(this.goToDocumentationLink).should(
      "contain",
      message.GO_TO_DOCUMENTATION
    );
  }

  verifyNoAccountPresence() {
    cy.get(this.noAccountLink).should("include", message.NO_ACCOUNT);
  }

  verifyCreateLink() {
    cy.invokeText(this.createAccount).then((createText) => {
      expect(createText).to.deep.eq(message.CREATE);
    });
  }

  verifyHostField(status) {
    cy.get(this.jiraHostField).should(`${status}`);
  }

  verifyUserNameField() {
    cy.get(this.jiraUserName).should("be.visible");
  }

  verifyTokenField() {
    cy.get(this.jiraTokenField).should("be.visible");
  }

  verifyEnableTCMStatus(status) {
    cy.get(this.checkBox).should(status, { force: true });
  }

  verifyXrayHostField(status) {
    cy.get(this.xRayHostField).should(`${status}`);
  }

  verifyXrayIdField() {
    cy.get(this.xRayIdField).should("be.visible");
  }

  verifySecretIdField() {
    cy.get(this.xRaySecretField).should("be.visible");
  }

  verifyTestButtonStatus(status) {
    cy.get(this.footerAction).contains("Test").should(`${status}`);
  }

  clickSaveButton() {
    cy.get(this.footerAction)
      .contains("Save")
      .should("be.enabled", { force: true });
    cy.get(this.footerAction)
      .contains("Save")
      .should("have.css", "background-color", "rgb(38, 166, 154)");
    cy.get(this.footerAction).contains("Save").click();
  }

  verifyCancelButtonPresence() {
    cy.get(this.footerAction).contains("Cancel").should("be.visible");
  }

  verifyPowerButton() {
    cy.get(this.powerAndDelete)
      .contains(this.enabledIntegration)
      .should("be.visible");
  }

  VerifyDeleteButtonPresence() {
    cy.get(this.deleteButton).should("be.visible");
  }

  clickSwipeRightButton() {
    cy.contains(this.scrollForward).should("be.visible");
    cy.contains(this.scrollForward).click({ force: true });
  }

  clickSwipeLeftButton() {
    cy.contains(this.scrollBack).should("be.visible");
    cy.contains(this.scrollBack).click({ force: true });
  }

  selectZehpyrCloud() {
    cy.clickOn(this.dropDownIcon);
    cy.get(this.dropDownItem).contains("Zephyr Cloud").click();
  }

  selectZehpyrSquad() {
    cy.clickOn(this.dropDownIcon);
    cy.get(this.dropDownItem).contains("Zephyr Squad").click();
  }

  selectXray() {
    cy.clickOn(this.dropDownIcon);
    cy.get(this.dropDownItem).contains("Xray").click();
  }

  selectServerDC() {
    cy.clickOn(this.serverButton);
  }

  selectRadioOption(option) {
    cy.contains(this.radioButton, `${option}`.trim()).click({ force: true });
  }

  selectCloud() {
    cy.clickOn(this.cloudButton);
  }

  enterJiraCloudHost() {
    cy.clearField(this.jiraHostField).type(Cypress.env("jiraHost"), {
      log: false,
    });
  }

  enterJiraCloudUserName() {
    cy.clearField(this.jiraUserName).type(Cypress.env("jiraUserName"), {
      log: false,
    });
  }

  enterJiraCloudToken() {
    cy.clearField(this.jiraTokenField).type(Cypress.env("jiraApiToken"), {
      log: false,
    });
  }

  enterXRayHost() {
    cy.clearField(this.xRayHostField).type(Cypress.env("xRayHost"), {
      log: false,
    });
  }

  enterXRayId() {
    cy.clearField(this.xRayIdField).type(Cypress.env("xRayClientId"), {
      log: false,
    });
  }

  enterXRaySecret() {
    cy.clearField(this.xRaySecretField).type(Cypress.env("xRayClientSecret"), {
      log: false,
    });
  }

  clickTestButton() {
    cy.get(this.footerAction).contains("Test").click({ force: true });
  }

  enterServerDCHost() {
    cy.clearField(this.jiraHostField).type(Cypress.env("serverJiraHost"), {
      log: false,
    });
  }

  enterServerDCUserName() {
    cy.clearField(this.jiraUserName).type(Cypress.env("serverJiraUserName"), {
      log: false,
    });
  }

  enterServerDCToken() {
    cy.clearField(this.jiraTokenField).type(Cypress.env("serverJiraToken"), {
      log: false,
    });
  }

  enterZephyrIntegrationToken() {
    cy.clearField(this.zephyrIntegrationTokenField).type(
      Cypress.env("zephyrCloudToken"),
      {
        log: false,
      }
    );
  }

  enterZephyrSquadAccId() {
    cy.clearField(this.zephyrAccountIdField).type(
      Cypress.env("zephyrSquadAccountId"),
      {
        log: false,
      }
    );
  }

  enterZephyrSquadAccKey() {
    cy.clearField(this.zephyrAccessIdField).type(
      Cypress.env("zephyrSquadAccessKey"),
      {
        log: false,
      }
    );
  }

  enterZehpyrSquadSecretKey() {
    cy.clearField(this.zephyrIntegrationTokenField).type(
      Cypress.env("zephyrSquadSecretKey"),
      {
        log: false,
      }
    );
  }

  verifyErrorOnHostFields() {
    cy.clearField(this.xRayHostField)
      .type(message.INVALID_URL_TEXT)
      .click({ force: true });
    cy.invokeText(this.wrongHost).then((wrongURL) => {
      expect(wrongURL).to.contain(message.EMPTY_HOST_FIELD);
    });
  }

  verifyEmptyXrayHostField() {
    cy.clearField(this.xRayHostField).click({ force: true });
    cy.clickOn(this.xRayIdField);
    cy.invokeText(this.errorMessage).then((wrongURL) => {
      expect(wrongURL).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyEmptyXrayIDField() {
    cy.clearField(this.xRayIdField).click({ force: true });
    cy.clickOn(this.xRayHostField);
    cy.wait(1000);
    cy.invokeText(this.errorMessage).then((wrongURL) => {
      expect(wrongURL).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyEmptyXraySecretField() {
    cy.clearField(this.xRaySecretField).click({ force: true });
    cy.clickOn(this.xRayHostField);
    cy.wait(1000);
    cy.invokeText(this.errorMessage).then((wrongURL) => {
      expect(wrongURL).to.contain(message.FIELD_REQUIRED);
    });
  }

  verifyJiraHostField(status) {
    cy.get(this.jiraHostField).should(`${status}`);
  }
}

export const jiraPage = new JiraPage();
