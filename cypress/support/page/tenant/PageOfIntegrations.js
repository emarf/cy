/// <reference types="Cypress" />

class PageOfIntegrations {
  constructor() {
    this.browserStackForm = ".browserstack-form";
    this.buttonText = ".md-button__text";
    this.createAccount = "Create";
    this.createAccountLink = ".integration-config-intro__create-account-link";
    this.credentialsMenu = ".integration-config__section";
    this.descriptionLink = ".integration-config-intro";
    this.fieldTokenAPI = "#integrationAccessKey";
    this.fieldURL = "#integrationHubUrl";
    this.fieldUserName = "#integrationUsername";
    this.integrationConfig = ".integration-config-intro__create-account-text";
    this.mdRaised = ".md-raised";
    this.powerSettings = "power_settings_new";
    this.noAccount = "Don't have an account?";
    this.swipperWrapper = ".swiper-wrapper";
    this.swipperSlide = ".swiper-slide";
    this.testProvider = ".test-provider-form__integration-actions";
    this.zebPageTitle = ".zeb-page-header__title";
  }

  verifyIntegrationConnections(URL, username, APIToken) {
    cy.get(this.browserStackForm).then((browserForm) => {
      cy.findElement(browserForm, this.fieldURL)
        .clear()
        .type(URL, { log: false });
      cy.findElement(browserForm, this.fieldUserName)
        .clear()
        .type(username, { log: false });
      cy.findElement(browserForm, this.fieldTokenAPI)
        .clear()
        .type(APIToken, { log: false });
      cy.findElement(browserForm, this.buttonText, "Test").click({
        force: true,
      });
      cy.findElement(browserForm, this.mdRaised, "Save")
        .eq(2)
        .should("contain", "Save")
        .click();
      cy.findElement(browserForm, this.testProvider)
        .contains(this.powerSettings)
        .should("be.enabled");
    });
  }
}

export const pageOfIntegrations = new PageOfIntegrations();
