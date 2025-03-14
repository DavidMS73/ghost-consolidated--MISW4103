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

    async unfocusFormField() {
        const element = await this.driver.$('h2');
        await element.click();
    }

    async checkUsernameAvatarInitials(name, lastname) {
        const avatarElement = await this.driver.$('span.gh-member-avatar-label');
        const nameInitial = name.charAt(0).toUpperCase();
        const lastnameInitial = lastname.charAt(0).toUpperCase();

        const currentInitials = await avatarElement.getText();
        assert.equal(currentInitials, nameInitial + lastnameInitial);
    }
}

module.exports = { MembersCreationPageObject };