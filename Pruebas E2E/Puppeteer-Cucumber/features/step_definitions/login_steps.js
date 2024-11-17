const scope = require("../support/scope");
const { Given } = require("@cucumber/cucumber");
const properties = require("../../properties");

// Given
Given("I navigate to ghost local page", async () => {
  await scope.page.goto(properties.BASE_URL, { waitUntil: "networkidle0" });
});

Given("I login to the application if necessary", async () => {
  const isInLoginPage = await scope.pages.login.isInLoginPage();
  if (isInLoginPage)
    await scope.pages.login.login(properties.EMAIL, properties.PASSWORD);
  // Espera para que la navegación se complete
  await new Promise((r) => setTimeout(r, 500));
});
