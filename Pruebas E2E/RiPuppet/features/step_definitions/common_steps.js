const { Given, When } = require("cucumber");
const scope = require("../support/scope");
const constants = require("../support/constants");

Given("I navigate to ghost local page", async () => {
  await scope.page.goto(constants.baseUrl, { waitUntil: "networkidle0" });
});

When("I login to the application", async () => {
  await scope.pages.login.login(
    "gd.martinez@uniandes.edu.co",
    "pruebasautomatizadas"
  );
});

When("I visit {string} section", async (section) => {
  await scope.page.goto(constants.baseUrl + "/" + section, {
    waitUntil: "networkidle0",
  });
});
