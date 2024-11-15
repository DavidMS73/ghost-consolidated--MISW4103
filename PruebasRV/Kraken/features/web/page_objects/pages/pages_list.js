const { BasePageObject } = require("../base_page_object");
const { assert } = require("chai");

class PagesListPageObject extends BasePageObject {
  async clickNewPageButton() {
    const element = await this.driver.$('a[href="#/editor/page/"]');
    await element.click();
  }

  async validateFirstPageTitle(title) {
    const selector = 'ol[class^="gh-list"] > li:nth-child(2) > a:nth-child(1) > h3';
    const element = await this.driver.$(selector);
    const text = await element.getText();
    assert.equal(text, title);
  }

  async clickPagesTypeFilter() {
    const element = await this.driver.$(
      'div[class~="view-actions-bottom-row"] > div[class~="gh-contentfilter-type"]'
    );
    await element.click();
  }

  async clickPublishedPagesFilter() {
    const element = await this.driver.$('ul[role="listbox"] > li:nth-child(3)');
    await element.click();
  }

  async clickFirstPage() {
    const selector = 'ol[class^="gh-list"] > li:nth-child(2) > a:nth-child(1)';
    const element = await this.driver.$(selector);
    await element.click();
  }
}

module.exports = { PagesListPageObject };
