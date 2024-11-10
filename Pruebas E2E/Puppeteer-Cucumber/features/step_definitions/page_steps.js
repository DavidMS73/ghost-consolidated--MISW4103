const { When, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");

// When

When("I click on new page button", async function () {
  await scope.pages.pages.clickNewPageButton();
});

When("I fill the page title with text {string}", async (title) => {
  await scope.pages.pages.fillPageTitle(title);
});

When("I click the page content", async () => {
  await scope.pages.pages.clickPageBody();
});

When('I fill the image with an asset', async function() {
  await scope.pages.pages.fillImageWithAsset();
});

When('I click the add button', async function() {
  await scope.pages.pages.clickAddButton();
});

When('I click the audio button', async function() {
  await scope.pages.pages.clickAudioButton();
});

When("I fill the page content with text {string}", async function (content) {
  await scope.pages.pages.fillPageBodyWithText(content);
});

When("I click preview button", async () => {
  await scope.pages.pages.clickPreviewButton();
});

When("I click publish button", async () => {
  await scope.pages.pages.clickPublishButton();
});

When("I click continue final review button", async () => {
  await scope.pages.pages.clickContinueFinalReviewButton();
});

When("I click confirm publish page button", async () => {
  await scope.pages.pages.clickConfirmPublishButton();
});

When("I click the pages type filter", async function () {
  await scope.pages.pages.clickPagesTypeFilter();
});

When("I click the published pages filter", async function () {
  await scope.pages.pages.clickPublishedPagesFilter();
});

// Then

Then("I should see title {string} inside a modal", async (title) => {
  await scope.pages.pages.checkNewPageModal(title);
  await scope.pages.pages.clickCloseNewPageModal(title);
});

Then(
  "I should see title {string} and content {string} inside a modal",
  async function (title, context) {
    await scope.pages.pages.checkNewPageModal(title, context);
    await scope.pages.pages.clickCloseNewPageModal();
  }
);

Then("I should see the first page with title {string}", async function (title) {
  await scope.pages.pages.validateFirstPageTitle(title);
});
