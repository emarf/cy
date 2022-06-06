/// <reference types="Cypress" />

class LoginPage {
  performLogin() {
    cy.visit("/");
    cy.login();
  }

  performAPILogin() {
    cy.apiLogin();
  }

  qpsLogin() {
    cy.visit("https://qps.zebrunner.com/");
    cy.qpsLogin();
  }
}

export const loginPage = new LoginPage();
