const { When } = require("@cucumber/cucumber");

When("I click the pages button", async function () {
  await this.sideBarPO.clickSideBarPagesSection();
});

When("I click the tags button", async function () {
  await this.sideBarPO.clickSideBarTagsSection();
});

When("I click the posts button", async function () {
  await this.sideBarPO.clickSideBarPostsSection();
});

When('I click the members button', async function() {
  await this.sideBarPO.clickSideBarMembersSection();
});
