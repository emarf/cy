/// <reference types="Cypress" />

const integrations = require("../../fixtures/integrations.json");
const sideBarItems = require("../../fixtures/tenantSidebarItems.json");

import { browserStackPage } from "../../support/page/tenant/testingPlatforms/BrowserStackPage";
import { homePage } from "../../support/page/tenant/HomePage";
import { integrationPage } from "../../support/page/tenant/IntegrationPage";
import { loginPage } from "../../support/page/login/LoginPage";
import { testRunsPage } from "../../support/page/tenant/TestRunsPage";
import { projectPage } from "../../support/page/tenant/ProjectPage";

describe("Integrations grid ", () => {
  beforeEach("Perform login", () => {
    loginPage.performLogin();
  });

  it(
    "Verify user can open project integrations via sidebar",
    { testrailTestCaseId: "43065", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      cy.wait(3000);
      integrationPage.verifyPageTitle();
      integrationPage.verifyProperNameOfProject();
    }
  );

  it(
    "Verify user can open project`s test run grid via breadcrumbs on Integrations grid",
    { testrailTestCaseId: "43066", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      cy.wait(3000);
      integrationPage.clickBreadCrumProjectName();
      cy.wait(3000);
      testRunsPage.verifyPageTitle();
    }
  );

  it(
    "Verify user can open projects grid via breadcrumbs on Integrations grid",
    { testrailTestCaseId: "43067", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.clickBreadCrumProject();
      cy.wait(3000);
      projectPage.verifyProjectsPage();
    }
  );

  it(
    "Verify user can hover to any available integration on the grid and open it",
    { testrailTestCaseId: "43068", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.TESTING_PLATFORMS.BROWSERSTACK
      );
      browserStackPage.verifyIntegrationProvider();
    }
  );
});
