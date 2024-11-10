const { wait, getText } = require('../utils/utils')
const assert = require('assert');

class PagePageObject {
  pageBodySelector = 'div[class^="koenig-react-editor"] > div:nth-child(1) > div:nth-child(1) > div[data-kg="editor"]';

  constructor(page) {
    this.page = page;
  }

  async clickNewPageButton() {
    const selector = 'a[href="#/editor/page/"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await wait(500);
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
    await wait(500);
  }

  async fillPageBodyWithText(text) {
    const selector = this.pageBodySelector;
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await this.page.type(selector, text);
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
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await wait(1500);
  }

  async clickPublishPageButton() {
    const selector = 'button[data-test-button="confirm-publish"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await wait(500);
  }

  async checkNewPageModal(title, content) {
    const titleSelector = 'div[class="modal-body"] > h2';
    await this.page.waitForSelector(titleSelector);
    const titleElementText = await getText(this.page, titleSelector);
    assert(titleElementText === title);

    if (!content) return;
    const contentSelector = 'div[class="modal-body"] > p[class="post-excerpt"]';
    await this.page.waitForSelector(contentSelector);
    const contentElementText = await getText(this.page, contentSelector);
    assert(contentElementText === content);
  }

  async clickCloseNewPageModal() {
    const selector = 'button[data-test-button="close-publish-flow"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await wait(500);
  }

  async clickPagesTypeFilter() {
    const selector = 'div[class~="view-actions-bottom-row"] > div[class~="gh-contentfilter-type"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await wait(500);
  }

  async clickPublishedPagesFilter() {
    const selector = 'ul[role="listbox"] > li:nth-child(3)';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await wait(500);
  }

  async validateFirstPageTitle(title) {
    const selector = 'div[class^="posts-list"] > div:nth-child(1) > li > a:nth-child(1) > h3';
    await this.page.waitForSelector(selector);
    const text = (await getText(this.page, selector)).trim();
    assert(text === title);
  }
}

module.exports = PagePageObject;
