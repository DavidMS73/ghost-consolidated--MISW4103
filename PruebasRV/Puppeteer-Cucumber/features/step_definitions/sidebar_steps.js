const scope = require("../support/scope");
const { When } = require("@cucumber/cucumber");

When("I navigate to {string} section", async (section) => {
  await scope.pages.sidebar.navigateTo(section);
});
