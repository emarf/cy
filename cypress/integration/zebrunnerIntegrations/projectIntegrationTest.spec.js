/// <reference types="Cypress" />

const integrations = require("../../fixtures/integrations.json");
const message = require("../../fixtures/messages.json");
const sideBarItems = require("../../fixtures/tenantSidebarItems.json");

import { homePage } from "../../support/page/tenant/HomePage";
import { integrationPage } from "../../support/page/tenant/IntegrationPage";
import { loginPage } from "../../support/page/login/LoginPage";
import { jenkinsPage } from "../../support/page/tenant/ciServers/JenkinsPage";

describe("Project Integrations", () => {
  beforeEach("Perform login", () => {
    loginPage.performLogin();
  });

  it(
    "Verify Default Jenkins is auto-created and enabled on each project",
    { testrailTestCaseId: "43130", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(integrations.CI_SERVERS.JENKINS);
      jenkinsPage.verifyDescriptionText();
      jenkinsPage.verifyPowerButton("be.visible");
      jenkinsPage.clickPowerButton();
      jenkinsPage
        .getPopup()
        .verifyBottomRightPopUp(message.ENABLED_INTEGRATION);
      jenkinsPage.clickPowerButton();
    }
  );

  it(
    "Verify user can test Jenkins",
    { testrailTestCaseId: "43132", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(integrations.CI_SERVERS.JENKINS);
      jenkinsPage.verifyDescriptionText();
      jenkinsPage.verfiyTestButton;
      jenkinsPage.clickTestButton();
      cy.wait(2000);
      jenkinsPage.getPopup().verifyTestMessage(message.CONNECTED_INTEGRATION);
    }
  );
});
