const { Given, When, Then } = require("@cucumber/cucumber");
const fse = require("fs-extra");

// Given

Given(
  "I save a ss of version {kraken-string} and feature {kraken-string} and scenario {kraken-string} and step {kraken-string}",
  async function (version, feature, scenario, step) {
    const screenshotPath = `./output/screenshots/${version}/${feature}/${scenario}/`;
    const screenshotName = `step_${step}.png`;
    const fullPath = `${screenshotPath}${screenshotName}`;

    //Validate if the folder exists
    if (!fse.pathExistsSync(screenshotPath)) {
      fse.ensureDirSync(screenshotPath);
    }

    //Screenshot
    await this.driver.saveScreenshot(fullPath);
  }
);

Given("I click preview button", async function () {
  await this.commonPO.clickPreviewButton();
});

Given("I click publish button", async function () {
  await this.commonPO.clickPublishButton();
});

Given("I just wait a few seconds", async function () {
  await this.commonPO.waitAFewSeconds();
});

// When

When("I click confirm publish button", async function () {
  await this.commonPO.clickConfirmPublishButton();
});

// Then

Then("I should see a toast message of {kraken-string}", async function (title) {
  await this.commonPO.checkNewPublishModal(title);
});
