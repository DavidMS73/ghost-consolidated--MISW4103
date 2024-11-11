const { Given, When, Then } = require("@cucumber/cucumber");

// When

When("I click preview button", async function () {
  await this.commonPO.clickPreviewButton();
});

When("I click publish button", async function () {
  await this.commonPO.clickPublishButton();
});

When("I click continue final review button", async function () {
  await this.commonPO.clickContinueFinalReviewButton();
});

When("I click confirm publish button", async function () {
  await this.commonPO.clickConfirmPublishButton();
});

// Then

Then(
  "I should see title {kraken-string} inside a modal",
  async function (title) {
    await this.commonPO.checkNewPublishModal(title);
    await this.commonPO.clickCloseNewPublishModal();
  }
);

Then(
  "I should see title {kraken-string} and content {kraken-string} inside a modal",
  async function (title, content) {
    await this.commonPO.checkNewPublishModal(title, content);
    await this.commonPO.clickCloseNewPublishModal();
  }
);

Then(
  "I should see title {kraken-string} and a image inside the modal",
  async function (title) {
    await this.commonPO.checkNewPublishModal(title, null, true);
    await this.commonPO.clickCloseNewPublishModal();
  }
);
