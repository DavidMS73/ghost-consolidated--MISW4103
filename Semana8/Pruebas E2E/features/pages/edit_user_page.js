const { waitUtil } = require('../utils/utils');
const assert = require('assert');
const properties = require('../../properties');

class EditUserPageObject {
  fields = Object.freeze({
    fullName: 3,
    email: 4,
    slug: 5,
    location: 6
  });

  constructor(page) {
    this.page = page;
  }

  async setField(field, value) {
    const input = await this.getInput(field);
    await waitUtil(500);

    await input.click({ clickCount: 3 });
    await waitUtil(500);

    if (value.length === 0) {
      await input.press('Backspace');
    }

    await input.type(value);
  }

  async clickSaveChangesButton() {
    const buttons = await this.page.$$('button > span');

    for (const button of buttons) {
      const text = await button.evaluate(node => node.innerText);
      if (text === 'Save') {
        await button.click();
        break;
      }
    }

    await waitUtil(500);
  }

  async validateErrorMessageIsShown(message) {
    const selector = 'span';

    await this.page.waitForSelector(selector);
    const spans = await this.page.$$(selector);

    for (const span of spans) {
      const text = await span.evaluate(node => node.innerText);
      if (text === message) {
        return true;
      }
    }

    assert.fail("Error message not found");
  }

  async validateUserNameIsUpdated(userName) {
    await this.page.waitForSelector('h1');
    const h1 = await this.page.$('h1');

    const text = await h1.evaluate(node => node.innerText);
    assert.strictEqual(text, userName);
  }

  async validateEmailIsUpdated(email) {
    await this.page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

    const input = await this.getInput('email');
    const value = await input.evaluate(node => node.value);
    assert.strictEqual(value, email);
  }

  async restoreEmail() {
    await this.setField("email", properties.EMAIL);
    await this.clickSaveChangesButton();
  }

  async validateSlugIsUpdated(slug) {
    const profileButtonSelector = "button.ml-2.inline-block.text-sm.font-bold.text-green";

    await this.page.waitForSelector(profileButtonSelector);
    await this.page.click(profileButtonSelector);
    await waitUtil(500);

    const slugInput = await this.getInput('slug');
    const value = await slugInput.evaluate(node => node.value);
    assert.strictEqual(value, slug);
  }

  async validateLocationIsUpdated(location) {
    await this.page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

    const locationInput = await this.getInput('location');
    const value = await locationInput.evaluate(node => node.value);
    assert.strictEqual(value, location);
  }

  async getInput(field) {
    await this.page.waitForSelector('input');
    const inputs = await this.page.$$('input');

    return inputs[this.fields[field]];
  }
}

module.exports = EditUserPageObject;