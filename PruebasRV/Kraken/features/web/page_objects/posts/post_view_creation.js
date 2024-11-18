const { BasePageObject } = require("../base_page_object");
const { assert } = require('chai');

class PostViewCreationPageObject extends BasePageObject {
  async clickCreateViewButton() {
    const element = await this.driver.$('button.gh-btn-save-view');
    await element.click();
  }

  async fillViewNameField(viewName) {
    const element = await this.driver.$('input#view-name');
    await element.setValue(viewName);
  }

  async clickSaveViewButton() {
    const element = await this.driver.$('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view');
    await element.click();
  }

  async assertViewIsCreated(viewName) {
    const element = await this.driver.$(`li > a[title=${viewName}] > span`);
    await element.waitForExist();
  }

  async assertCurrentView(viewName) {
    const titleSelector = 'h2 > span';
    const h2titles = await this.driver.$$(titleSelector);

    for (const h2title of h2titles) {
      const title = await h2title.getText();
      if (title === viewName) return true;
    }

    assert.fail("Title not found");
  }

  async filterByFeaturedPosts() {
    const element = await this.driver.$('div.gh-contentfilter-menu.gh-contentfilter-type > div');
    await element.click();

    await new Promise((r) => setTimeout(r, 1000));

    const featuredPostTypeElement = await this.driver.$('ul[role="listbox"] > li[data-option-index="4"]');
    await featuredPostTypeElement.click();
  }

  async filterByPublicPosts() {
    const element = await this.driver.$('div.gh-contentfilter-menu.gh-contentfilter-visibility > div');
    await element.click();

    await new Promise((r) => setTimeout(r, 1000));

    const publicPostTypeElement = await this.driver.$('ul[role="listbox"] > li[data-option-index="1"]');
    await publicPostTypeElement.click();
  }

  async validateFeaturedPostsViewDoesNotExist() {
    await this.filterByFeaturedPosts();
    await new Promise((r) => setTimeout(r, 1000));
    await this.clickCreateViewButton();
    await new Promise((r) => setTimeout(r, 1000));

    const deleteButton = await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon');

    if (deleteButton.error) {
      const closeButton = await this.driver.$('button.close');
      await closeButton.click();
      return;

    }

    await deleteButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.filterByFeaturedPosts();
  }

  async assertViewNameRequiredError() {
    const element = await this.driver.$('p.response');
    const error = await element.getText();

    assert.equal(error, 'Please enter a name');
  }

  async clickCancelViewCreationButton() {
    const buttons = await this.driver.$$('button > span');

    for (const button of buttons) {
      const buttonText = await button.getText();

      if (buttonText === "Cancel") {
        await button.click();
        return;
      }
    }
  }

  async assertViewCreationModalIsHidden() {
    const element = await this.driver.$('div.modal-content');
    const isDisplayed = await element.isDisplayed();

    assert.isFalse(isDisplayed);
  }

  async assertCreateViewButtonExists() {
    const element = await this.driver.$('button.gh-btn-save-view');
    const isDisplayed = await element.isDisplayed();

    assert.isTrue(isDisplayed);
  }
}

module.exports = { PostViewCreationPageObject };