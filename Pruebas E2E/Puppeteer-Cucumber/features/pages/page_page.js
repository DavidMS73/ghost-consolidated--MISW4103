const { wait, getText } = require("../utils/utils");
const assert = require("assert");

class PagePageObject {
  pageBodySelector =
    'div[class^="koenig-react-editor"] > div:nth-child(1) > div:nth-child(1) > div[data-kg="editor"]';

  constructor(page) {
    this.page = page;
  }

  async clickNewPageButton() {
    const selector = 'a[href="#/editor/page/"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async fillPageTitle(title) {
    const selector = 'textarea[placeholder="Page title"]';
    await this.page.waitForSelector(selector);
    await this.page.type(selector, title);
    await wait(500);
  }

  async clickPageBody() {
    const selector = this.pageBodySelector;
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async fillPageBodyWithText(text) {
    const selector = this.pageBodySelector;
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await this.page.type(selector, text);
    await wait(500);
  }

  async fillImageWithAsset() {
    const imageBtnSelector = 'input[type="file"]';
    await this.page.waitForSelector(imageBtnSelector);
    const element = await this.page.$(imageBtnSelector);
    const filePath = './assets/Nissan-Skyline-GT-R-R32.jpg';
    await element.uploadFile(filePath);
    await wait(500);
  }

  async clickPreviewButton() {
    const selector = 'button[data-test-button="publish-preview"]';
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
  }
  
  async clickPageBody() {
    await this.page.waitForSelector(this.pageBodySelector);
    await this.page.click(this.pageBodySelector);
    await wait(500);
  }

  async clickPublishButton() {
    const selector = 'button[data-test-button="publish-flow"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await wait(500);
  }

  async clickContinueFinalReviewButton() {
    const selector = 'button[data-test-button="continue"]';
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
    await wait(1500);
  }

  async clickPublishPage() {
    const selector = 'button[data-test-button="publish-flow"]';
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
  }

  async clickAddButton() {
    const selector = 'button[aria-label="Add a card"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async clickAudioButton() {
    const selector = 'button[data-kg-card-menu-item="Audio"]';
    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click(selector)
    ]);
    await fileChooser.accept(['./assets/Panama.mp3']);
  }

  async clickConfirmPublishButton() {
    const selector = 'button[data-test-button="confirm-publish"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async checkNewPageModal(title, content) {
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

  async clickCloseNewPageModal() {
    const selector = 'button[data-test-button="close-publish-flow"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async clickPagesTypeFilter() {
    const selector =
      'div[class~="view-actions-bottom-row"] > div[class~="gh-contentfilter-type"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async clickPublishedPagesFilter() {
    const selector = 'ul[role="listbox"] > li:nth-child(3)';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async validateFirstPageTitle(title) {
    const selector =
      'div[class^="posts-list"] > div:nth-child(1) > li > a:nth-child(1) > h3';
    await this.page.waitForSelector(selector);
    const text = (await getText(this.page, selector)).trim();
    assert(text === title);
  }
}

module.exports = PagePageObject;
