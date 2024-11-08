const { BasePageObject } = require('../../../../base_page_object');

class PageCreationPageObject extends BasePageObject {
    async fillPageTitle(title) {
        const element = await this.driver.$('textarea[placeholder="Page title"]');
        await element.setValue(title);
    }

    async fillPageBodyWithText(text) {
        const element = await this.driver.$('div[data-kg="editor"]');
        await element.setValue(text);
    }

    async clickPublishButton() {
        const element = await this.driver.$('button[data-test-button="publish-flow"]');
        await element.click();
    }

    async clickContinueFinalReviewButton() {
        const element = await this.driver.$('button[data-test-button="continue"]');
        await element.click();
    }

    async clickPublishPageButton() {
        const element = await this.driver.$('button[data-test-button="confirm-publish"]');
        await element.click();
    }
}

module.exports = { PageCreationPageObject };
