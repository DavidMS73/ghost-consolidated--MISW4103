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

  async fillDescription(desc) {
    await this.page.waitForSelector('#tag-description');
    await this.page.type('#tag-description', desc);
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillCodeInjection(header, footer) {
    await this.page.waitForSelector('#tag-setting-codeinjection-head .CodeMirror');
    await this.page.evaluate((headerContent) => {
      const editor = document.querySelector('#tag-setting-codeinjection-head .CodeMirror').CodeMirror;
      editor.setValue(headerContent);
    }, header);

    await this.page.waitForSelector('#tag-setting-codeinjection-foot .CodeMirror');
    await this.page.evaluate((footContent) => {
      const editor = document.querySelector('#tag-setting-codeinjection-foot .CodeMirror').CodeMirror;
      editor.setValue(footContent);
    }, footer);
  }

  async fillColor(color) {
    await this.page.waitForSelector('input[data-test-input="accentColor"]');
    await this.page.type('input[data-test-input="accentColor"]', color);
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillSlug(slug) {
    const selector = 'input[data-test-input="tag-slug"]';
    await this.page.waitForSelector(selector);
    await this.page.$eval(selector, el => el.value = '');
    await this.page.type(selector, slug);
    await waitUtil(500);
  }

  async uploadImage(route) {
    // Espera a que el botón "Add feature image" esté disponible en la página
    await this.page.waitForSelector(".x-file-input");

    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click(".x-file-input"),
    ]);

    await fileChooser.accept([route]);

    // Espera para que la carga de la imagen se complete
    await waitUtil(1000);
  }

  async clickSaveTagButton() {
    await this.page.waitForSelector('button[data-test-button="save"]');
    await this.page.click('button[data-test-button="save"]');
    await new Promise((r) => setTimeout(r, 500));
  }

  async clickDeleteTagButton() {
    await this.page.waitForSelector('button[data-test-button="delete-tag"]');
    await this.page.click('button[data-test-button="delete-tag"]');
    await new Promise((r) => setTimeout(r, 500));
  }

  async clickDeleteTagButtonInConfirmationModal() {
    await this.page.waitForSelector('button[data-test-button="confirm"]');
    await this.page.click('button[data-test-button="confirm"]');
    await new Promise((r) => setTimeout(r, 500));
  }

  async clickCancelDeleteTagButtonInConfirmationModal() {
    await this.page.waitForSelector('button[data-test-button="cancel"]');
    await this.page.click('button[data-test-button="cancel"]');
    await new Promise((r) => setTimeout(r, 500));
  }

  async goToTagsList(kind) {
    await this.page.waitForSelector('a[href="#/tags/"]');
    await this.page.click('a[href="#/tags/"]');
    await new Promise((r) => setTimeout(r, 500));

    if (kind === 'internal') {
      await this.page.waitForSelector('button[data-test-tags-nav="internal"]');
      await this.page.click('button[data-test-tags-nav="internal"]');
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  async checkTagInTitle(title) {
    await this.page.waitForSelector('h2[data-test-screen-title]');
    const titleText = await this.page.$eval('h2[data-test-screen-title]', e => e.innerText);
    return titleText === title;
  }

  async expandMetadataSection(metadataSection) {
    let metadataSectionSelectorIndex = 0;

    switch (metadataSection) {
      case 'tag':
        metadataSectionSelectorIndex = 1;
        break;
      case 'X':
        metadataSectionSelectorIndex = 2;
        break;
      case 'facebook':
        metadataSectionSelectorIndex = 3;
        break;
      case 'code injection':
        metadataSectionSelectorIndex = 4;
        break;
    };

    const selector = 'section > div:nth-child(' + metadataSectionSelectorIndex + ') > div.gh-expandable-header > button';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillMetadataTitleAndDescription(metadataSection, metadatdaTitle, metadataDescription) {
    let titleSelector = '';
    let descriptionSelector = '';

    switch (metadataSection) {
      case 'tag':
        titleSelector = '#meta-title';
        descriptionSelector = '#meta-description';
        break;
      case 'X':
        titleSelector = '#twitter-title';
        descriptionSelector = '#twitter-description';
        break;
      case 'facebook':
        titleSelector = '#og-title';
        descriptionSelector = '#og-description';
        break;
    };

    await this.page.waitForSelector(titleSelector);
    await this.page.type(titleSelector, metadatdaTitle);
    await this.page.waitForSelector(descriptionSelector);
    await this.page.type(descriptionSelector, metadataDescription);
    await new Promise((r) => setTimeout(r, 500));
  }

  async clickTagNameInList(tagName) {
    await this.page.waitForSelector("h3.gh-tag-list-name");
    const h3Titles = await this.page.$$("h3.gh-tag-list-name");
    for (const h3Title of h3Titles) {
      const title = await this.page.evaluate((h3) => h3.innerText, h3Title);
      if (title === tagName){
        await h3Title.click();
        await new Promise((r) => setTimeout(r, 500));
        break;
      }
    }
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

  async checkTagListIsEmpty() {
    await this.page.waitForSelector(".no-posts-box");
    const h3Titles = await this.page.$$(".no-posts-box");
    return h3Titles.length === 1;
  }

  async checkErrorInTagNameIfEmpty(name) {
    await this.page.waitForSelector("span.error p.response");
    const errorText = await this.page.$eval("span.error p.response", e => e.innerText);
    return name === '' && errorText === "You must specify a name for the tag.";
  }

  async checkErrorInTagDescriptionIfEmpty(desc) {
    await this.page.waitForSelector("div.form-group.error p.response");
    const errorText = await this.page.$eval("div.form-group.error p.response", e => e.innerText);
    return errorText === "Description cannot be longer than 500 characters.";
  }

  async checkCharCounterInDescriptionField(lengthToCheck) {
    await this.page.waitForSelector("div.form-group.success span.word-count");
    const wordCount = await this.page.$eval("div.form-group.success span.word-count", e => e.innerText);
    return parseInt(wordCount) > lengthToCheck;
  }

  async validateRelatedPosts(tagName, numberOfRelatedPosts) {
    const selector = 'ol.tags-list > li.gh-tags-list-item > a.gh-tag-list-posts-count > span';
    await this.page.waitForSelector(selector);
    const spanCounts = await this.page.$$(selector);

    for (const spanCount of spanCounts) {
      const numberOfPosts = await this.page.evaluate(h3 => h3.innerText, spanCount);
      console.log(`title: [${numberOfPosts}]`);
      assert(numberOfPosts == numberOfRelatedPosts + ' posts');
      break;
    }
  }

  async checkFacebookPreviewWidget(title, desc, socialNetwork) {

    let titleSelector = '';
    let descSelector = '';

    switch (socialNetwork) {
      case 'facebook':
        titleSelector = 'div.gh-social-og-preview-title';
        descSelector = 'div.gh-social-og-preview-desc';
        break;
      case 'X':
        titleSelector = 'div.gh-social-twitter-preview-title';
        descSelector = 'div.gh-social-twitter-preview-desc';
        break;
    };

    await new Promise((r) => setTimeout(r, 500));
    await this.page.waitForSelector(titleSelector);
    await this.page.waitForSelector(descSelector);
    const titleText = await this.page.$eval(titleSelector, e => e.innerText);
    const descText = await this.page.$eval(descSelector, e => e.innerText);
    return titleText === title && descText === desc;
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