const { When, Then } = require("@cucumber/cucumber");
const scope = require("../support/scope");

// When

When('I click the new page button', async function() {
    await scope.pages.pages.clickNewPageButton();
});

When('I fill the page title with text', async function() {
    await scope.pages.pages.fillPageTitle('My new page');
});

When('I fill the page content with text', async function() {
    await scope.pages.pages.fillPageBodyWithText('My page content');
});

When('I click the publish button', async function() {
    await scope.pages.pages.clickPublishButton();
});

When('I click the continue final review button', async function() {
    await scope.pages.pages.clickContinueFinalReviewButton();
});

When('I click the publish page button', async function() {
    await scope.pages.pages.clickPublishPageButton();
});

When('I click the pages type filter', async function() {
    await scope.pages.pages.clickPagesTypeFilter();
});

When('I click the published pages filter', async function() {
    await scope.pages.pages.clickPublishedPagesFilter();
});

// Then

Then('I should see title and content inside a modal', async function() {
    await scope.pages.pages.checkNewPageModal('My new page', 'My page content');
    await scope.pages.pages.clickCloseNewPageModal();
});

Then('I should see the first page with title', async function() {
    await scope.pages.pages.validateFirstPageTitle('My new page');
});
