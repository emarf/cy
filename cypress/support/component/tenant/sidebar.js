class Sidebar {
  constructor() {
    this.sideBarLocator = ".nav-wrapper";
  }
  navigateToSideBarItem(itemText) {
    cy.get(this.sideBarLocator).contains(itemText).click({ force: true });
    // cy.url().should("contain", `/${itemText.toLowerCase(0)}`.trim());
  }
}

export const sidebar = new Sidebar();
