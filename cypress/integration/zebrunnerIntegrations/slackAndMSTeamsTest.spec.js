/// <reference types="Cypress" />

const integrations = require("../../fixtures/integrations.json");
const messages = require("../../fixtures/messages.json");
const sideBarItems = require("../../fixtures/tenantSidebarItems.json");

import { homePage } from "../../support/page/tenant/HomePage";
import { integrationPage } from "../../support/page/tenant/IntegrationPage";
import { loginPage } from "../../support/page/login/LoginPage";
import { msTeamsPage } from "../../support/page/tenant/messageAndNotifications/MicrosoftTeamsPage";
import { slackPage } from "../../support/page/tenant/messageAndNotifications/SlackPage.js";

describe("Verifying Slack and MSTeams page elements", () => {
  beforeEach("Perform login", () => {
    loginPage.performLogin();
  });

  it(
    "Verify user can't leave 'Bot Name' field empty",
    { testrailTestCaseId: "43011", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.MESSAGING_AND_NOTIFICATIONS.SLACK
      );
      slackPage.verifyEmptyBotNameField();
    }
  );

  it(
    "Verify user can enter all types of characters to 'Bot Name' field",
    { testrailTestCaseId: "43013", owner: "ilsen" },
    () => {
      const data = ["$$", "qq", "$$dd"];
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.MESSAGING_AND_NOTIFICATIONS.SLACK
      );
      data.forEach((data) => {
        slackPage.enterRandomBotName(data);
      });
    }
  );

  it(
    "Verify user can't leave the field 'Token' empty",
    { testrailTestCaseId: "43015", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.MESSAGING_AND_NOTIFICATIONS.SLACK
      );
      slackPage.verifyEmptyTokenNameField();
    }
  );

  it(
    "Verify user can enter all types of characters to 'Token' field",
    { testrailTestCaseId: "43016", owner: "ilsen" },
    () => {
      const data = ["$$", "qq", "$$dd"];
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.MESSAGING_AND_NOTIFICATIONS.SLACK
      );
      data.forEach((data) => {
        slackPage.enterRandomToken(data);
      });
    }
  );

  it(
    "Verify user can't leave 'Channel Name' field empty",
    { testrailTestCaseId: "43023", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.MESSAGING_AND_NOTIFICATIONS.MICROSOFT_TEAMS
      );
      msTeamsPage.verifyEmptyChanelField();
    }
  );

  it(
    "Verify user can enter all types of characters to 'Channel Name' field",
    { testrailTestCaseId: "43024", owner: "ilsen" },
    () => {
      const data = ["$$", "qq", "$$dd"];
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.MESSAGING_AND_NOTIFICATIONS.MICROSOFT_TEAMS
      );
      data.forEach((data) => {
        msTeamsPage.enterRandomChanelName(data);
      });
    }
  );

  it(
    "Verify user can't leave the field 'Webhook' empty",
    { testrailTestCaseId: "43027", owner: "ilsen" },
    () => {
      homePage.verifyUserIsOnHomePage();
      homePage.getSidebar().navigateToSideBarItem(sideBarItems.INTEGRATIONS);
      integrationPage.openProperIntegration(
        integrations.MESSAGING_AND_NOTIFICATIONS.MICROSOFT_TEAMS
      );
      msTeamsPage.verifyEmptyWebhookField();
    }
  );
});
