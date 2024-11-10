const { BasePageObject } = require('../base_page_object');
const { existsSync } = require('fs');
const { assert } = require('chai');

class MembersCreationPageObject extends BasePageObject {
    async fillEmail(email) {
        const element = await this.driver.$('#member-email');
        await element.setValue(email);
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

module.exports = { MembersCreationPageObject };
