const { BasePageObject } = require('../base_page_object');
const { existsSync } = require('fs');
const { assert } = require('chai');

class MembersCreationPageObject extends BasePageObject {
    async fillEmail(email) {
        const element = await this.driver.$('#member-email');
        await element.setValue(email);
    }

    async fillName(name, lastname) {
        const element = await this.driver.$('#member-name');
        await element.setValue(name + ' ' + lastname);
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

    async checkErrorMessageWhenEmailIsEmpty() {
        const errorElement = await this.driver.$('div.gh-cp-member-email-name > div.form-group.max-width.error > p');
        const errorElementText = await errorElement.getText();
        assert.equal(errorElementText, 'Please enter an email.');
    }

    async checkUsernameAvatarInitials(name, lastname) {
        const avatarElement = await this.driver.$('div.gh-member-details-identity > figure > img');
        const avatarElementAlt = await avatarElement.getAttribute('alt');
        assert.equal(avatarElementAlt, name + ' ' + lastname);
    }    
}

module.exports = { MembersCreationPageObject };
