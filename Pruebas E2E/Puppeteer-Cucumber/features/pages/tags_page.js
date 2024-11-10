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
}

module.exports = TagsPageObject;