const { waitUtil, getText } = require("../utils/utils");
const assert = require("assert");

class PostsViewPageObject {
  constructor(page) {
    this.page = page;
  }

  async filterByFeaturedPosts() {
    const postTypeSelector = 'div.gh-contentfilter-menu.gh-contentfilter-type > div';
    const featuredPostTypeSelector = 'ul[role="listbox"] > li[data-option-index="4"]';

    await this.page.waitForSelector(postTypeSelector);
    await this.page.click(postTypeSelector);
    await waitUtil(500);

    await this.page.waitForSelector(featuredPostTypeSelector);
    await this.page.click(featuredPostTypeSelector);
    await waitUtil(500);
  }

  async filterByPublicPosts() {
    const postVisibilitySelector = 'div.gh-contentfilter-menu.gh-contentfilter-visibility > div';
    const publicPostVisibilitySelector = 'ul[role="listbox"] > li[data-option-index="1"]';

    await this.page.waitForSelector(postVisibilitySelector);
    await this.page.click(postVisibilitySelector);
    await waitUtil(500);

    await this.page.waitForSelector(publicPostVisibilitySelector);
    await this.page.click(publicPostVisibilitySelector);
    await waitUtil(500);
  }

  async clickCreateViewButton() {
    const createViewButtonSelector = 'button.gh-btn-save-view';

    await this.page.waitForSelector(createViewButtonSelector);
    await this.page.click(createViewButtonSelector);
    await waitUtil(1000);
  }

  async validateFeaturedPostsViewDoesNotExist() {
    await this.filterByFeaturedPosts();
    await this.clickCreateViewButton();

    await this.page.waitForSelector('section.modal-content');
    const deleteButton = await this.page.$('button.gh-btn.gh-btn-red.gh-btn-icon');

    if (!deleteButton) {
      const closeButton = await this.page.$('button.close');
      await closeButton.click();
      await waitUtil(500);
      return;
    }

    await deleteButton.click();
    await waitUtil(500);
    await this.filterByFeaturedPosts();
    await waitUtil(500);
  }

  async fillViewName(viewName) {
    const viewNameSelector = 'input#view-name';

    await this.page.waitForSelector(viewNameSelector);
    await this.page.type(viewNameSelector, viewName);

    await waitUtil(500);
  }

  async clickSaveViewButton() {
    const saveViewButtonSelector = 'button.gh-btn.gh-btn-black.gh-btn-icon.ember-view';

    await this.page.waitForSelector(saveViewButtonSelector);
    await this.page.click(saveViewButtonSelector);
    await waitUtil(500);
  }

  async assertViewIsCreated(viewName) {
    const viewSelector = `li > a[title=${viewName}] > span`;

    await this.page.waitForSelector(viewSelector);
  }

  async assertCurrentView(viewName) {
    const titleSelector = 'h2 > span';
    const h2titles = await this.page.$$(titleSelector);

    for (const h2title of h2titles) {
      const title = await this.page.evaluate((h2) => h2.innerText, h2title);
      if (title === viewName) return true;
    }

    assert.fail("Title not found");
  }

  async assertViewNameRequiredError() {
    const errorSelector = 'p.response';
    await this.page.waitForSelector(errorSelector);
    const errorElements = await this.page.$$(errorSelector);

    for (const element of errorElements) {
      const error = await this.page.evaluate((el) => el.innerText, element);
      if (error === 'Please enter a name') return true;
    }

    assert.fail("Error message not found");
  }

  async clickCancelViewCreationButton() {
    await this.page.waitForSelector('button > span');

    const buttons = await this.page.$$('button > span');

    for (const button of buttons) {
      const buttonText = await this.page.evaluate((button) => button.textContent.trim(), button);

      if (buttonText === "Cancel") {
        await button.click();
        return;
      }
    }
  }

  async assertViewCreationModalIsHidden() {
    const createViewModalSelector = 'div.modal-content';

    const createViewModal = await this.page.$(createViewModalSelector);

    assert.equal(createViewModal, null);
  }

  async assertCreateViewButtonExists() {
    const createViewButtonSelector = 'button.gh-btn-save-view';

    await this.page.waitForSelector(createViewButtonSelector);
  }
}

module.exports = PostsViewPageObject;
