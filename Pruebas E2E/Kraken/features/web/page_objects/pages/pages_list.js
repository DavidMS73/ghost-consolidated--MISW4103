const { BasePageObject } = require('../base_page_object');
const { assert } = require('chai');

class PagesListPageObject extends BasePageObject {
    async clickNewPageButton() {
        const element = await this.driver.$('a[href="#/editor/page/"]');
        await element.click();
    }

    async checkNewPageModal(title, content) {
        const titleElement = await this.driver.$('div[class="modal-body"] > h2');
        const titleElementText = await titleElement.getText();
        assert.equal(titleElementText, title);
        const contentElement = await this.driver.$('div[class="modal-body"] > p[class="post-excerpt"]');
        const contentElementText = await contentElement.getText();
        assert.equal(contentElementText, content);
    }

    async clickCloseNewPageModal() {
        const element = await this.driver.$('button[data-test-button="close-publish-flow"]');
        await element.click();
    }

    async validateFirstPageTitle(title) {
        const selector = 'div[class^="posts-list"] > div:nth-child(1) > li > a:nth-child(1) > h3';
        const element = await this.driver.$(selector);
        const text = await element.getText();
        assert.equal(text, title);
    }
}

module.exports = { PagesListPageObject };
