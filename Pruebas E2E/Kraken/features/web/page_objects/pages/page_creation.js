const { BasePageObject } = require("../base_page_object");
const { existsSync } = require("fs");

class PageCreationPageObject extends BasePageObject {
  pageBodySelector =
    'div[class^="koenig-react-editor"] > div:nth-child(1) > div:nth-child(1) > div[data-kg="editor"]';

  async fillPageTitle(title) {
    const element = await this.driver.$('textarea[placeholder="Page title"]');
    await element.setValue(title);
  }

  async clickPageBody() {
    const element = await this.driver.$(this.pageBodySelector);
    await element.click();
  }

  async fillPageBodyWithText(text) {
    const element = await this.driver.$(this.pageBodySelector);
    await element.click();
    await element.setValue(text);
  }

  async fillImageWithAsset() {
    const element = await this.driver.$('input[type="file"]');
    const path = "./assets/Nissan-Skyline-GT-R-R32.jpg";
    await element.setValue(path);
  }

  async clickAddButton() {
    const element = await this.driver.$('button[aria-label="Add a card"]');
    await element.click();
  }

  async clickAudioButton() {
    const element = await this.driver.$(
      'button[data-kg-card-menu-item="Audio"]'
    );
    await element.click();
  }

  async fillAudio() {
    const element = await this.driver.$('input[name="audio-input"]');
    const audioPath = "./assets/Panama.mp3";
    await element.setValue(audioPath);
  }

  async clickGearButton() {
    const element =
      await this.driver.$('button[title="Settings"]');
    await element.click();
  }

  async fillPageUrl(url) {
    const element =
      await this.driver.$('input[name="post-setting-slug"]');
    await element.click();
    await element.setValue(url);
  }

  async clickDeletePage() {
    const element =
      await this.driver.$('button[data-test-button="delete-post"]');
    await element.click();
  }

  async clickDeleteButton() {
    const element =
      await this.driver.$('button[data-test-button="delete-post-confirm"]');
    await element.click();
  }
}

module.exports = { PageCreationPageObject };
