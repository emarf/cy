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
import { sauceLabPage } from "../../support/page/tenant/testingPlatforms/SauceLabPage";

describe("Test environment provider", { owner: "ilsen" }, () => {
  beforeEach("Perform login", () => {
    loginPage.performLogin();
  });

  it(
    "Verify that BrowserStack integration page looks correctly",
    { testrailTestCaseId: "43059", owner: "ilsen" },
    () => {
      cy.wait(1000);
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      cy.wait(1000);
      browserStackPage.verifyGoToDocumentationButtonPresence();
      browserStackPage.verifyNoAccountText();
      browserStackPage.verifyCreateButtonPresence();
      browserStackPage.verifyIntegrationProvider();
      browserStackPage.verifyFieldUrlPresence();
      browserStackPage.verifyAPITokenField();
      browserStackPage.verifyUserNameField();
      browserStackPage.verifyBreadCrumsPresence();
      browserStackPage.verifyPowerButton();
    }
  );

  it(
    "Verify that Hub Access shows active integration BrowserStack connection",
    { testrailTestCaseId: "43061", owner: "ilsen" },
    () => {
      cy.wait(1000);
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.enterURLText();
      browserStackPage.enterUserName();
      browserStackPage.enterAPIToken();
      browserStackPage.clickTestButton();
      browserStackPage.clickSaveButton();
      browserStackPage.clickPowerButton();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.TEST_RUNS);
      testRunsPage.getProjectKey().openProjectKey();
      testRunsPage
        .getProjectKey()
        .openConnection(integrations.TESTING_PLATFORMS.BROWSERSTACK);
    }
  );

  it(
    "Verify that MCloud integration page looks correctly",
    { testrailTestCaseId: "43062", owner: "ilsen" },
    () => {
      cy.wait(1000);
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.MCLOUD
      );
      mcloudPage.verifyIntegrationProvider();
      mcloudPage.verifyBreadCrumsPresence();
      mcloudPage.verifyNoAccountText();
      mcloudPage.verifyGoToDocumentationButtonPresence();
      mcloudPage.clickSwipeRightButton();
      mcloudPage.clickSwipeLeftButton();
      mcloudPage.verifyAPITokenField();
      mcloudPage.verifyFieldUrlPresence();
      mcloudPage.verifyUserNameField();
      mcloudPage.verifyCreateButtonPresence();
      mcloudPage.verifyCreateButtonPresence();
      mcloudPage.verifyPowerButtonStatus("be.visible");
    }
  );

  it(
    "Verify user can configure MCloud integration and launch test suites successfully ",
    { testrailTestCaseId: "43069", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.MCLOUD
      );
      mcloudPage.verifyIntegrationProvider();
      mcloudPage.enterURLText();
      mcloudPage.enterUserName();
      mcloudPage.enterAPIToken();
      mcloudPage.clickTestButton();
      mcloudPage.verifyPowerButtonStatus("be.visible");
      mcloudPage.clickPowerButton();
    }
  );

  it(
    "Verify user can configure Browserstack integration and launch test suites successfully",
    { testrailTestCaseId: "43070", owner: "ilsen" },
    () => {
      cy.wait(1000);
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.enterURLText();
      browserStackPage.enterUserName();
      browserStackPage.enterAPIToken();
      browserStackPage.clickTestButton();
      browserStackPage.clickSaveButton();
      browserStackPage.verifyPowerButton();
    }
  );

  it(
    "Verify user can configure SauceLabs integration and launch test suites successfully ",
    { testrailTestCaseId: "43071", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.SAUCE_LABS
      );
      sauceLabPage.verifyIntegrationNameField();
      sauceLabPage.enterFieldURL();
      sauceLabPage.enterUsername();
      sauceLabPage.enterTokenAPI();
      cy.wait(1000);
      sauceLabPage.clickTestButton();
      cy.wait(3000);
      sauceLabPage.getPopUp().verifyTestMessage(messages.CONNECTED_INTEGRATION);
      cy.wait(1000);
      sauceLabPage.clickSaveButton();
      sauceLabPage.clickPowerButton();
    }
  );

  it(
    "Verify user can configure Lambdatest integration and launch test suites successfully",
    { testrailTestCaseId: "43072", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.LAMBDA_TEST
      );
      lambdaTestPage.verifyIntegrationProvider();
      lambdaTestPage.enterURLText();
      lambdaTestPage.enterUserName();
      lambdaTestPage.enterAPIToken();
      lambdaTestPage.clickTestButton();
      cy.wait(2000);
      lambdaTestPage
        .getPopUp()
        .verifyTestMessage(messages.CONNECTED_INTEGRATION);
      lambdaTestPage.clickPowerButton();
      lambdaTestPage.verifyPowerButton();
    }
  );

  it(
    "Verify an error is shown if `URL` field is left empty",
    { testrailTestCaseId: "43081", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.verifyEmtyURLField();
    }
  );

  it(
    "Verify an error is shown if entering invalid `URL` format to URL field",
    { testrailTestCaseId: "43083", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.verifyInvalidURL();
    }
  );

  it(
    "Verify an error is shown if `username` field is left empty",
    { testrailTestCaseId: "43085", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.verifyEmptyEmailField();
    }
  );

  it(
    "Verify an error is shown if `Api Token` field is left empty",
    { testrailTestCaseId: "43088", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.verifyEmptyTokenField();
    }
  );

  it(
    "Verify empty space isn't allowed in all fields",
    { testrailTestCaseId: "43090", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.verifySpaceOnTheFields();
    }
  );

  it(
    "Verify user can get to Integration provider page via `Create` on Browserstack page",
    { testrailTestCaseId: "43075", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.verifyTitle(integrationSections.TESTING_PLATFORMS, 0);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.verifyRedirectionAfterCreateClick();
    }
  );
});
