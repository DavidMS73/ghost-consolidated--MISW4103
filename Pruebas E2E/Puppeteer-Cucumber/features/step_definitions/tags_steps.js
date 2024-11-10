const { When, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");

// When

When("I click on new tag button", async () => {
  await scope.pages.tags.clickCreateTagButton();
});

When("I fill tag name with {string}", async (title) => {
  await scope.pages.tags.fillName(title);
});

When("I click on save tag button", async () => {
  await scope.pages.tags.clickSaveTagButton();
});

When("I expand the metadata section", async () => {
  await scope.pages.tags.expandMetadataSection();
});

When("I fill the metadata title with {string} and description {string}", async (metadatdaTitle, metadataDescription) => {
  await scope.pages.tags.fillMetadataTitleAndDescription(metadatdaTitle, metadataDescription);
});

// Then

Then("I go to tags list", async () => {
  await scope.pages.tags.goToTagsList();
});

Then("the tag {string} should be in the list", async (title) => {
  const result = await scope.pages.tags.checkTagInList(title);
  console.assert(result, `The tag ${title} is not in the list`);
});
