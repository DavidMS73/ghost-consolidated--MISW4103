const { BasePageObject } = require('../base_page_object');
const { assert } = require('chai');

class TagsListPageObject extends BasePageObject {
    async clickNewTagButton() {
        const element = await this.driver.$('a[href="#/tags/new/"]');
        await element.click();
    }

    async validateTagNameIsInTagList(tagName) {
        const selector = 'ol[class^="tags-list"] > li > a:nth-child(1) > h3';
        let containsName = false;
        for await (const element of this.driver.$$(selector)) {
            const text = await element.getText();
            if (text === tagName) {
                containsName = true;
                break;
            }
        }
        assert.equal(containsName, true);
    }

    async validateTagSlug({
        tagName,
        tagSlug,
        startsWith = false,
    }) {
        const selector = 'ol[class^="tags-list"] > li > a:nth-child(1) > h3';
        let containsName = false;
        for await (const element of this.driver.$$(selector)) {
            const text = await element.getText();
            if (text === tagName) {
                containsName = true;
                const parentLink = await element.parentElement();
                const parentList = await parentLink.parentElement();
                const slugSpan = await parentList.$('a:nth-child(2) > span');
                const slugText = await slugSpan.getText();
                if (startsWith) {
                    assert.equal(slugText.startsWith(tagSlug), true);
                } else {
                    assert.equal(slugText, tagSlug);
                }
                break;
            }
        }
        assert.equal(containsName, true);
    }

    async validateTagNameIsInTagListNTimes(tagName, times) {
        const selector = 'ol[class^="tags-list"] > li > a:nth-child(1) > h3';
        let counter = 0;
        for await (const element of this.driver.$$(selector)) {
            const text = await element.getText();
            if (text === tagName) {
                counter++;
            }
        }
        assert.equal(counter <= times, true);
    }
}

module.exports = { TagsListPageObject };
