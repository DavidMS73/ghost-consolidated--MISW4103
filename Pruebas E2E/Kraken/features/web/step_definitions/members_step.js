const { Given, When, Then } = require("@cucumber/cucumber");

When('I click the new member button', async function() {
    await this.membersListPO.clickNewMemberButton();
});

When('I fill the member email with text {kraken-string}', async function(email) {
    await this.membersCreationPO.fillEmail(email);
});

When('I click the save member button', async function() {
    await this.membersCreationPO.clickSaveButton();
});

Then('I should see members page title {kraken-string}', async function(email) {
    await this.membersCreationPO.checkNewTagTitle(email);
});

Then('I should see an error message due to empty email', async function() {
    await this.membersCreationPO.checkErrorMessageWhenEmailIsEmpty();
});