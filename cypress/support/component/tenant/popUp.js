const message = require("../../../fixtures/messages.json");

class PopUp {
  constructor() {
    this.popUpText = ".md-toast-text";
    this.footerMessages = ".test-provider-form__footer-messages";
    this.warningMessage = ".styled-modal .modal-content__message._warning";
    this.buttonsWrapper = ".md-button";
    this.powerButton = "power_settings_new";
    this.powerButtonClass = ".md-icon-button";
  }

  verifyBottomRightPopUp(text) {
    cy.get(this.popUpText).invoke("text").should("contain", `${text}`);
  }

  verifyIntegrationStatus() {
    try {
      if (
        cy
          .contains(this.powerButton)
          .first()
          .should("have.css", "color", "rgb(68, 196, 128)")
      ) {
        return cy
          .get(this.popUpText)
          .invoke("text")
          .should("contain", message.ENABLED_INTEGRATION);
      } else if (
        cy.contains(this.powerButtonClass).first().should("not.be.enabled")
      ) {
        return cy
          .get(this.popUpText)
          .invoke("text")
          .should("contain", message.DISABLED_INTEGRATION);
      }
    } catch (error) {
      console.log(error);
    }
  }

  verifyTestMessage(message) {
    cy.invokeText(this.footerMessages).then((text) => {
      expect(text).to.include(`${message}`);
    });
  }

  verifyWarningMessage(warningMessage) {
    cy.get(this.warningMessage)
      .first()
      .invoke("text")
      .should("contain", `${warningMessage}`);
  }

  deleteIntegration() {
    cy.get(this.buttonsWrapper).contains("Delete").click({ force: true });
  }

  cancelIntegrationDelete() {
    cy.get(this.buttonsWrapper).contains("Cancel").click({ force: true });
  }
}

export const popUp = new PopUp();
