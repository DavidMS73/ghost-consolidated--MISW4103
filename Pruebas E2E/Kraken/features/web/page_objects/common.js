const { assert } = require("chai");
const { BasePageObject } = require("./base_page_object");

class CommonPageObject extends BasePageObject {
  async clickPreviewButton() {
    const element = await this.driver.$(
      'button[data-test-button="publish-preview"]'
    );
    await element.click();
  }

  async clickPublishButton() {
    const element = await this.driver.$(
      'button[data-test-button="publish-flow"]'
    );
    await element.click();
  }

  async clickContinueFinalReviewButton() {
    const element = await this.driver.$('button[data-test-button="continue"]');
    await element.click();
  }

  async clickConfirmPublishButton() {
    const element = await this.driver.$(
      'button[data-test-button="confirm-publish"]'
    );
    await element.click();
  }

  async checkNewPublishModal(title, content, image) {
    if (title) {
      const titleElement = await this.driver.$('div[class="modal-body"] > h2');
      const titleElementText = await titleElement.getText();
      assert.equal(titleElementText, title);
    }

    if (content) {
      const contentElement = await this.driver.$(
        'div[class="modal-body"] > p[class="post-excerpt"]'
      );
      const contentElementText = await contentElement.getText();
      assert.equal(contentElementText, content);
    }

    if (image) {
      const contentElement = await this.driver.$(
        'div[class="modal-body"] > p[class="post-excerpt"]'
      );
      assert(contentElement, `Error image does not exists`);
    }
  }

  async clickCloseNewPublishModal() {
    const element = await this.driver.$(
      'button[data-test-button="close-publish-flow"]'
    );
    await element.click();
  }
}

module.exports = { CommonPageObject };
