class BasePageObject {
    constructor(page) {
        this.page = page;
    }

    async clickElement(selector) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }
}

module.exports = { BasePageObject };
