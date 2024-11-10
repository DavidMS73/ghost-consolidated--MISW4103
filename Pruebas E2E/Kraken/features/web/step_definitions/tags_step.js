const { When, Then } = require('@cucumber/cucumber');

// When

When('I click the new tag button', async function() {
    await this.tagListPO.clickNewTagButton();
});

When('I fill the tag name with string {kraken-string}', async function(name) {
    await this.tagCreationPO.fillName(name);
});

When('I fill the slug with an emoji', async function() {
    await this.tagCreationPO.fillSlug('😅');
});

When('I click the save tag button', async function() {
    await this.tagCreationPO.clickSaveButton();
});

// Then

Then(
    'I validate the new tag name {kraken-string} is in the tag list',
    async function(tagName) {
        await this.tagListPO.validateTagNameIsInTagList(tagName);
    },
);

Then(
    'I validate that tag with name {kraken-string} has slug starting with {string}',
    async function(tagName, tagSlug) {
        await this.tagListPO.validateTagSlug({
            tagName, tagSlug, startsWith: true,
        });
    }
);

Then(
    'I validate that there are {int} or more tags with name {kraken-string} in the tag list',
    async function(num, tagName) {
        this.tagListPO.validateTagNameIsInTagListNTimes(tagName, num);
    },
)
