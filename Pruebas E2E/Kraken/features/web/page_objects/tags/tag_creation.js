const { BasePageObject } = require('../base_page_object');

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
}

module.exports = { TagCreationPageObject };
