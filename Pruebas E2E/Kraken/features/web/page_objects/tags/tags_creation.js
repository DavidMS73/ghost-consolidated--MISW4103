const { BasePageObject } = require('../base_page_object');
const { existsSync } = require('fs');
const { assert } = require('chai');

class TagsCreationPageObject extends BasePageObject {
    async clickNewTagButton() {
        const element = await this.driver.$('a[href="#/tags/new/"]');
        await element.click();
    }

    async fillTagName(title) {
        const element = await this.driver.$('#tag-name');
        await element.setValue(title);
    }

    async clickSaveButton() {
        const element = await this.driver.$('button[data-test-button="save"]');
        await element.click();
    }

    async checkNewTagTitle(title) {
        const titleElement = await this.driver.$('h2[data-test-screen-title]');
        const titleElementText = await titleElement.getText();
        assert.equal(titleElementText, title);
    }
}

module.exports = { TagsCreationPageObject };
