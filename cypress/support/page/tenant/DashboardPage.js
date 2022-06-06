/// <reference types="Cypress" />

const sideBarItem = require("../../../fixtures/tenantSidebarItems.json");

class DashboardPage {
  constructor() {
    this.addDashboardButton = "Add dashboard";
    this.headerTitle = ".zeb-page-header__title";
    this.searchInput = ".zeb-page-subheader__search-input";
    this.dashBoardRow = ".dashboards-table";
  }

  verifyPageHeader() {
    cy.invokeText(this.headerTitle).should("include", sideBarItem.DASHBOARDS);
  }

  verifyDashBoardButton() {
    cy.contains(this.addDashboardButton)
      .should("be.visible")
      .and("have.css", "background-color", "rgb(38, 166, 154)");
  }

  typeSearchText(text) {
    cy.clearField(this.searchInput).type(`${text}`);
  }
}

export const dashboardPage = new DashboardPage();
