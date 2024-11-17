const { When, Then } = require("@cucumber/cucumber");
const { assert } = require("chai");

// Given

Given("I click on new post button", async function () {
  await this.postListPO.clickNewPostButton();
});

Given("I fill post title with {kraken-string}", async function (title) {
  await this.postCreationPO.fillPostTitle(title);
});

Given(
  "I fill post description with {kraken-string}",
  async function (description) {
    await this.postCreationPO.fillPostDescription(description);
  }
);

Given("I click on post time options", async function () {
  await this.postCreationPO.clickPostTimeOptions();
});

Given("I click on schedule for later post option", async function () {
  await this.postCreationPO.clickPostScheduleForLater();
});

Given("I click on set it live now option", async function () {
  await this.postCreationPO.clickPostSetItLiveNow();
});

Given("I upload a feature image", async function () {
  await this.postCreationPO.uploadFeatureImage(
    "./assets/Nissan-Skyline-GT-R-R32.jpg"
  );
});

// Then

Then("I deploy the collapse menu of posts", async function () {
  await this.postListPO.deployCollapsePostsMenu();
});

Then("I go to scheduled posts", async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.postListPO.goToScheduledPosts();
});

Then("the post {kraken-string} should be in the list", async function (title) {
  // Write code here that turns the phrase above into concrete actions
  const result = await this.postListPO.checkPostInList(title);
  assert(result, `The post ${title} is not in the list`);
});

Then("I go to published posts", async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.postListPO.goToPublishedPosts();
});
