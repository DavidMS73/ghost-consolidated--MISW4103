class BasePageObject {
    constructor(page) {
        this.page = page;
    }

    async clickElement(selector) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    async typeValue(selector, value, {
        clearInput = false,
    } = {}) {
        await this.page.waitForSelector(selector);
        if (clearInput) {
            await this.page.$eval(selector, el => el.value = '');
        }
        await this.page.click(selector);
        await this.page.type(selector, value);
    }
}

module.exports = { BasePageObject };
