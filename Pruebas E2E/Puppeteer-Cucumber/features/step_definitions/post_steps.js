const { Given, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");
const assert = require("assert");

// Given

Given("I click on new post button", async () => {
  await scope.pages.posts.clickNewPostButton();
});

Given("I fill post title with {string}", async (title) => {
  await scope.pages.posts.fillPostTitle(title);
});

Given("I fill post description with {string}", async (description) => {
  await scope.pages.posts.fillPostDescription(description);
});

Given("I click on post time options", async () => {
  await scope.pages.posts.clickPostTimeOptions();
});

Given("I click on schedule for later post option", async () => {
  await scope.pages.posts.clickPostScheduleForLater();
});

Given("I click on set it live now option", async () => {
  await scope.pages.posts.clickPostSetItLiveNow();
});

Given("I upload a feature image", async () => {
  await scope.pages.posts.uploadFeatureImage("./assets/forest.jpg");
});

// Then

Then("I deploy the collapse menu of posts", async () => {
  await scope.pages.posts.deployCollapsePostsMenu();
});

Then("I go to scheduled posts", async () => {
  // Write code here that turns the phrase above into concrete actions
  await scope.pages.posts.goToScheduledPosts();
});

Then("the post {string} should be in the list", async (title) => {
  // Write code here that turns the phrase above into concrete actions
  const result = await scope.pages.posts.checkPostInList(title);
  assert(result, `The post ${title} is not in the list`);
});

Then("I go to published posts", async () => {
  // Write code here that turns the phrase above into concrete actions
  await scope.pages.posts.goToPublishedPosts();
});
