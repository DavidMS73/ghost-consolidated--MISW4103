const { Given, When, Then } = require("@cucumber/cucumber");

// When

When("I click the new page button", async function () {
  await this.pageListPO.clickNewPageButton();
});

When("I fill the page title with text {kraken-string}", async function (title) {
  await this.pageCreationPO.fillPageTitle(title);
});

When(
  "I fill the page content with text {kraken-string}",
  async function (content) {
    await this.pageCreationPO.fillPageBodyWithText(content);
  }
);

When("I click the page content", async function () {
  await this.pageCreationPO.clickPageBody();
});

When("I fill the image with an asset", async function () {
  await this.pageCreationPO.fillImageWithAsset();
});

When("I click the add button", async function () {
  await this.pageCreationPO.clickAddButton();
});

When("I click the audio button", async function () {
  await this.pageCreationPO.clickAudioButton();
});

When("I fill the audio box with a file", async function () {
  await this.pageCreationPO.fillAudio();
});

When("I click preview button", async function () {
  await this.pageCreationPO.clickPreviewButton();
});

When("I click the publish button", async function () {
  await this.pageCreationPO.clickPublishButton();
});

When("I click the continue final review button", async function () {
  await this.pageCreationPO.clickContinueFinalReviewButton();
});

When("I click the publish page button", async function () {
  await this.pageCreationPO.clickPublishPageButton();
});

When("I click the pages type filter", async function () {
  await this.pageListPO.clickPagesTypeFilter();
});

When("I click the published pages filter", async function () {
  await this.pageListPO.clickPublishedPagesFilter();
});

// Then

Then(
  "I should see title {kraken-string} and content {kraken-string} inside a modal",
  async function (title, content) {
    await this.pageListPO.checkNewPageModal(title, content);
    await this.pageListPO.clickCloseNewPageModal();
  }
);

Then(
  "I should see title {kraken-string} inside a modal",
  async function (title) {
    await this.pageListPO.checkNewPageModal(title);
    await this.pageListPO.clickCloseNewPageModal();
  }
);

Then(
  "I should see the first page with title {kraken-string}",
  async function (title) {
    await this.pageListPO.validateFirstPageTitle(title);
  }
);
