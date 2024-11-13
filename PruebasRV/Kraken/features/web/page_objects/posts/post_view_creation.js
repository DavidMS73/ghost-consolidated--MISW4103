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
    const element = await this.driver.$('button[data-test-button="save-custom-view"]');
    await element.click();
  }

  async assertViewIsCreated(viewName) {
    const element = await this.driver.$(`li > a[title=${viewName}] > span`);
    await element.waitForExist();
  }

  async assertCurrentView(viewName) {
    const element = await this.driver.$('h2');
    const title = await element.getText();

    assert.equal(title, viewName);
  }

  async filterByFeaturedPosts() {
    const element = await this.driver.$('div.gh-contentfilter-menu.gh-contentfilter-type > div');
    await element.click();

    await new Promise((r) => setTimeout(r, 1000));

    const featuredPostTypeElement = await this.driver.$('ul[role="listbox"] > li[data-option-index="5"]');
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

    const deleteButton = await this.driver.$('button[data-test-button="delete-custom-view"]');

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
    const element = await this.driver.$('p[data-test-error="custom-view-name"]');
    const error = await element.getText();

    assert.equal(error, 'Please enter a name');
  }

  async clickCancelViewCreationButton() {
    const element = await this.driver.$('button[data-test-button="cancel-custom-view-form"]');
    await element.click();
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