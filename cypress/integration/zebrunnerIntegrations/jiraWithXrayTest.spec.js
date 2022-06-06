/// <reference types="Cypress" />

const integrations = require("../../fixtures/integrations.json");
const messages = require("../../fixtures/messages.json");
const sideBarItems = require("../../fixtures/tenantSidebarItems.json");

import { homePage } from "../../support/page/tenant/HomePage";
import { integrationPage } from "../../support/page/tenant/IntegrationPage";
import { jiraPage } from "../../support/page/tenant/bugTrackers/JiraPage.js";
import { loginPage } from "../../support/page/login/LoginPage";

describe("Jira and Xray integration", () => {
  beforeEach("Perform login", () => {
    loginPage.performLogin();
  });

  it(
    "Verify user can configure integration with Server Jira",
    { testrailTestCaseId: "43091", owner: "ilsen" },
    () => {}
  );

  it(
    "Verify user can switch to 'Server/DC' tab via radio button",
    { testrailTestCaseId: "43092", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.verifyHostField("be.empty");
    }
  );

  it(
    "Verify user can switch to 'Cloud' tab via radio button",
    { testrailTestCaseId: "43096", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.verifyHostField("be.empty");
      jiraPage.selectRadioOption(messages.CLOUD);
      jiraPage.verifyHostField("be.empty");
    }
  );

  it(
    "Verify user can check 'enable Xray'",
    { testrailTestCaseId: "43097", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.selectRadioOption(messages.CLOUD);
      jiraPage.clickTCMCheckbox();
      cy.wait(1000);
      jiraPage.verifyXrayHostField("be.empty");
    }
  );

  it(
    "Verify user can uncheck 'enable Xray'",
    { testrailTestCaseId: "43098", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.selectRadioOption(messages.CLOUD);
      jiraPage.clickTCMCheckbox();
      jiraPage.clickTCMCheckbox();
      cy.wait(1000);
      jiraPage.verifyXrayHostField("not.exist");
    }
  );

  it(
    "Verify an error is shown if 'Xray Host' field is left empty",
    { testrailTestCaseId: "43102", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.selectRadioOption(messages.CLOUD);
      jiraPage.clickTCMCheckbox();
      jiraPage.verifyEmptyXrayHostField();
    }
  );

  it(
    "Verify an error is shown if entering invalid Host format to 'Xray Host' field",
    { testrailTestCaseId: "43104", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.selectRadioOption(messages.CLOUD);
      jiraPage.clickTCMCheckbox();
      jiraPage.verifyErrorOnHostFields();
    }
  );

  it(
    "Verify an error is shown if 'Xray ID' field is left empty",
    { testrailTestCaseId: "43106", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.selectRadioOption(messages.CLOUD);
      jiraPage.clickTCMCheckbox();
      cy.wait(1000);
      jiraPage.verifyEmptyXrayIDField();
    }
  );

  it(
    "Verify an error is shown if 'Secret ID' field is left empty",
    { testrailTestCaseId: "43109", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.selectRadioOption(messages.CLOUD);
      jiraPage.clickTCMCheckbox();
      jiraPage.verifyEmptyXraySecretField();
    }
  );
});
