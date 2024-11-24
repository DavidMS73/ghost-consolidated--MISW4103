const scope = require("../support/scope");
const { Given } = require("@cucumber/cucumber");

// Given

Given("I navigate to {string} section", async (section) => {
  await scope.pages.sidebar.navigateTo(section);
});

Given("I click on my profile picture", async () => {
  await scope.pages.sidebar.clickProfilePicture();
});

Given("I click on Your Profile", async () => {
  await scope.pages.sidebar.clickYourProfile();
});
