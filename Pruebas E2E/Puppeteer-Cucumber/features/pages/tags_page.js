const { waitUtil } = require('../utils/utils');
const assert = require('assert');

class TagsPageObject {
  constructor(page) {
    this.page = page;
  }

  async clickCreateTagButton() {
    await this.page.waitForSelector('a[href="#/tags/new/"]');
    await this.page.click('a[href="#/tags/new/"]');
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillName(title) {
    await this.page.waitForSelector('#tag-name');
    await this.page.type('#tag-name', title);
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillSlug(slug) {
    const selector = 'input[data-test-input="tag-slug"]';
    await this.page.waitForSelector(selector);
    await this.page.$eval(selector, el => el.value = '');
    await this.page.type(selector, slug);
    await waitUtil(500);
  }

  async clickSaveTagButton() {
    await this.page.waitForSelector('button[data-test-button="save"]');
    await this.page.click('button[data-test-button="save"]');
    await new Promise((r) => setTimeout(r, 500));
  }

  async goToTagsList() {
    await this.page.waitForSelector('a[href="#/tags/"]');
    await this.page.click('a[href="#/tags/"]');
    await new Promise((r) => setTimeout(r, 500));
  }

  async checkTagInTitle(title) {
    await this.page.waitForSelector('h2[data-test-screen-title]');
    const titleText = await this.page.$eval('h2[data-test-screen-title]', e => e.innerText);
    return titleText === title;
  }

  async expandMetadataSection() {
    const selector = 'section > div:nth-child(1) > div.gh-expandable-header > button';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillMetadataTitleAndDescription(metadatdaTitle, metadataDescription) {
    await this.page.waitForSelector('#meta-title');
    await this.page.type('#meta-title', metadatdaTitle);
    await this.page.waitForSelector('#meta-description');
    await this.page.type('#meta-description', metadataDescription);
    await new Promise((r) => setTimeout(r, 500));
  }

  async checkTagInList(titleParam) {
    await this.page.waitForSelector("h3.gh-tag-list-name");
    const h3Titles = await this.page.$$("h3.gh-tag-list-name");
    for (const h3Title of h3Titles) {
      const title = await this.page.evaluate((h3) => h3.innerText, h3Title);
      if (title === titleParam) return true;
    }

    return false;
  }
  
  async validateTagSlug({
    tagName, tagSlug
  }) {
    const selector = 'ol[class^="tags-list"] > li > a:nth-child(1) > h3';
    await this.page.waitForSelector(selector);
    const h3Titles = await this.page.$$(selector);
    let containsName = false;
    for (const h3Title of h3Titles) {
      const title = await this.page.evaluate(h3 => h3.innerText, h3Title);
      if (title === tagName) {
        containsName = true;
        const parentLink = await h3Title.getProperty('parentNode');
        const parentList = await parentLink.getProperty('parentNode');
        const slugSpan = await parentList.$('a:nth-child(2) > span');
        const slugText = await this.page.evaluate(sp => sp.getAttribute('title'), slugSpan);
        assert(slugText.startsWith(tagSlug));
      }
    }
    assert(containsName);
  }

  async validateTagNameIsInTagListNTimes(tagName, times) {
    const selector = 'ol[class^="tags-list"] > li > a:nth-child(1) > h3';
    await this.page.waitForSelector(selector);
    const h3Titles = await this.page.$$(selector);
    let counter = 0;
    for (const h3Title of h3Titles) {
      const title = await this.page.evaluate(e => e.innerText, h3Title);
      if (title === tagName) counter++;
    }
    assert(counter >= times);
  }
}

module.exports = TagsPageObject;