const { When } = require('@cucumber/cucumber');

When('I click the pages button', async function() {
    await this.sideBarPO.clickSideBarPagesSection();
});

When('I click the tags button', async function() {
    await this.sideBarPO.clickSideBarTagsSection();
});
