const { When, Then, Given } = require("@cucumber/cucumber");
const scope = require("../support/scope");

Given("I click preview button", async () => {
  await scope.pages.common.clickPreviewButton();
});

Given("I click publish button", async () => {
  await scope.pages.common.clickPublishButton();
});

Given("I click continue final review button", async () => {
  await scope.pages.common.clickContinueFinalReviewButton();
});

// When
When("I click confirm publish button", async () => {
  await scope.pages.common.clickConfirmPublishButton();
});

// Then

Then("I should see title inside a modal", async () => {
  const { title } = scope.variables;
  await scope.pages.common.checkNewPublishModal(title);
  await scope.pages.common.clickCloseNewPublishModal(title);
});

Then("I should see title and content inside a modal", async () => {
  const { postTitle, postDescription } = scope.variables;
  await scope.pages.common.checkNewPublishModal(postTitle, postDescription);
  await scope.pages.common.clickCloseNewPublishModal();
});

Then(
  "I should see title {string} and a image inside the modal",
  async (title) => {
    await scope.pages.common.checkNewPublishModal(title, null, true);
    await scope.pages.common.clickCloseNewPublishModal();
  }
);
