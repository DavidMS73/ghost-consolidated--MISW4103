const { Given, When, Then } = require("@cucumber/cucumber");

// Given

Given("I click the new tag button", async function () {
  await this.tagListPO.clickNewTagButton();
});

Given("I fill the tag name with string {kraken-string}", async function (name) {
  await this.tagCreationPO.fillName(name);
});

Given("I fill the slug with an emoji", async function () {
  await this.tagCreationPO.fillSlug("😅");
});

Given(
  "I fill the metadata title with text {kraken-string} and the metadata description with text {kraken-string}",
  async function (title, description) {
    await this.tagCreationPO.fillMetadataTitleAndDescription(
      title,
      description
    );
  }
);

Given("I expand the metadata section", async function () {
  await this.tagCreationPO.clickExpandMetadataButton();
});

// When

When("I click the save tag button", async function () {
  await this.tagCreationPO.clickSaveButton();
});

// Then

Then("I should see title {kraken-string}", async function (title) {
  await this.tagCreationPO.checkNewTagTitle(title);
});

Then(
  "I validate the new tag name {kraken-string} is in the tag list",
  async function (tagName) {
    await this.tagListPO.validateTagNameIsInTagList(tagName);
  }
);

Then(
  "I validate that tag with name {kraken-string} has slug starting with {string}",
  async function (tagName, tagSlug) {
    await this.tagListPO.validateTagSlug({
      tagName,
      tagSlug,
      startsWith: true,
    });
  }
);

Then(
  "I validate that there are {int} or more tags with name {kraken-string} in the tag list",
  async function (num, tagName) {
    this.tagListPO.validateTagNameIsInTagListNTimes(tagName, num);
  }
);
