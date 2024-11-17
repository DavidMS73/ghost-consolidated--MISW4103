const { Given, Then } = require("@cucumber/cucumber");

// Given

Given("I click the new page button", async function () {
  await this.pageListPO.clickNewPageButton();
});

Given(
  "I fill the page title with text {kraken-string}",
  async function (title) {
    await this.pageCreationPO.fillPageTitle(title);
  }
);

Given(
  "I fill the page content with text {kraken-string}",
  async function (content) {
    await this.pageCreationPO.fillPageBodyWithText(content);
  }
);

Given("I click the page content", async function () {
  await this.pageCreationPO.clickPageBody();
});

Given("I fill the image with an asset", async function () {
  await this.pageCreationPO.fillImageWithAsset();
});

Given("I click the add button", async function () {
  await this.pageCreationPO.clickAddButton();
});

Given("I click the audio button", async function () {
  await this.pageCreationPO.clickAudioButton();
});

Given("I fill the audio box with a file", async function () {
  await this.pageCreationPO.fillAudio();
});

Given("I click the pages type filter", async function () {
  await this.pageListPO.clickPagesTypeFilter();
});

Given("I click the published pages filter", async function () {
  await this.pageListPO.clickPublishedPagesFilter();
});

Given("I click gear button", async function () {
  await this.pageCreationPO.clickGearButton();
});

Given("I fill page URL with value {kraken-string}", async function (url) {
  await this.pageCreationPO.fillPageUrl(url.toLowerCase());
});

// Then

Then(
  "I should see the first page with title {kraken-string}",
  async function (title) {
    await this.pageListPO.validateFirstPageTitle(title);
  }
);

Then(
  "I navigate to created page {kraken-string} with base url {kraken-string}",
  async function (pageUrlStr, baseUrlStr) {
    const baseUrl = new URL(baseUrlStr);
    await this.pageListPO.navToPageSite({
      pageUrl: pageUrlStr,
      baseUrl: baseUrl.origin,
    });
  }
);

Then("I validate title {kraken-string} in page view", async function (title) {
  await this.pageViewPO.validatePageTitle(title);
});

Then(
  "I validate content {kraken-string} in page view",
  async function (content) {
    await this.pageViewPO.validatePageContent(content);
  }
);

Then("I click first page", async function () {
  await this.pageListPO.clickFirstPage();
});

Then("I click delete page", async function () {
  await this.pageCreationPO.clickDeletePage();
});

Then("I click delete button", async function () {
  await this.pageCreationPO.clickDeleteButton();
});
