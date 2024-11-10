const { Given, When, Then } = require("@cucumber/cucumber");

When('I click the new tag button', async function() {
    await this.tagsPO.clickNewTagButton();
});

When('I fill the tag name with text {kraken-string}', async function(title) {
    await this.tagsPO.fillTagName(title);
});

When('I click the save button', async function() {
    await this.tagsPO.clickSaveButton();
});

Then('I should see title {kraken-string}', async function(title) {
    await this.tagsPO.checkNewTagTitle(title);
});