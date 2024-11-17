const { getText, waitUtil } = require("../utils/utils");
const assert = require("assert");
const { BasePageObject } = require("./base_page");
const scope = require("../support/scope");

class PagePageObject extends BasePageObject {
  pageBodySelector =
    'div[class^="koenig-editor"] > div:nth-child(1)';

  async clickNewPageButton() {
    const selector = 'a[href="#/editor/page/"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async fillPageTitle(title) {
    const selector = 'textarea[placeholder="Page Title"]';
    await this.page.waitForSelector(selector);
    await this.page.type(selector, title);
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
  }

  async fillImageWithAsset() {
    const imageBtnSelector = 'input[type="file"]';
    await this.page.waitForSelector(imageBtnSelector);
    const element = await this.page.$(imageBtnSelector);
    const filePath = "./assets/Nissan-Skyline-GT-R-R32.jpg";
    await element.uploadFile(filePath);
    await waitUtil(500);
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
      this.page.click(selector),
    ]);
    await fileChooser.accept(["./assets/Panama.mp3"]);
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
      'ol[class^="gh-list"] > li:nth-child(2) > a:nth-child(1) > h3';
    await this.page.waitForSelector(selector);
    const text = (await getText(this.page, selector)).trim();
    assert(text === title);
  }

  async clickPublishMenu() {
    await this.clickElement('div[class^=gh-publishmenu]');
  }

  async clickPublishButton() {
    await this.clickElement('button[class~="gh-publishmenu-button"]');
  }

  async clickFirstPage() {
    await this.clickElement('ol[class^="gh-list"] > li:nth-child(2) > a:nth-child(1)');
  }

  async clickGearButton() {
    await this.clickElement('button[title="Settings"]');
  }

  async clickDeletePage() {
    await this.clickElement('button[class~="settings-menu-delete-button"]');
  }

  async clickDeleteButton() {
    await this.clickElement('div[class="modal-footer"] > button:nth-child(2)');
  }

  async fillPageUrl(url) {
    await this.typeValue('input[name="post-setting-slug"]', url, {
      clearInput: true,
    });
  }

  async closeSettingsDrawer() {
    await this.clickElement('button[aria-label="Close"]');
  }

  async navToPageSite({
    pageUrl, baseUrl
  }) {
    await scope.page.goto(`${baseUrl}/${pageUrl}`);
  }

  async validatePageTitle(title) {
    const selector = 'h1[class="article-title"]';
    await this.page.waitForSelector(selector);
    let text = await getText(this.page, selector);
    text = text.trim();
    assert(text === title);
  }

  async validatePageContent(content) {
    const selector = 'section[class^="gh-content"] > p';
    await this.page.waitForSelector(selector);
    let text = await getText(this.page, selector);
    text = text.trim();
    assert(text === content);
  }
}

module.exports = PagePageObject;
