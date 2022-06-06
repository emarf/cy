/// <reference types="Cypress" />

const sideBarItem = require("../../../fixtures/tenantSidebarItems.json");

class MembersPage {
  constructor() {
    this.headerTitle = ".zeb-page-header__title";
    this.addMemberButton = "Add members";
    this.searchField = ".zeb-page-subheader__search-input";
    this.usersRow = ".users-table__row";
  }

  verifyAddMemberButton() {
    cy.contains(this.addMemberButton).should(
      "have.css",
      "background-color",
      "rgb(38, 166, 154)"
    );
  }

  typeInSearchField(text) {
    cy.clearField(this.searchField).type(`${text}`);
  }

  verifyHeaderTitle() {
    cy.invokeText(this.headerTitle).should("include", sideBarItem.MEMBERS);
  }
}

export const membersPage = new MembersPage();
