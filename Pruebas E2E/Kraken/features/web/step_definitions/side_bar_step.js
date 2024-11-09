const { When } = require('@cucumber/cucumber');

When('I click the pages button', async function() {
    await this.sideBarPO.clickSideBarPagesSection();
});
