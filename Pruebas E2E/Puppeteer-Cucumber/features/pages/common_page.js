const { waitUtil, getText } = require("../utils/utils");
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
    const selector = 'button[data-test-button="publish-flow"]';
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
  }

  async clickContinueFinalReviewButton() {
    const selector = 'button[data-test-button="continue"]';
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
    await waitUtil(1500);
  }

  async clickConfirmPublishButton() {
    const selector = 'button[data-test-button="confirm-publish"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async checkNewPublishModal(title, content) {
    const titleSelector = 'div[class="modal-body"] > h2';
    await this.page.waitForSelector(titleSelector);
    const titleElementText = await getText(this.page, titleSelector);
    assert(
      titleElementText === title,
      `Error title does not match ${titleElementText}`
    );

    if (!content) return;
    const contentSelector = 'div[class="modal-body"] > p[class="post-excerpt"]';
    await this.page.waitForSelector(contentSelector);
    const contentElementText = await getText(this.page, contentSelector);
    assert(
      contentElementText === content,
      `Error content does not match ${contentElementText}`
    );
  }

  async clickCloseNewPublishModal() {
    const selector = 'button[data-test-button="close-publish-flow"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }
}

module.exports = CommonPageObject;
