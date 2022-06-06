/// <reference types="Cypress" />

import { projectKey } from "../../component/tenant/projectKey.js";
import { sidebar } from "../../component/tenant/sidebar.js";

class HomePage {
  constructor() {
    this.pageHeader = ".zeb-page-header";
    this.pageBindingContainer = ".app-header__container";
    this.appHeaderProject = ".app-header__project";
    this.pageBinding = ".ng-binding";
  }

  getSidebar() {
    return sidebar;
  }

  getProject() {
    return projectKey;
  }

  verifyUserIsOnHomePage() {
    cy.wait(2000);
    cy.get(this.pageHeader).then((titleText) => {
      cy.wrap(titleText).find(this.pageBinding).should("contain", "Test runs");
    });
  }
}

export const homePage = new HomePage();
