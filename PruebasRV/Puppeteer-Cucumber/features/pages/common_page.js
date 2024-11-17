const { waitUtil, getText, getImageExists } = require("../utils/utils");
const assert = require("assert");

class CommonPageObject {
  constructor(page) {
    this.page = page;
  }

  async clickPreviewButton() {
    const selector = 'button[data-test-button="publish-preview"]';
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
  }

  async clickPublishButton() {
    const selector = "div.gh-publishmenu";
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
    await waitUtil(1000);
  }

  async waitAFewSeconds() {
    await waitUtil(1500);
  }

  async clickConfirmPublishButton() {
    const selector = "button.gh-publishmenu-button";
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
  }

  async checkNewPublishModal(title) {
    const titleSelector = "span.gh-notification-title";
    await this.page.waitForSelector(titleSelector);
    const titleElementText = await getText(this.page, titleSelector);
    assert(
      titleElementText === title,
      `Error title does not match ${titleElementText}`
    );
  }
}

module.exports = CommonPageObject;
