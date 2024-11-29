const { Then, Given, When } = require("@cucumber/cucumber");
const scope = require("../support/scope");
const properties = require("../../properties");
const { dataProcessor, waitUtil } = require("../utils/utils");

// Given

Given("I click on new tag button", async () => {
  await scope.pages.tags.clickCreateTagButton();
});

Given("I fill tag name with {string}", async (tagName) => {
  const processed = dataProcessor(tagName);
  scope.variables.tagName = processed;
  await scope.pages.tags.fillName(processed);
});

Given("I fill tag description with {string}", async (tagDescription) => {
  const processed = dataProcessor(tagDescription);
  scope.variables.tagDescription = processed;
  await scope.pages.tags.fillDescription(processed);
});

Given("I fill the color input with {string}", async (color) => {
  const processed = dataProcessor(color);
  scope.variables.color = processed;
  await scope.pages.tags.fillColor(processed);
});

Given("I fill tag name with the previous tag name", async () => {
  const { tagName } = scope.variables;
  await scope.pages.tags.fillName(tagName);
});

Given("I fill the tag header with {string} and footer with {string}", async (codeInjectionHeader, codeInjectionFooter) => {
  const codeInjectionHeaderParsed = dataProcessor(codeInjectionHeader);
  const codeInjectionFooterParsed = dataProcessor(codeInjectionFooter);
  scope.variables.tagCodeInjectionHeader = codeInjectionHeaderParsed;
  scope.variables.tagCodeInjectionFooter = codeInjectionFooterParsed;

  await scope.pages.tags.fillCodeInjection(codeInjectionHeaderParsed, codeInjectionFooterParsed);
});

Given("I fill the slug with an emoji", async function () {
  await scope.pages.tags.fillSlug("😅");
});

Given("I upload a tag image {string}", async (image) => {
  const processed = dataProcessor(image);
  scope.variables.tagImage = true;
  await scope.pages.tags.uploadImage("./assets/" + processed + ".jpg");
  await waitUtil(500);
});

Given("I expand the {string} metadata section", async (metadataSection) => {
  await scope.pages.tags.expandMetadataSection(metadataSection);
});

Given("I fill the {string} metadata title with the tag name and description {string}",
  async (metadataSection, tagMetadataDesc) => {
    const { tagName } = scope.variables;
    const processed = dataProcessor(tagMetadataDesc);
    scope.variables.tagDescription = processed;

    await scope.pages.tags.fillMetadataTitleAndDescription(
      metadataSection,
      tagName,
      processed
    );
  });

Given("I fill the {string} metadata title with the tag name", async (metadataSection) => {
  const { tagName } = scope.variables;

  await scope.pages.tags.fillMetadataTitleAndDescription(metadataSection, tagName, "");
});

Given("I click on the recently created tag", async () => {
  const { tagName } = scope.variables;
  await scope.pages.tags.clickTagNameInList(tagName);
});

// When

When("I click on save tag button", async () => {
  await scope.pages.tags.clickSaveTagButton();
});

When("I click on delete tag button", async () => {
  await scope.pages.tags.clickDeleteTagButton();
});

When("I click on the delete tag button in the confirmation modal", async () => {
  await scope.pages.tags.clickDeleteTagButtonInConfirmationModal();
});

When("I click on the cancel delete tag button in the confirmation modal", async () => {
  await scope.pages.tags.clickCancelDeleteTagButtonInConfirmationModal();
});

// Then

Then("I go to {string} tags list", async (kind) => {
  await scope.pages.tags.goToTagsList(kind);
});


Then("the tag should be in the list", async () => {
  const { tagName } = scope.variables;
  const result = await scope.pages.tags.checkTagInList(tagName);
  console.assert(result, `The tag ${tagName} is not in the list`);
});

Then("the tag should not be in the list", async () => {
  const { tagName } = scope.variables;
  const result = await scope.pages.tags.checkTagListIsEmpty(tagName);
  console.assert(result, `The tag ${tagName} is in the list`);
});

Then("I should see tag title", async () => {
  const { tagName } = scope.variables;
  const result = await scope.pages.tags.checkTagInTitle(tagName);
  console.assert(result, `The tag ${tagName} is not in the title`);
});

Then("I should see an error in the tag name field", async () => {
  const { tagName } = scope.variables;
  const result = await scope.pages.tags.checkErrorInTagNameIfEmpty(tagName);
  console.assert(result, `The error label for an empty tag name is not shown`);
});

Then("I should see an error in the tag description field", async () => {
  const { tagDescription } = scope.variables;
  const result = await scope.pages.tags.checkErrorInTagDescriptionIfEmpty(tagDescription);
  console.assert(result, `There is no error in the tag description field`);
});

Then("I should see an increased word counter under the {string} description field", async (socialNetwork) => {
  const { tagDescription } = scope.variables;

  var wordLimit = 0;

  switch (socialNetwork) {
    case "facebook":
      wordLimit = 65;
      break;
    case "X":
      wordLimit = 70;
      break;
  }

  const result = await scope.pages.tags.checkCharCounterInDescriptionField(wordLimit);
  console.assert(result, `There is no error in the tag description field`);
});

Then("I should see the search engine preview with the right data for {string}", async (socialNetwork) => {
  const { tagName, tagDescription } = scope.variables;
  const result = await scope.pages.tags.checkFacebookPreviewWidget(tagName, tagDescription, socialNetwork);
  console.assert(result, `The search engine preview for facebook is not showing the right data`);
});

Then("The tag has slug starting with {string}", async function (tagSlug) {
  const { tagName } = scope.variables;
  await scope.pages.tags.validateTagSlug({
    tagName,
    tagSlug,
  });
});

Then("the tag has zero related posts", async function () {
  const { tagName } = scope.variables;
  await scope.pages.tags.validateRelatedPosts(tagName, 0);
});

Then(
  "There are {int} or more tags with the previous tag name in the tag list",
  async function (num) {
    const { tagName } = scope.variables;
    await scope.pages.tags.validateTagNameIsInTagListNTimes(tagName, num);
  }
);
