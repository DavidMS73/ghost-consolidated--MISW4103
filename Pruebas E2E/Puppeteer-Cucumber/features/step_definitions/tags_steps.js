const { When, Then, Given } = require("@cucumber/cucumber");
const scope = require("../support/scope");

// Given

Given("I click on new tag button", async () => {
  await scope.pages.tags.clickCreateTagButton();
});

Given("I fill tag name with {string}", async (title) => {
  await scope.pages.tags.fillName(title);
});

Given("I fill the slug with an emoji", async function () {
  await scope.pages.tags.fillSlug("😅");
});

Given("I expand the metadata section", async () => {
  await scope.pages.tags.expandMetadataSection();
});

Given(
  "I fill the metadata title with {string} and description {string}",
  async (metadatdaTitle, metadataDescription) => {
    await scope.pages.tags.fillMetadataTitleAndDescription(
      metadatdaTitle,
      metadataDescription
    );
  }
);

// When

When("I click on save tag button", async () => {
  await scope.pages.tags.clickSaveTagButton();
});

// Then

Then("I go to tags list", async () => {
  await scope.pages.tags.goToTagsList();
});

Then("the tag {string} should be in the list", async (title) => {
  const result = await scope.pages.tags.checkTagInList(title);
  console.assert(result, `The tag ${title} is not in the list`);
});

Then("I should see tag title {string}", async (title) => {
  const result = await scope.pages.tags.checkTagInTitle(title);
  console.assert(result, `The tag ${title} is not in the title`);
});

Then(
  "The tag {string} has slug starting with {string}",
  async function (tagName, tagSlug) {
    await scope.pages.tags.validateTagSlug({
      tagName,
      tagSlug,
    });
  }
);

Then(
  "There are {int} or more tags with tag {string} in the tag list",
  async function (num, tagName) {
    await scope.pages.tags.validateTagNameIsInTagListNTimes(tagName, num);
  }
);
