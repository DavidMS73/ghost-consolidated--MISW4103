const { When, Then, Given } = require("@cucumber/cucumber");
const scope = require("../support/scope");
const { dataProcessor, waitUtil } = require("../utils/utils");

Given("I click preview button", async () => {
  await scope.pages.common.clickPreviewButton();
});

Given("I click publish button", async () => {
  await scope.pages.common.clickPublishButton();
});

Given("I click continue final review button", async () => {
  await scope.pages.common.clickContinueFinalReviewButton();
});

Given("I click on editor page", async () => {
  await scope.pages.common.clickEditorPage();
});

Given("I upload a feature image {string}", async (image) => {
  const processed = dataProcessor(image);
  await scope.pages.common.uploadFeatureImage("./assets/" + processed);
  await waitUtil(500);
});

Given("I upload an audio {string}", async function (audio) {
  const processed = dataProcessor(audio);
  scope.variables.postDescription = processed.split(".")[0];
  await scope.pages.common.uploadAudio("./assets/" + processed);
});

Given("I upload a video {string}", async function (video) {
  const processed = dataProcessor(video);
  // Info related to load the video
  scope.variables.postDescription = "0:00";
  await scope.pages.common.uploadVideo("./assets/" + processed);
});

// When
When("I click confirm publish button", async () => {
  await scope.pages.common.clickConfirmPublishButton();
});

When("I click update button", async () => {
  await scope.pages.common.clickUpdateButton();
});

// Then

Then("I should see title inside a modal", async () => {
  const { title } = scope.variables;
  await scope.pages.common.checkNewPublishModal(title);
  await scope.pages.common.clickCloseNewPublishModal(title);
});

Then(
  "I should see title \\(Untitled) and correct description inside a modal",
  async () => {
    const { postDescription } = scope.variables;
    await scope.pages.common.checkNewPublishModal(
      "(Untitled)",
      postDescription
    );
    await scope.pages.common.clickCloseNewPublishModal();
  }
);

Then("I should see title and content inside a modal", async () => {
  const { postTitle, postDescription } = scope.variables;
  await scope.pages.common.checkNewPublishModal(postTitle, postDescription);
  await scope.pages.common.clickCloseNewPublishModal();
});

Then("I should see title and some content related inside a modal", async () => {
  const { postTitle, postDescription } = scope.variables;
  await scope.pages.common.checkNewPublishModal(
    postTitle,
    null,
    null,
    postDescription
  );
  await scope.pages.common.clickCloseNewPublishModal();
});

Then("I should see title and a image inside a modal", async () => {
  const { postTitle } = scope.variables;
  await scope.pages.common.checkNewPublishModal(postTitle, null, true);
  await scope.pages.common.clickCloseNewPublishModal();
});

Then("I should see a small modal with title {string}", async (title) => {
  await scope.pages.common.checkSmallModalEdited(title);
});

Then("I should see the feature image in the post editor", async () => {
  await scope.pages.common.checkDetailInfo(true, null);
});

Then("I delete all the info", async () => {
  await scope.pages.common.deleteAllInfo();
});

Then("I should not see the publish button", async () => {
  await scope.pages.common.checkPublishButtonNotVisible();
});

Then("I should see an error in video preview editor", async () => {
  await scope.pages.common.checkVideoPreviewError();
});
