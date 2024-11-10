class PagePageObject {
  constructor(page) {
    this.page = page;
  }

  async createPage() {
    // Espera a que el botón "New page" esté disponible en la página
    await this.page.waitForSelector("a[data-test-new-page-button]");
    // Navega a la página de creación de una page dando clic en el botón "New page"
    await this.page.click("a[data-test-new-page-button]");
  }

  async fillTitle(title) {
    // Espera a que el campo de título esté disponible en la página
    await this.page.waitForSelector('textarea[placeholder="Page title"]');
    // Ingresa el título en el campo de título
    await this.page.type('textarea[placeholder="Page title"]', title);
  }

  async clickPageBody() {
    const pageBodySelector =
      'div[class^="koenig-react-editor"] > div:nth-child(1) > div:nth-child(1) > div[data-kg="editor"]';

    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(pageBodySelector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(pageBodySelector);
  }

  async clickPreviewButton() {
    const selector = 'button[data-test-button="publish-preview"]';
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
  }

  async clickPublishPage() {
    const selector = 'button[data-test-button="publish-flow"]';
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
  }

  async clickConfirmPublishButton() {
    const selector = 'button[data-test-button="confirm-publish"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async checkNewPageModal(title, content) {
    const selector = 'div[class="modal-body"] > h2';
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    const titleElement = await this.page.$(selector);
    const titleElementText = await this.page.evaluate((el) => el.textContent, titleElement);
    console.assert(titleElementText === title, `Error title does not match ${titleElementText}`);

    if (!content) return;
    const selector2 = 'div[class="modal-body"] > p[class="page-excerpt"]';
    await this.page.waitForSelector(selector2);
    const contentElement = await this.page.$(selector2);
    const contentElementText = await this.page.evaluate((el) => el.textContent, contentElement);
    assert.equal(contentElementText === content, `Error content does not match ${contentElementText}`);
  }

  async clickCloseNewPageModal() {
    const selector = 'button[data-test-button="close-publish-flow"]';
    await this.page.waitForSelector(selector);
    const element = await this.page.$(selector);
    await element.click();
  }
}

module.exports = PagePageObject;
