const { When, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");

// When

When("I click on new page button", async () => {
  await scope.pages.pages.createPage();
});

When("I fill the page title with text {string}", async (title) => {
  await scope.pages.pages.fillTitle(title);
});

When("I click the page content", async () => {
  await scope.pages.pages.clickPageBody();
});

When("I click preview button", async () => {
  await scope.pages.pages.clickPreviewButton();
});

When("I click publish button", async () => {
  await scope.pages.pages.clickPublishPage();
});

When("I click continue final review button", async () => {
  await scope.pages.pages.clickContinueFinalReviewButton();
});

When("I click confirm publish page button", async () => {
  await scope.pages.pages.clickConfirmPublishButton();
});

// Then

Then("I should see title {string} inside a modal", async (title) => {
  await scope.pages.pages.checkNewPageModal(title);
  await scope.pages.pages.clickCloseNewPageModal(title);
});
