/// <reference types="Cypress" />

const headerItems = require("../../../fixtures/headerItems.json");

class ProjectPage {
  constructor() {
    this.pageHeader = ".zeb-page-header";
    this.newProjectButton = ".md-button__text";
    this.projectRow = ".projects-table__row ";
  }

  verifyProjectsPage() {
    cy.invokeText(this.pageHeader).then((headerText) => {
      expect(headerText).to.include(headerItems.PROJECTS);
    });
  }
}

export const projectPage = new ProjectPage();
