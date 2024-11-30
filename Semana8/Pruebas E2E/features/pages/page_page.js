const {
  getText,
  waitUtil,
  isElementVisible,
  getInputText,
} = require("../utils/utils");
const assert = require("assert");
const { BasePageObject } = require("./base_page");
const scope = require("../support/scope");

class PagePageObject extends BasePageObject {
  pageBodySelector =
    'div[class^="koenig-react-editor"] > div:nth-child(1) > div:nth-child(1) > div[data-kg="editor"]';
  pageVisibilitySelector = 'select[data-test-select="post-visibility"]';
  pageTitleSelector = 'textarea[placeholder="Page title"]';

  async clickNewPageButton() {
    const selector = 'a[href="#/editor/page/"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async fillPageTitle(title) {
    await this.page.waitForSelector(this.pageTitleSelector);
    await this.page.type(this.pageTitleSelector, title);
  }

  async deleteTitle() {
    await this.page.waitForSelector(this.pageTitleSelector);
    await this.page.$eval(this.pageTitleSelector, el => el.value = '');
  }

  async deleteContent() {
    await this.page.waitForSelector(this.pageBodySelector);
    await this.page.click(this.pageBodySelector);
    let text = await getText(this.page, this.pageBodySelector);
    while (text !== '') {
      await this.page.keyboard.press('Backspace');
      text = await getText(this.page, this.pageBodySelector);
    }
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
    await waitUtil(700);
  }

  async fillImageWithAsset() {
    const imageBtnSelector = 'input[type="file"]';
    await this.page.waitForSelector(imageBtnSelector);
    const element = await this.page.$(imageBtnSelector);
    const filePath = "./assets/Nissan-Skyline-GT-R-R32.jpg";
    await element.uploadFile(filePath);
    await waitUtil(700);
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
    await waitUtil(500);
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

  async validateFirstPageIsFeatured() {
    const selector =
      'div[class^="posts-list"] > div:nth-child(1) > li > a:nth-child(1) > h3 > svg';
    const isVisible = await isElementVisible(this.page, selector);
    assert(isVisible);
  }

  async clickGearButton() {
    await this.clickElement('button[title="Settings"]');
  }

  async fillPageUrl(url) {
    await this.typeValue('input[name="post-setting-slug"]', url, {
      clearInput: true,
    });
  }

  async navToPageSite({ pageUrl, baseUrl }) {
    await scope.page.goto(`${baseUrl}/${pageUrl}`);
  }

  async validatePageTitle(title) {
    const selector = 'h1[class^="gh-article-title"]';
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

  async clickFirstPage() {
    await this.clickElement('div[class^="posts-list"] > div:nth-child(1)');
  }

  async clickDeletePage() {
    await this.clickElement('button[data-test-button="delete-post"]');
  }

  async clickDeleteButton() {
    await this.clickElement('button[data-test-button="delete-post-confirm"]');
  }

  async clickPageAccessDropdown() {
    await this.clickElement(this.pageVisibilitySelector);
  }

  async clickMembersOnlyButton() {
    await this.page.select(this.pageVisibilitySelector, "members");
  }

  async clickPaidMembersOnlyButton() {
    await this.page.select(this.pageVisibilitySelector, "paid");
  }

  async clickAccessFilter() {
    await this.clickElement('div[class~="gh-contentfilter-visibility"]');
  }

  async clickMembersOnlyFilter() {
    await this.clickElement(
      'ul[class="ember-power-select-options"] > li:nth-child(3)'
    );
  }

  async clickPaidMembersOnlyFilter() {
    await this.clickElement(
      'ul[class="ember-power-select-options"] > li:nth-child(4)'
    );
  }

  async fillExcerpt(excerpt) {
    await this.typeValue('textarea[data-test-field="custom-excerpt"]', excerpt);
  }

  async getPageUrl() {
    const selector = 'input[name="post-setting-slug"]';
    await this.page.waitForSelector(selector);
    return await getInputText(this.page, selector);
  }

  async toggleShowTitleAndFeatureImage() {
    await this.clickElement('div[class="gh-toggle-featured"]');
  }

  async checkPageTitleIsAbsent() {
    const isVisible = await isElementVisible(
      this.page,
      'h1[class^="gh-article-title"]'
    );
    assert(isVisible === false);
  }

  async toggleFeaturePage() {
    await this.clickElement('span[class="gh-toggle-featured"]');
  }

  async clickUpdateButton() {
    await waitUtil(800);
    await this.clickElement(
      'header[class^="gh-editor-header"] > section[class="gh-editor-publish-buttons"] > button[class~="gh-editor-save-trigger"]'
    );
  }

  async clickEditPageBack() {
    await this.clickElement('a[data-test-link="pages"]');
  }
}

module.exports = PagePageObject;
