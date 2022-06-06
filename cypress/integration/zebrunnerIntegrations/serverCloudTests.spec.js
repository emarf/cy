/// <reference types="Cypress" />

const integrations = require("../../fixtures/integrations.json");
const messages = require("../../fixtures/messages.json");
const sideBarItems = require("../../fixtures/tenantSidebarItems.json");

import { homePage } from "../../support/page/tenant/HomePage";
import { integrationPage } from "../../support/page/tenant/IntegrationPage";
import { loginPage } from "../../support/page/login/LoginPage";
import { jiraPage } from "../../support/page/tenant/bugTrackers/JiraPage";
import { testRunsPage } from "../../support/page/tenant/TestRunsPage";
import { testTrailPage } from "../../support/page/tenant/bugTrackers/TestTrailPage.js";

describe("common for Cloud and Server Jira", () => {
  beforeEach("Perform login", () => {
    loginPage.performLogin();
  });

  it(
    "Verify user can configure either Server or Cloud Jira integration at once",
    { testrailTestCaseId: "43133", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.enterServerDCHost();
      jiraPage.enterServerDCUserName();
      jiraPage.enterServerDCToken();
      jiraPage.clickSaveButton();
      jiraPage.selectRadioOption(messages.CLOUD);
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.verifyHostField("be.empty");
    }
  );

  it(
    "Verify depending on the configured integration, the corresponding tab should be opened by default",
    { testrailTestCaseId: "43134", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.enterServerDCHost();
      jiraPage.enterServerDCUserName();
      jiraPage.enterServerDCToken();
      jiraPage.clickSaveButton();
      jiraPage.getSideBar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      jiraPage.selectRadioOption(messages.CLOUD);
      jiraPage.enterJiraCloudHost();
      jiraPage.enterJiraCloudUserName();
      jiraPage.enterJiraCloudToken();
      jiraPage.clickSaveButton();
      jiraPage.getSideBar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      jiraPage.verifyHostField("not.be.empty");
    }
  );

  it(
    "Verify unsaved creds are erased when user switches to the other tab",
    { testrailTestCaseId: "43135", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.enterJiraCloudHost();
      jiraPage.enterJiraCloudUserName();
      jiraPage.enterJiraCloudToken();
      jiraPage.clickSaveButton();
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.selectRadioOption(messages.CLOUD);
      jiraPage.verifyHostField("be.empty");
    }
  );

  it(
    "Verify a warning msg is shown in both tabs",
    { testrailTestCaseId: "43136", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.verifyHeaderWarning(messages.JIRA_HEADER_WARNING);
      jiraPage.selectRadioOption(messages.SERVER_DC);
      jiraPage.verifyHeaderWarning(messages.JIRA_HEADER_WARNING);
    }
  );

  it(
    "Verify user can close a warning msg",
    { testrailTestCaseId: "43137", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.JIRA
      );
      cy.wait(1000);
      jiraPage.verifyHeaderWarning(messages.JIRA_HEADER_WARNING);
      jiraPage.closeWarningMessage();
    }
  );

  it(
    "Verify an error is shown if entering invalid url format to 'URL' field",
    { testrailTestCaseId: "42999", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.TEST_RAIL
      );
      cy.wait(1000);
      testTrailPage.verifyWrongUrlFormat();
    }
  );

  it(
    "Verify an error is shown if 'URL' field is left empty",
    { testrailTestCaseId: "42997", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.TEST_RAIL
      );
      cy.wait(1000);
      testTrailPage.verifyEmptyURLField();
    }
  );

  it(
    "Verify an error is shown if 'Username' field is left empty",
    { testrailTestCaseId: "43001", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.TEST_RAIL
      );
      cy.wait(1000);
      testTrailPage.verifyEmptyUserNameField();
    }
  );

  it(
    "Verify an error is shown if 'password' field is left empty",
    { testrailTestCaseId: "43004", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.TEST_RAIL
      );
      cy.wait(1000);
      testTrailPage.verifyEmptyPasswordField();
    }
  );

  it(
    "Connect testRail integrations",
    { testrailTestCaseId: "43004", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_CASES_BUG_TRACKING.TEST_RAIL
      );
      cy.wait(1000);
      testTrailPage.enterURLText();
      testTrailPage.enterUserName();
      testTrailPage.enterPassword();
      testTrailPage.clickTestButton();
      cy.wait(1000);
      testTrailPage.clickSaveButton();
      testTrailPage.getSidebar().navigateToSideBarItem(sideBarItems.TEST_RUNS);
      testRunsPage.openFirstTestRun();
      testRunsPage.openLabel();
      testRunsPage.verifyTestRailLabel();
    }
  );
});
