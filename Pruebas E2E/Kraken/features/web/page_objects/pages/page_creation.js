const { BasePageObject } = require('../base_page_object');
const { existsSync } = require('fs');

class PageCreationPageObject extends BasePageObject {
    pageBodySelector = 'div[class^="koenig-react-editor"] > div:nth-child(1) > div:nth-child(1) > div[data-kg="editor"]';

    async fillPageTitle(title) {
        const element = await this.driver.$('textarea[placeholder="Page title"]');
        await element.setValue(title);
    }

    async clickPageBody() {
        const element = await this.driver.$(this.pageBodySelector);
        await element.click();
    }

    async fillPageBodyWithText(text) {
        const element = await this.driver.$(this.pageBodySelector);
        await element.click();
        await element.setValue(text);
    }

    async fillImageWithAsset() {
        const element = await this.driver.$('input[type="file"]');
        const path = './assets/Nissan-Skyline-GT-R-R32.jpg'
        await element.setValue(path);
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
