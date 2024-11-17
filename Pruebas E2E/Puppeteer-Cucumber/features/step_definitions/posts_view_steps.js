const { When, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");

// Given
Given("I filter by featured posts", async () => {
  await scope.pages.postsView.filterByFeaturedPosts();
});

Given("view of featured posts should not exist", async () => {
  await scope.pages.postsView.validateFeaturedPostsViewDoesNotExist();
});

Given("I click on create view button", async () => {
  await scope.pages.postsView.clickCreateViewButton();
});

Given("I fill the view name field with {string}", async (viewName) => {
  await scope.pages.postsView.fillViewName(viewName);
});

// When

When("I click on save view button", async () => {
  await scope.pages.postsView.clickSaveViewButton();
});

When("I click on cancel view creation button", async () => {
  await scope.pages.postsView.clickCancelViewCreationButton();
});

When("I filter by public posts", async () => {
  await scope.pages.postsView.filterByPublicPosts();
});

// Then

Then(
  "view should appear in sidebar under posts section with name {string}",
  async (viewName) => {
    await scope.pages.postsView.assertViewIsCreated(viewName);
  }
);

Then("current view should be {string}", async (viewName) => {
  await scope.pages.postsView.assertCurrentView(viewName);
});

Then(
  "an error should appear indicating that the view name is required",
  async () => {
    await scope.pages.postsView.assertViewNameRequiredError();
  }
);

Then("view creation modal should hide", async () => {
  await scope.pages.postsView.assertViewCreationModalIsHidden();
});

Then("create view button should exist", async () => {
  await scope.pages.postsView.assertCreateViewButtonExists();
});
