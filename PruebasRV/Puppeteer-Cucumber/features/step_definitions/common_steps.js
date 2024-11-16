const { When, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");

When("I click preview button", async () => {
  await scope.pages.common.clickPreviewButton();
});

When("I click publish button", async () => {
  await scope.pages.common.clickPublishButton();
});

When("I just wait a few seconds", async () => {
  await scope.pages.common.waitAFewSeconds();
});

When("I click confirm publish button", async () => {
  await scope.pages.common.clickConfirmPublishButton();
});

Then("I should see a toast message of {string}", async (title) => {
  await scope.pages.common.checkNewPublishModal(title);
});
