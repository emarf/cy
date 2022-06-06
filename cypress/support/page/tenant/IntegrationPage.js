/// <reference types="Cypress" />

const headerItems = require("../../../fixtures/headerItems.json");
const integrations = require("../../../fixtures/integrations.json");
const message = require("../../../fixtures/messages.json");

import { sidebar } from "../../component/tenant/sidebar.js";
import { integration } from "../../component/tenant/integration.js";

class IntegrationPage {
  constructor() {
    this.categoryName = ".zebrunner-integrations__category-name";
    this.integrationCard = ".integration-card";
    this.integrationWrapper = ".zebrunner-integrations__cards-wrapper";
    this.integrationCardName = ".integration-card__name";
    this.pageHeader = ".zeb-page-header";
    this.breadCrumProjectName = ".breadcrumbs-list-item";
    this.selectedProject = ".project__selected";
    this.projectItem = ":nth-child(2) > .breadcrumb";
  }

  openintegrationCard(
    sectionNumber,
    sectionLength,
    elementNumber,
    elementName
  ) {
    cy.get(this.integrationWrapper)
      .eq(sectionNumber)
      .find(this.integrationCard)
      .then((section) => {
        expect(section).to.have.length(sectionLength);
        cy.wrap(section)
          .eq(elementNumber)
          .should("contain", elementName)
          .and("be.visible")
          .contains("arrow_forward")
          .click();
      });
  }

  verifySection(titleNumber, sectionLength) {
    cy.get(this.integrationWrapper)
      .eq(titleNumber)
      .find(this.integrationCard)
      .then((section) => {
        expect(section).to.have.length(sectionLength);
        cy.wrap(section).should("have.length", sectionLength);
        cy.wrap(section).each((listItem, index) => {
          const elementsName = listItem.text().trim();
          if (index < sectionLength) {
            cy.wrap(section).should("contain", elementsName);
          }
        });
      });
  }

  verifyTitle(title, titleNumber) {
    cy.get(this.categoryName).then((sectionTitle) => {
      cy.wrap(sectionTitle)
        .eq(titleNumber)
        .invoke("text")
        .then((firstElement) => {
          expect(firstElement).to.equal(`${title}`);
        });
    });
  }

  openProperIntegration(integrationName) {
    cy.get(this.integrationCardName)
      .contains(integrationName)
      .click({ force: true });
  }

  verifyPageTitle() {
    cy.invokeText(this.pageHeader).then((headerText) => {
      expect(headerText).to.contain(headerItems.INTEGRATIONS);
    });
  }

  verifyProperNameOfProject() {
    cy.get(this.breadCrumProjectName)
      .eq(1)
      .invoke("text")
      .then((breadCrumText) => {
        cy.invokeText(this.selectedProject).then((selectedText) => {
          expect(breadCrumText).to.include(selectedText);
        });
      });
  }

  clickBreadCrumProjectName() {
    cy.clickOn(this.projectItem);
  }

  clickBreadCrumProject() {
    cy.clickOnFirst(this.breadCrumProjectName);
  }

  verifyOpenedIntegration(integrationName) {
    cy.get(this.integrationCard)
      .contains(integrationName)
      .should("have.attr", "target", "_blank")
      .invoke("attr", "href")
      .should(
        "contain",
        `https://zebrunner.com/documentation/reporting/${integrationName
          .toLowerCase(0)
          .trim()}`
      );
  }
}

export const integrationPage = new IntegrationPage();
