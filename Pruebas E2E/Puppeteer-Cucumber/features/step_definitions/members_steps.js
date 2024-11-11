const { When, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");

// When

When("I click on new member button", async () => {
  await scope.pages.members.clickCreateMemberButton();
});

When("I fill member email with {string}", async (email) => {
  await scope.pages.members.fillEmail(email);
});

When("I fill member name with {string}", async (name) => {
  await scope.pages.members.fillName(name);
});

When("I click on save member button", async () => {
  await scope.pages.members.clickSaveMemberButton();
});

When("I unfocus the member form field", async () => {
  await scope.pages.members.unfocusFormField();
});

// Then

Then("I go to members list", async () => {
  await scope.pages.members.goToMembersList();
});

Then("the member {string} should be in the list", async (email) => {
  const result = await scope.pages.members.checkMemberInList(email);
  console.assert(result, `The member ${email} is not in the list`);
});

Then("I should see an error message due to a missing email field", async () => {
  const result = await scope.pages.members.checkErrorMessageByMissingEmail();
  console.assert(result, `The member email is not missing`);
});

Then("I should see the initials {string} and {string} in the user avatar", async (first, last) => {
  const result = await scope.pages.members.checkAvatarInitials(first, last);
  console.assert(result, `The initials ${first} and ${last} are not in the user avatar`);
});

Then("I should see the initials {string} in the user avatar", async (initials) => {
  const result = await scope.pages.members.checkAvatarInitials(initials, '');
  console.assert(result, `The initials ${initials} are not in the user avatar`);
});
