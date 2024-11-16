const { BasePageObject } = require("../base_page_object");
const { assert } = require("chai");

class PageViewPageObject extends BasePageObject {
    async validatePageTitle(title) {
        const element =
            await this.driver.$('h1[class="article-title"]');
        const text = await element.getText();
        assert.equal(text, title);
    }

    async validatePageContent(content) {
        const element =
            await this.driver.$(
                'section[class^="gh-content"] > p'
            );
        const text = await element.getText();
        assert.equal(text, content);
    }
}

module.exports = { PageViewPageObject };
