const { Given, When, Then } = require("@cucumber/cucumber");

When('I click the new tag button', async function() {
    await this.tagsPO.clickNewTagButton();
});

When('I fill the tag name with text {kraken-string}', async function(title) {
    await this.tagsPO.fillTagName(title);
});

When('I fill the metadata title with text {kraken-string} and the metadata description with text {kraken-string}', async function(title, description) {
    await this.tagsPO.fillMetadataTitleAndDescription(title, description);
});

When('I click the save button', async function() {
    await this.tagsPO.clickSaveButton();
});

When('I expand the metadata section', async function() {
    await this.tagsPO.clickExpandMetadataButton();
});

Then('I should see title {kraken-string}', async function(title) {
    await this.tagsPO.checkNewTagTitle(title);
});