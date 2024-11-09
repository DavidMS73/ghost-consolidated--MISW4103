const { When, Then } = require("cucumber");
const scope = require("../support/scope");

When("I click on {string}", async (post) => {
  await scope.pages.posts.createPost();
});

When("I fill title with {string}", async (title) => {
  await scope.pages.posts.fillTitle(title);
});

When("I fill description with {string}", async (description) => {
  await scope.pages.posts.fillDescription(description);
});

When("I click on publish post button", async () => {
  await scope.pages.posts.clickPublishPost();
});

When("I program a post to be published later", async () => {
  await scope.pages.posts.publishPostLater();
});

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
