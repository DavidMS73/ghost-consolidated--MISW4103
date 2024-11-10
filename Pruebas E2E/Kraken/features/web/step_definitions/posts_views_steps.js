const { When, Then } = require("@cucumber/cucumber");

When('I click on create view button', async function () {
  await this.postViewCreationPO.clickCreateViewButton();
});

When('I fill the view name field with {kraken-string}', async function (viewName) {
  await this.postViewCreationPO.fillViewNameField(viewName);
});

When('I click on save view button', async function () {
  await this.postViewCreationPO.clickSaveViewButton();
});

When('I filter by featured posts', async function () {
  await this.postViewCreationPO.filterByFeaturedPosts();
});

When('view of featured posts should not exist', async function () {
  await this.postViewCreationPO.validateFeaturedPostsViewDoesNotExist();
});

When('I click on cancel view creation button', async function () {
  await this.postViewCreationPO.clickCancelViewCreationButton();
});

When('I filter by public posts', async function () {
  await this.postViewCreationPO.filterByPublicPosts();
});

Then('view should appear in sidebar under posts section with name {kraken-string}', async function (viewName) {
  await this.postViewCreationPO.assertViewIsCreated(viewName);
});

Then('current view should be {kraken-string}', async function (viewName) {
  await this.postViewCreationPO.assertCurrentView(viewName);
});

Then('an error should appear indicating that the view name is required', async function () {
  await this.postViewCreationPO.assertViewNameRequiredError();
});

Then('view creation modal should hide', async function () {
  await this.postViewCreationPO.assertViewCreationModalIsHidden();
});

Then('create view button should exist', async function () {
  await this.postViewCreationPO.assertCreateViewButtonExists();
});