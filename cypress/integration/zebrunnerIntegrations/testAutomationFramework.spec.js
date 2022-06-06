/// <reference types="Cypress" />

const integrations = require("../../fixtures/integrations.json");
const sideBarItems = require("../../fixtures/tenantSidebarItems.json");

import { homePage } from "../../support/page/tenant/HomePage";
import { integrationPage } from "../../support/page/tenant/IntegrationPage";
import { loginPage } from "../../support/page/login/LoginPage";

describe("Test Automation Framework", () => {
  beforeEach("Perform login", () => {
    loginPage.performLogin();
  });

  it(
    "Click on 'Carina' card on Integrations grid opens documentation",
    { testrailTestCaseId: "43034", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.CARINA
      );
      integrationPage.verifyOpenedIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.CARINA
      );
    }
  );

  it(
    "Click on 'TestNG' card on Integrations grid opens documentation",
    { testrailTestCaseId: "43035", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.TEST_NG
      );
      integrationPage.verifyOpenedIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.TEST_NG
      );
    }
  );

  it(
    "Click on 'JUnit' card on Integrations grid opens documentation",
    { testrailTestCaseId: "43035", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.JUNIT
      );
      integrationPage.verifyOpenedIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.JUNIT
      );
    }
  );

  it(
    "Click on 'JUnit 5' card on Integrations grid opens documentation",
    { testrailTestCaseId: "43035", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.JUNIT_5
      );
      integrationPage.verifyOpenedIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.JUNIT_5
      );
    }
  );

  it(
    "Click on 'PyTest' card on Integrations grid opens documentation",
    { testrailTestCaseId: "43038", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.PY_TEST
      );
      integrationPage.verifyOpenedIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.PY_TEST
      );
    }
  );

  it(
    "Click on 'Cypress' card on Integrations grid opens documentation",
    { testrailTestCaseId: "44334", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.CYPRESS
      );
      integrationPage.verifyOpenedIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.CYPRESS
      );
    }
  );

  it(
    "Click on 'NUnit' card on Integrations grid opens documentation",
    { testrailTestCaseId: "44335", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.NUNIT
      );
      integrationPage.verifyOpenedIntegration(
        integrations.TEST_AUTOMATION_FRAMEWORKS.NUNIT
      );
    }
  );
});
