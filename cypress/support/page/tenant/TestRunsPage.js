/// <reference types="Cypress" />

import { launcher } from "../../component/tenant/launcher";
import { projectKey } from "../../component/tenant/projectKey";

class TestRunsPage {
  constructor() {
    this.vpnKey =
      ".zeb-page-header__actions > .md-icon-button > .material-icons";
    this.tabItem = ".tab-item__name";
    this.pageHeader = ".zeb-page-header";
    this.testRunItem = ".test-run-card__clickable";
    this.testCardText = ".test-card__title-text";
    this.testRailLabel = ".md-menu > .test-label__item";
    this.titleLink = ".label-modal__title-link";
  }

  getProjectKey() {
    return projectKey;
  }

  getLauncher() {
    return launcher;
  }

  verifyLauncherPresence() {
    cy.contains(this.launcher).should("be.visible");
    cy.contains(this.launcher).should(
      "have.css",
      "background-color",
      "rgb(38, 166, 154)"
    );
  }

  clickLauncherButton() {
    cy.contains(this.launcher).click({ force: true });
  }

  verifyVPNKeyPresence() {
    cy.contains(this.vpnKey).should("be.visible");
  }

  clickVPNKey() {
    cy.clickOn(this.vpnKey);
  }

  clickTabItemName() {
    cy.clickOnFirst(this.tabItem);
  }

  verifyPageTitle() {
    cy.invokeText(this.pageHeader).then((headerText) => {
      expect(headerText).to.contain("Test runs");
    });
  }

  openFirstTestRun() {
    cy.clickOnFirst(this.testRunItem);
  }

  openLabel() {
    cy.clickOnFirst(this.testRailLabel);
  }

  verifyTestRailLabel() {
    cy.get(this.testCardText)
      .first()
      .invoke("text")
      .then((text) => {
        cy.clickOnFirst(this.testRailLabel);
        cy.invokeText(this.titleLink).then((labelText) => {
          expect(labelText.split(/\s+/).slice(0, 6).join(" ")).to.include(
            text.split(/\s+/).slice(0, 6).join(" ")
          );
        });
      });
  }
}

export const testRunsPage = new TestRunsPage();
