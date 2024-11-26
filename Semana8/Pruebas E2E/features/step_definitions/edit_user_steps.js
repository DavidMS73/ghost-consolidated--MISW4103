const { Given, When, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");
const { dataProcessor, formatString } = require("../utils/utils");

// ===========================
// Given
// ===========================

Given("I set the field {string} to {string}", async (field, value) => {
  const processed = dataProcessor(value);
  scope.variables[field] = formatString(processed);
  await scope.pages.editUser.setField(field, processed);
});

// ===========================
// When
// ===========================

When("I click on save changes button", async () => {
  await scope.pages.editUser.clickSaveChangesButton();
});

// ===========================
// Then
// ===========================

Then("an error should appear indicating that the full name is required", async () => {
  await scope.pages.editUser.validateErrorMessageIsShown("Name is required");
});

Then("the name of the user should be updated", async () => {
  const { fullName } = scope.variables;
  await scope.pages.editUser.validateUserNameIsUpdated(fullName);
});

Then("the name of the user should be trimmed and updated", async () => {
  const { fullName } = scope.variables;
  await scope.pages.editUser.validateUserNameIsUpdated(fullName.slice(0, -1));
});

Then("the email of the user should be updated", async () => {
  const { email } = scope.variables;
  await scope.pages.editUser.validateEmailIsUpdated(email);
});

Then("an error should appear indicating that the email is required", async () => {
  await scope.pages.editUser.validateErrorMessageIsShown("Enter a valid email address");
});

Then("an error should appear indicating that the email is not valid", async () => {
  await scope.pages.editUser.validateErrorMessageIsShown("Enter a valid email address");
});

Then("the email and the name of the user should be updated", async () => {
  const { fullName, email } = scope.variables;
  await scope.pages.editUser.validateUserNameIsUpdated(fullName);
  await scope.pages.editUser.validateEmailIsUpdated(email);
});

Then("the slug of the user should be updated", async () => {
  const { slug } = scope.variables;
  await scope.pages.editUser.validateSlugIsUpdated(slug.toLowerCase());
});

Then("the slug of the user should be updated with the name", async () => {
  const { fullName } = scope.variables;
  await scope.pages.editUser.validateSlugIsUpdated(fullName.toLowerCase());
});

Then("the slug of the user should be trimmed and updated", async () => {
  const { slug } = scope.variables;
  await scope.pages.editUser.validateSlugIsUpdated(slug.slice(0, -1).toLowerCase());
});

Then("the slug of the user should be separated by dashes", async () => {
  const { slug } = scope.variables;
  await scope.pages.editUser.validateSlugIsUpdated(slug.toLowerCase().replace(/\s/g, "-"));
});

Then("the slug and the name of the user should be updated", async () => {
  const { fullName, slug } = scope.variables;
  await scope.pages.editUser.validateSlugIsUpdated(slug.toLowerCase().replace(/\s/g, "-"));
  await scope.pages.editUser.validateUserNameIsUpdated(fullName);
});

Then("the slug and the email of the user should be updated", async () => {
  const { email, slug } = scope.variables;
  await scope.pages.editUser.validateSlugIsUpdated(slug.toLowerCase().replace(/\s/g, "-"));
  await scope.pages.editUser.validateEmailIsUpdated(email);
});

Then("the location of the user should be updated", async () => {
  const { location } = scope.variables;
  await scope.pages.editUser.validateLocationIsUpdated(location);
});

Then("an error should appear indicating that the location is too long", async () => {
  await scope.pages.editUser.validateErrorMessageIsShown("Location is too long");
});

Then("an error should appear indicating that the location is not valid", async () => {
  await scope.pages.editUser.validateErrorMessageIsShown("Location is not valid");
});

// ===========================
// Post
// ===========================

Then("\\(post\\) returned to original email", async () => {
  await scope.pages.editUser.restoreEmail();
});