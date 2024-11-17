const { Given, When, Then } = require("@cucumber/cucumber");

// Given

Given("I click the new member button", async function () {
  await this.membersListPO.clickNewMemberButton();
});

Given(
  "I fill the member email with text {kraken-string}",
  async function (email) {
    await this.membersCreationPO.fillEmail(email);
  }
);

Given(
  "I fill the member name with text {kraken-string} {kraken-string}",
  async function (name, lastname) {
    await this.membersCreationPO.fillName(name, lastname);
  }
);

Given(
  "I fill the member name with text {kraken-string}",
  async function (name) {
    await this.membersCreationPO.fillName(name, "");
  }
);

// When

When("I click the save member button", async function () {
  await this.membersCreationPO.clickSaveButton();
});

When("I unfocus the form field", async function () {
  await this.membersCreationPO.unfocusFormField();
});

// Then

Then("I should see members page title {kraken-string}", async function (email) {
  await this.membersCreationPO.checkNewTagTitle(email);
});

Then("I should see an error message due to empty email", async function () {
  await this.membersCreationPO.checkErrorMessageWhenEmailIsEmpty();
});

Then(
  "I should see the member initials according their first and lastname {kraken-string} {kraken-string}",
  async function (name, lastname) {
    await this.membersCreationPO.checkUsernameAvatarInitials(name, lastname);
  }
);

Then(
  "I should see the member initials according their firstname {kraken-string}",
  async function (name) {
    await this.membersCreationPO.checkUsernameAvatarInitials(name, "");
  }
);
