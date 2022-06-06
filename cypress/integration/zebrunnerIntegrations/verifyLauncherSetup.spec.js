/// <reference types="Cypress" />

const sideBarItems = require("../../fixtures/tenantSidebarItems.json");

import { homePage } from "../../support/page/tenant/HomePage";
import { loginPage } from "../../support/page/login/LoginPage";
import { testRunsPage } from "../../support/page/tenant/TestRunsPage";

describe("Verify launcher is set up properly", () => {
  beforeEach("Perform login", () => {
    loginPage.performLogin();
  });

  it(
    "Verify user can configure  integration and launch test suites successfully",
    { testrailTestCaseId: "42663", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.TEST_RUNS);
      testRunsPage.getLauncher().verifyLauncherButtonPresence();
      testRunsPage.getLauncher().openLauncher();
      testRunsPage.getLauncher().addNewLauncher();
      testRunsPage.getLauncher().openIntegrationList();
      testRunsPage.getLauncher().verifyConectedIntegrations();
    }
  );
});
