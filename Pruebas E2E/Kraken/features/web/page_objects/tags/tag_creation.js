const { BasePageObject } = require('../base_page_object');
const { assert } = require('chai');

class TagCreationPageObject extends BasePageObject {
    async fillName(name) {
        const element = await this.driver.$('input[data-test-input="tag-name"]');
        await element.setValue(name);
    }

    async fillSlug(slug) {
        const element = await this.driver.$('input[data-test-input="tag-slug"]');
        await element.setValue(slug);
    }

    async clickSaveButton() {
        const element = await this.driver.$('button[data-test-button="save"]');
        await element.click();
    }

    async clickExpandMetadataButton() {
        const element = await this.driver.$('section > div:nth-child(1) > div.gh-expandable-header > button');
        await element.click();
    }

    async fillMetadataTitleAndDescription(title, metadataDescription) {
        const element = await this.driver.$('#meta-title');
        await element.setValue(title);

        const descriptionTextArea = await this.driver.$('#meta-description');
        await descriptionTextArea.setValue(metadataDescription);
    }

    async checkNewTagTitle(title) {
        const titleElement = await this.driver.$('h2[data-test-screen-title]');
        const titleElementText = await titleElement.getText();
        assert.equal(titleElementText, title);
    }
}

module.exports = { TagCreationPageObject };
