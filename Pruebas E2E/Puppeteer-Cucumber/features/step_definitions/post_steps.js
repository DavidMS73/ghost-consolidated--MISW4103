const { When, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");

// When

When("I click on new post button", async () => {
  await scope.pages.posts.clickNewPostButton();
});

When("I fill post title with {string}", async (title) => {
  await scope.pages.posts.fillPostTitle(title);
});

When("I fill post description with {string}", async (description) => {
  await scope.pages.posts.fillPostDescription(description);
});

When("I click on post time options", async () => {
  await scope.pages.posts.clickPostTimeOptions();
});

When("I click on schedule for later post option", async () => {
  await scope.pages.posts.clickPostScheduleForLater();
});

When("I click on set it live now option", async () => {
  await scope.pages.posts.clickPostSetItLiveNow();
});

When("I upload a feature image", async () => {
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
  console.assert(result, `The post ${title} is not in the list`);
});

Then("I go to published posts", async () => {
  // Write code here that turns the phrase above into concrete actions
  await scope.pages.posts.goToPublishedPosts();
});
