const { Given } = require("@cucumber/cucumber");

// Given

Given("I click the pages button", async function () {
  await this.sideBarPO.clickSideBarPagesSection();
});

Given("I click the tags button", async function () {
  await this.sideBarPO.clickSideBarTagsSection();
});

Given("I click the posts button", async function () {
  await this.sideBarPO.clickSideBarPostsSection();
});

Given("I click the members button", async function () {
  await this.sideBarPO.clickSideBarMembersSection();
});
