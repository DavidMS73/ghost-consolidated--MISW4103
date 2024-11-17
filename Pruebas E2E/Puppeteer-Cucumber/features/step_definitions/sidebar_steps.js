const scope = require("../support/scope");
const { Given } = require("@cucumber/cucumber");

// Given

Given("I navigate to {string} section", async (section) => {
  await scope.pages.sidebar.navigateTo(section);
});
