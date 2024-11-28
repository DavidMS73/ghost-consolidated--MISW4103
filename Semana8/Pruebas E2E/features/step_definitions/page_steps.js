const { Then, Given, When } = require("@cucumber/cucumber");
const scope = require("../support/scope");
const properties = require("../../properties");
const { dataProcessor, formatString } = require("../utils/utils");

// Given

Given("I click on new page button", async function () {
  await scope.pages.pages.clickNewPageButton();
});

Given("I fill the page title with text {string}", async (title) => {
  const processed = dataProcessor(title);
  scope.variables.title = processed;
  await scope.pages.pages.fillPageTitle(processed);
});

Given("I click the page content", async () => {
  await scope.pages.pages.clickPageBody();
});

Given("I fill the image with an asset", async function () {
  await scope.pages.pages.fillImageWithAsset();
});

Given("I click the add button", async function () {
  await scope.pages.pages.clickAddButton();
});

Given("I click the audio button", async function () {
  await scope.pages.pages.clickAudioButton();
});

Given("I fill the page content with text {string}", async function (content) {
  const processed = dataProcessor(content);
  scope.variables.content = processed;
  await scope.pages.pages.fillPageBodyWithText(processed);
});

Given("I fill page URL with value {string}", async function (url) {
  const processed = dataProcessor(url);
  scope.variables.url = processed;
  await scope.pages.pages.fillPageUrl(processed);
});

Given('I click page access dropdown', async function () {
  await scope.pages.pages.clickPageAccessDropdown();
});

Given('I click members only button', async function () {
  await scope.pages.pages.clickMembersOnlyButton();
});

Given('I click paid members only button', async function () {
  await scope.pages.pages.clickPaidMembersOnlyButton();
});

Given('I fill excerpt with {string}', async function (excerpt) {
  const processed = dataProcessor(excerpt);
  scope.variables.excerpt = processed;
  await scope.pages.pages.fillExcerpt(processed);
});

Given('I copy page URL', async function () {
  const url = await scope.pages.pages.getPageUrl();
  scope.variables.url = url;
});

Given('I toggle show title and feature image', async function () {
  await scope.pages.pages.toggleShowTitleAndFeatureImage();
});

Given('I toggle feature page', async function () {
  await scope.pages.pages.toggleFeaturePage();
});

Given('I delete page title', async function () {
  await scope.pages.pages.deleteTitle();
});

Given('I delete page content', async function () {
  await scope.pages.pages.deleteContent();
});

Given('I click update page button', async function () {
  await scope.pages.pages.clickUpdateButton();
});

Given('I click edit page back', async function () {
  await scope.pages.pages.clickEditPageBack();
});

// Then

Then("I should see page title and content inside a modal", async () => {
  const { title, content } = scope.variables;
  await scope.pages.common.checkNewPublishModal(
    title,
    formatString(content)
  );
  await scope.pages.common.clickCloseNewPublishModal();
});

Then("I should see page title and excerpt inside a modal", async () => {
  const { title, excerpt } = scope.variables;
  await scope.pages.common.checkNewPublishModal(
    title,
    formatString(excerpt)
  );
  await scope.pages.common.clickCloseNewPublishModal();
});

Then("I click the pages type filter", async function () {
  await scope.pages.pages.clickPagesTypeFilter();
});

Then("I click the published pages filter", async function () {
  await scope.pages.pages.clickPublishedPagesFilter();
});

Then("I should see the first page with title", async function () {
  const { title } = scope.variables;
  await scope.pages.pages.validateFirstPageTitle(title);
});

Then("I click gear button", async function () {
  await scope.pages.pages.clickGearButton();
});

Then("I navigate to created page site", async function () {
  const page = scope.variables.url;
  const url = new URL(properties.BASE_URL);
  await scope.pages.pages.navToPageSite({
    pageUrl: page,
    baseUrl: url.origin,
  });
});

Then("I validate title in page view", async function () {
  const title = scope.variables.title;
  await scope.pages.pages.validatePageTitle(title);
});

Then("I validate content in page view", async function () {
  const content = formatString(scope.variables.content);
  await scope.pages.pages.validatePageContent(content);
});

Then("I click first page", async function () {
  await scope.pages.pages.clickFirstPage();
});

Then("I click delete page", async function () {
  await scope.pages.pages.clickDeletePage();
});

Then("I click delete button", async function () {
  await scope.pages.pages.clickDeleteButton();
});

Then('I click access filter', async function () {
  await scope.pages.pages.clickAccessFilter();
});

Then('I click members only filter', async function () {
  await scope.pages.pages.clickMembersOnlyFilter();
});

Then('I click paid members only filter', async function () {
  await scope.pages.pages.clickPaidMembersOnlyFilter();
});

Then('I check page title is absent', async function () {
  await scope.pages.pages.checkPageTitleIsAbsent();
});

Then('I validate first page is featured', async function () {
  await scope.pages.pages.validateFirstPageIsFeatured();
});
