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
    const selector = 'button[data-test-button="publish-flow"]';
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
  }

  async checkPublishButtonNotVisible() {
    const selector = 'button[data-test-button="publish-flow"]';
    // Espera a que el botón "Publish" esté disponible en la página
    const element = await this.page.$(selector);

    assert(
      element === null,
      `The publish button is in the screen and should not be there`
    );
  }

  async clickContinueFinalReviewButton() {
    const selector = 'button[data-test-button="continue"]';
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de programación de publicación de una page dando clic en el botón "Publish"
    await this.page.click(selector);
    await waitUtil(500);
  }

  async clickEditorPage() {
    const selector = "div.koenig-react-editor";
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await waitUtil(500);
  }

  async clickConfirmPublishButton() {
    const selector = 'button[data-test-button="confirm-publish"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await waitUtil(500);
  }

  async checkNewPublishModal(title, content, image, partialContent) {
    if (title) {
      const titleSelector = 'div[class="modal-body"] > h2';
      await this.page.waitForSelector(titleSelector);
      const titleElementText = await getText(this.page, titleSelector);
      assert(
        titleElementText === title,
        `Error title does not match, the obtained is -> ${titleElementText} and the saved is ${title}`
      );
    }

    if (content) {
      const contentSelector =
        'div[class="modal-body"] > p[class="post-excerpt"]';
      await this.page.waitForSelector(contentSelector);
      const contentElementText = await getText(this.page, contentSelector);
      assert(
        contentElementText === content,
        `Error content does not match, the obtained is -> ${contentElementText} and the saved is ${content}`
      );
    }

    if (image) {
      const imageSelector = 'figure[class="modal-image"] > img';
      await this.page.waitForSelector(imageSelector);
      const imageElementText = await getImageExists(this.page, imageSelector);
      assert(imageElementText, `Error image does not exists`);
    }

    if (partialContent) {
      const contentSelector =
        'div[class="modal-body"] > p[class="post-excerpt"]';
      await this.page.waitForSelector(contentSelector);
      const contentElementText = await getText(this.page, contentSelector);
      assert(
        contentElementText.includes(partialContent),
        `Error partial content does not includes the info, the obtained is -> ${contentElementText} and the saved is ${partialContent}`
      );
    }
  }

  async clickCloseNewPublishModal() {
    const selector = 'button[data-test-button="close-publish-flow"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await waitUtil(500);
  }

  async deleteAllInfo() {
    const selector1 = 'a[href="#/settings/"]';
    await this.page.waitForSelector(selector1);
    await this.page.click(selector1);

    const selector2 = "button > span";
    await this.page.waitForSelector(selector2);
    const elements2 = await this.page.$$(selector2);
    for (const element of elements2) {
      const deleteInfo = await this.page.evaluate(
        (button) => button.innerText,
        element
      );
      if (deleteInfo === "Delete all content") {
        element.click();
      }
    }

    await waitUtil(500);

    const selector3 = "button > span";
    await this.page.waitForSelector(selector3);
    const elements3 = await this.page.$$(selector3);
    for (const element of elements3) {
      const deleteInfo = await this.page.evaluate(
        (button) => button.innerText,
        element
      );
      if (deleteInfo === "Delete") {
        element.click();
      }
    }
  }

  async uploadFeatureImage(route) {
    // Espera a que el botón "Add feature image" esté disponible en la página
    await this.page.waitForSelector(
      "button.gh-editor-feature-image-add-button"
    );

    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click("button.gh-editor-feature-image-add-button"),
    ]);

    await fileChooser.accept([route]);

    // Espera para que la carga de la imagen se complete
    await waitUtil(1000);
  }

  async uploadAudio(route) {
    const selector1 = 'button[aria-label="Add a card"]';
    await this.page.waitForSelector(selector1);
    await this.page.click(selector1);

    const selector2 = 'button[data-kg-card-menu-item="Audio"]';
    await this.page.waitForSelector(selector2);

    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click(selector2),
    ]);

    await fileChooser.accept([route]);

    // Espera para que la carga del audio se complete
    await waitUtil(1000);
  }

  async uploadVideo(route) {
    const selector1 = 'button[aria-label="Add a card"]';
    await this.page.waitForSelector(selector1);
    await this.page.click(selector1);

    const selector2 = 'button[data-kg-card-menu-item="Video"]';
    await this.page.waitForSelector(selector2);

    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click(selector2),
    ]);

    await fileChooser.accept([route]);

    // Espera para que la carga del audio se complete
    await waitUtil(1000);
  }

  async checkVideoPreviewError() {
    const contentSelector = 'span[data-testid="media-placeholder-errors"]';
    await this.page.waitForSelector(contentSelector);
    const contentElementText = await getText(this.page, contentSelector);
    assert(
      contentElementText.includes(
        "The file type you uploaded is not supported. Please use .VIDEO/MP4, .VIDEO/WEBM, .VIDEO/OGG"
      ),
      `Error not shown when it should tell the video files allowed`
    );
  }
}

module.exports = CommonPageObject;
