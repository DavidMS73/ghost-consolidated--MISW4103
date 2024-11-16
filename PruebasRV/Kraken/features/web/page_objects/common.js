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
    const element = await this.driver.$("div.gh-publishmenu");
    await element.click();
  }

  async waitAFewSeconds() {
    await new Promise((r) => setTimeout(r, 700));
  }

  async clickConfirmPublishButton() {
    const element = await this.driver.$("button.gh-publishmenu-button");
    await element.click();
  }

  async checkNewPublishModal(title) {
    const titleElement = await this.driver.$("span.gh-notification-title");
    const titleElementText = await titleElement.getText();
    assert.equal(titleElementText, title);
  }
}

module.exports = { CommonPageObject };
