const { When, Then } = require("cucumber");
const scope = require("../support/scope");

When("I click on {string}", async (post) => {
  await scope.pages.posts.createPost();
});

When("I fill title with {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("I fill description with {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("I program a post to be published later", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("I go to posts section", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("I go to scheduled posts", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("the post should be in the scheduled posts list", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});
