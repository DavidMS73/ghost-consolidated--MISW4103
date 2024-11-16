const { Given, When, Then } = require("@cucumber/cucumber");

// When

When("I click preview button", async function () {
  await this.commonPO.clickPreviewButton();
});

When("I click publish button", async function () {
  await this.commonPO.clickPublishButton();
});

When("I just wait a few seconds", async function () {
  await this.commonPO.waitAFewSeconds();
});

When("I click confirm publish button", async function () {
  await this.commonPO.clickConfirmPublishButton();
});

// Then

Then("I should see a toast message of {kraken-string}", async function (title) {
  await this.commonPO.checkNewPublishModal(title);
});
