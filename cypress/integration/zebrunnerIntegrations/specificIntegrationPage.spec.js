/// <reference types="Cypress" />

const integrations = require("../../fixtures/integrations.json");
const integrationSections = require("../../fixtures/integrationSections.json");
const messages = require("../../fixtures/messages.json");
const sideBarItems = require("../../fixtures/tenantSidebarItems.json");

import { browserStackPage } from "../../support/page/tenant/testingPlatforms/BrowserStackPage";
import { homePage } from "../../support/page/tenant/HomePage";
import { integrationPage } from "../../support/page/tenant/IntegrationPage";
import { lambdaTestPage } from "../../support/page/tenant/testingPlatforms/LambdaTestPage.js";
import { loginPage } from "../../support/page/login/LoginPage";
import { mcloudPage } from "../../support/page/tenant/testingPlatforms/MCloudPage";
import { testRunsPage } from "../../support/page/tenant/TestRunsPage";
import { projectPage } from "../../support/page/tenant/ProjectPage";

describe("Specific integration page", { owner: "ilsen" }, () => {
  beforeEach("login to account", () => {
    loginPage.performLogin();
  });

  it(
    "Verify user can open project's test run grid via breadcrumbs in specific integration page",
    { testrailTestCaseId: "43111", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.MCLOUD
      );
      mcloudPage.verifyIntegrationProvider();
      mcloudPage.clickOnProjectName();
      cy.wait(1000);
      testRunsPage.verifyPageTitle();
    }
  );

  it(
    "Verify user can open projects grid via breadcrumbs in specific integration page",
    { testrailTestCaseId: "43112", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.MCLOUD
      );
      mcloudPage.verifyIntegrationProvider();
      mcloudPage.clickOnProject();
      cy.wait(1000);
      projectPage.verifyProjectsPage();
    }
  );

  it(
    "Verify user can return to Integrations grid via breadcrumbs in specific integration page",
    { testrailTestCaseId: "43113", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.MCLOUD
      );
      mcloudPage.verifyIntegrationProvider();
      mcloudPage.clickBreadCrumIntegration();
      cy.wait(1000);
      integrationPage.verifyPageTitle();
    }
  );

  it(
    "Verify user can switch between screenshots via slider in Description section",
    { testrailTestCaseId: "43114", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.LAMBDA_TEST
      );
      lambdaTestPage.clickSwipeRightButton();
      lambdaTestPage.clickSwipeLeftButton();
    }
  );

  it(
    "Verify if integration is disabled - user can't use this integration",
    { testrailTestCaseId: "43115", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.verifyIntegrationProvider();
      browserStackPage.clickPowerButton();
      browserStackPage
        .getSidebar()
        .navigateToSideBarItem(sideBarItems.TEST_RUNS);
      testRunsPage.getProjectKey().openProjectKey();
      testRunsPage
        .getProjectKey()
        .verifyDisabledTabItem(integrations.TESTING_PLATFORMS.BROWSERSTACK);
    }
  );

  it(
    "Verify user can 't save integration credentials in invalid format",
    { testrailTestCaseId: "43116", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.verifySpaceOnTheFields();
      browserStackPage.verifySaveButtonStatus("be.disabled");
    }
  );

  it(
    "Verify by default integration fields are empty and buttons are disabled",
    { testrailTestCaseId: "43117", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.clearURLText();
      browserStackPage.clearUserName();
      browserStackPage.clearAPIToken();
      browserStackPage.verifySaveButtonDisabled();
      browserStackPage.verifyTestButtonDisabled();
    }
  );

  it(
    "Verify if integration creds are valid, a success msg is shown after `Test`",
    { testrailTestCaseId: "43119", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.enterURLText();
      browserStackPage.enterUserName();
      browserStackPage.enterAPIToken();
      browserStackPage.clickTestButton();
      cy.wait(2000);
      browserStackPage
        .getPopUp()
        .verifyTestMessage(messages.CONNECTED_INTEGRATION);
      browserStackPage.clickSaveButton();
    }
  );

  it(
    "Verify if integration creds are invalid, a failure msg is shown after 'Test'",
    { testrailTestCaseId: "43120", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.enterURLText();
      browserStackPage.enterWrongUserName();
      browserStackPage.enterAPIToken();
      browserStackPage.clickTestButton();
      cy.wait(2000);
      browserStackPage.getPopUp().verifyTestMessage(messages.CONNECTION_FAILED);
      browserStackPage.clickSaveButton();
    }
  );

  it(
    "Verify user can save and auto-enable valid integration credentials",
    { testrailTestCaseId: "43121", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.enterURLText();
      browserStackPage.enterUserName();
      browserStackPage.enterAPIToken();
      browserStackPage.clickTestButton();
      cy.wait(2000);
      browserStackPage.clickSaveButton();
      browserStackPage
        .getPopUp()
        .verifyBottomRightPopUp(messages.SUCCESFULL_SAVED);
    }
  );

  it(
    "Verify user can disable integration",
    { testrailTestCaseId: "43122", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.verifyIntegrationProvider();
      browserStackPage.clickDeleteButton();
      browserStackPage.getPopUp().deleteIntegration();
      browserStackPage.enterURLText();
      browserStackPage.enterUserName();
      browserStackPage.enterAPIToken();
      browserStackPage.clickTestButton();
      browserStackPage.clickSaveButton();
      browserStackPage.verifyEnabledPowerButton();
      browserStackPage.verifySaveButtonStatus("be.disabled");
      browserStackPage.verifyCancelButtonStatus("be.disabled");
      browserStackPage.verifyTestButtonStatus("be.enabled");
      browserStackPage.verifyDeleteButtonStatus("be.enabled");
    }
  );

  //   it.only(
  //     "Verify a tooltip is shown when hovering to 'Enable/Disable integration' button",
  //     { testrailTestCaseId: "43123", owner: "ilsen" },
  //     () => {
  //       homePage.verifyUserIsOnHomePage();
  //       homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
  //       integrationPage.openProperIntegration(
  //         integrations.TESTING_PLATFORMS.BROWSERSTACK
  //       );
  //       browserStackPage.verifyEnabledIntegrationMessage();
  //     }
  //   );
  //! NOT WORKING TEMPORARY

  it(
    "Verify user can delete integration",
    { testrailTestCaseId: "43125", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.enterURLText();
      browserStackPage.enterUserName();
      browserStackPage.enterAPIToken();
      browserStackPage.clickTestButton();
      cy.wait(2000);
      browserStackPage.clickDeleteButton();
      cy.wait(2000);
      browserStackPage
        .getPopUp()
        .verifyWarningMessage(messages.WARNING_MESSAGE);
      browserStackPage.getPopUp().deleteIntegration();
      browserStackPage
        .getPopUp()
        .verifyBottomRightPopUp(messages.DELETED_INTEGRATION);
    }
  );

  it(
    "Verify user can cancel integration deletion",
    { testrailTestCaseId: "43126", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.LAMBDA_TEST
      );
      lambdaTestPage.enterURLText();
      lambdaTestPage.enterUserName();
      lambdaTestPage.enterAPIToken();
      lambdaTestPage.clickTestButton();
      cy.wait(2000);
      lambdaTestPage.clickSaveButton();
      cy.wait(2000);
      lambdaTestPage.clickDeleteButton();
      cy.wait(2000);
      lambdaTestPage.getPopUp().verifyWarningMessage(messages.WARNING_MESSAGE);
      lambdaTestPage.getPopUp().cancelIntegrationDelete();
    }
  );
});
