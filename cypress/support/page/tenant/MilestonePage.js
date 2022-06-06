/// <reference types="Cypress" />

const sideBarItem = require("../../../fixtures/tenantSidebarItems.json");

class MilestonePage {
  constructor() {
    this.addMilestoneButton = "add milestone";
    this.openButton = ".button-rounded, Open";
    this.completedButton = ".button-rounded, Completed";
    this.headerTitle = ".zeb-page-header__title";
  }

  verifyHeaderTitle() {
    cy.invokeText(this.headerTitle).should("include", sideBarItem.MILESTONES);
  }
}

export const milestonePage = new MilestonePage();
