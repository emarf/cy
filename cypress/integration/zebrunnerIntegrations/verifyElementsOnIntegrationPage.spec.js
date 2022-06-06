/// <reference types="Cypress" />

const integrationSections = require("../../fixtures/integrationSections.json");
const sideBarItems = require("../../fixtures/tenantSidebarItems.json");

import { homePage } from "../../support/page/tenant/HomePage.js";
import { integrationPage } from "../../support/page/tenant/IntegrationPage.js";
import { loginPage } from "../../support/page/login/LoginPage.js";

describe("Verify sections", { owner: "ilsen" }, () => {
  beforeEach("Perform Login", () => {
    loginPage.performLogin();
  });

  it(
    "(C42606, First section)",
    { owner: "ilsen", testrailTestCaseId: "C42606", xrayTestKey: "12345" },
    () => {
      const itemText = sideBarItems.INTEGRATIONS;
      const title = integrationSections.TESTING_PLATFORMS;
      const titleNumber = 0;
      const sectionNumber = 0;
      const sectionLength = 6;
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(itemText);
      integrationPage.verifyTitle(title, titleNumber);
      integrationPage.verifySection(sectionNumber, sectionLength);
    }
  );

  it(
    "(C42606, Second section)",
    { owner: "ilsen", testrailTestCaseId: "C42606", xrayTestKey: "12345" },
    () => {
      const itemText = sideBarItems.INTEGRATIONS;
      const title = integrationSections.TEST_CASE_AND_MANAGMENT;
      const titleNumber = 1;
      const sectionNumber = 1;
      const sectionLength = 3;
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(itemText);
      integrationPage.verifyTitle(title, titleNumber);
      integrationPage.verifySection(sectionNumber, sectionLength);
    }
  );

  it(
    "(C42606, Third section)",
    { owner: "ilsen", testrailTestCaseId: "C42606", xrayTestKey: "12345" },
    () => {
      const itemText = sideBarItems.INTEGRATIONS;
      const title = integrationSections.MESSAGING_AND_NOTIFICATIONS;
      const titleNumber = 2;
      const sectionNumber = 2;
      const sectionLength = 2;
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(itemText);
      integrationPage.verifyTitle(title, titleNumber);
      integrationPage.verifySection(sectionNumber, sectionLength);
    }
  );

  it(
    "(C42606, Fourth section)",
    { owner: "ilsen", testrailTestCaseId: "C42606", xrayTestKey: "12345" },
    () => {
      const itemText = sideBarItems.INTEGRATIONS;
      const title = integrationSections.TEST_AUTOMATION_FRAMEWORKS;
      const titleNumber = 3;
      const sectionNumber = 3;
      const sectionLength = 7;
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(itemText);
      integrationPage.verifyTitle(title, titleNumber);
      integrationPage.verifySection(sectionNumber, sectionLength);
    }
  );

  it(
    "(C42606, Fifth section)",
    { owner: "ilsen", testrailTestCaseId: "C42606", xrayTestKey: "12345" },
    () => {
      const itemText = sideBarItems.INTEGRATIONS;
      const title = integrationSections.CI_SERVERS;
      const titleNumber = 4;
      const sectionNumber = 4;
      const sectionLength = 4;
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(itemText);
      integrationPage.verifyTitle(title, titleNumber);
      integrationPage.verifySection(sectionNumber, sectionLength);
    }
  );
});
