const { Given, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");
const assert = require("assert");
const { dataProcessor, formatString, waitUtil } = require("../utils/utils");

// Given

Given("I click on new post button", async () => {
  await scope.pages.posts.clickNewPostButton();
});

Given("I fill post title with {string}", async (title) => {
  const processed = dataProcessor(title);
  scope.variables.postTitle = processed;
  await scope.pages.posts.fillPostTitle(processed);
});

Given("I fill post description with {string}", async (description) => {
  const processed = dataProcessor(description);
  scope.variables.postDescription = formatString(processed);
  await scope.pages.posts.fillPostDescription(processed);
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

Given("I click on the post created to edit", async () => {
  await scope.pages.posts.clickPostCreated();
});

Given("I delete post existing title", async () => {
  await scope.pages.posts.deletePostExistingTitle();
});

Given("I change post title with {string}", async (title) => {
  const processed = dataProcessor(title);
  scope.variables.newPostTitle = processed;
  await scope.pages.posts.fillPostTitle(processed);
});

Given("I complement post description with {string}", async (description) => {
  const processed = dataProcessor(description);
  scope.variables.newPostDescription = formatString(processed);
  await scope.pages.posts.fillPostDescription(processed);
});

// Then

Then("I deploy the collapse menu of posts", async () => {
  await scope.pages.posts.deployCollapsePostsMenu();
});

Then("I go to scheduled posts", async () => {
  // Write code here that turns the phrase above into concrete actions
  await scope.pages.posts.goToScheduledPosts();
});

Then("the post created should be in the list", async () => {
  const { postTitle } = scope.variables;
  // Write code here that turns the phrase above into concrete actions
  const result = await scope.pages.posts.checkPostInList(postTitle);
  assert(result, `The post ${postTitle} is not in the list`);
});

Then("the post \\(Untitled) should be in the list", async () => {
  // Write code here that turns the phrase above into concrete actions
  const result = await scope.pages.posts.checkPostInList("(Untitled)");
  assert(result, `The post (Untitled) is not in the list`);
});

Then("I go to published posts", async () => {
  // Write code here that turns the phrase above into concrete actions
  await scope.pages.posts.goToPublishedPosts();
});

Then("the post updated should be in the list", async () => {
  const { newPostTitle, postTitle } = scope.variables;
  // Write code here that turns the phrase above into concrete actions
  const result1 = await scope.pages.posts.checkPostInList(newPostTitle);
  const result2 = await scope.pages.posts.checkPostInList(postTitle);
  assert(result1, `The post ${newPostTitle} is not in the list`);
  assert(!result2, `The post ${postTitle} should not be in the list`);
});
