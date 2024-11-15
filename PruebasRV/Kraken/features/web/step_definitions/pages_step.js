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

When(
  "I click publish menu",
  async function () {
    await this.pageCreationPO.clickPublishMenu();
  }
);

When('I click publish page button', async function () {
  await this.pageCreationPO.clickPublishButton();
});

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

When("I click the pages type filter", async function () {
  await this.pageListPO.clickPagesTypeFilter();
});

When("I click the published pages filter", async function () {
  await this.pageListPO.clickPublishedPagesFilter();
});

// Then

Then(
  "I should see the first page with title {kraken-string}",
  async function (title) {
    await this.pageListPO.validateFirstPageTitle(title);
  }
);

Then(
  "I click first page",
  async function () {
    await this.pageListPO.clickFirstPage();
  }
);

Then(
  "I click gear button",
  async function () {
    await this.pageCreationPO.clickGearButton();
  }
)

Then(
  "I click delete page",
  async function () {
    await this.pageCreationPO.clickDeletePage();
  }
)

Then(
  "I click delete button",
  async function () {
    await this.pageCreationPO.clickDeleteButton();
  }
)
