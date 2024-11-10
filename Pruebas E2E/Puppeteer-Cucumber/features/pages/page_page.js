const { getText } = require("../utils/utils");
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
