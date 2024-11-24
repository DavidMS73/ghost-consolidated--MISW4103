const { Then, Given, When } = require("@cucumber/cucumber");
const scope = require("../support/scope");
const properties = require("../../properties");
const { dataProcessor, formatString } = require("../utils/utils");

// Given

Given("I click on new tag button", async () => {
  await scope.pages.tags.clickCreateTagButton();
});

Given("I fill tag name with {string}", async (tagName) => {
  const processed = dataProcessor(tagName);
  scope.variables.tagName = processed;
  await scope.pages.tags.fillName(processed);
});

Given("I fill tag name with the previous tag name", async () => {
  const { tagName } = scope.variables;
  await scope.pages.tags.fillName(tagName);
});

Given("I fill the slug with an emoji", async function () {
  await scope.pages.tags.fillSlug("😅");
});

Given("I expand the metadata section", async () => {
  await scope.pages.tags.expandMetadataSection();
});

Given(
  "I fill the metadata title with the tag name and description {string}",
  async (tagMetadataDesc) => {
    const { tagName } = scope.variables;
    const processed = dataProcessor(tagMetadataDesc);
    scope.variables.tagMetadataDesc = processed;

    await scope.pages.tags.fillMetadataTitleAndDescription(
      tagName,
      processed
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

Then("the tag should be in the list", async () => {
  const { tagName } = scope.variables;
  const result = await scope.pages.tags.checkTagInList(tagName);
  console.assert(result, `The tag ${tagName} is not in the list`);
});

Then("I should see tag title", async () => {
  const { tagName } = scope.variables;
  const result = await scope.pages.tags.checkTagInTitle(tagName);
  console.assert(result, `The tag ${tagName} is not in the title`);
});

Then("The tag has slug starting with {string}", async function (tagSlug) {
  const { tagName } = scope.variables;
  await scope.pages.tags.validateTagSlug({
    tagName,
    tagSlug,
  });
}
);

Then(
  "There are {int} or more tags with the previous tag name in the tag list",
  async function (num) {
    const { tagName } = scope.variables;
    await scope.pages.tags.validateTagNameIsInTagListNTimes(tagName, num);
  }
);
