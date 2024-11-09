const { BasePageObject } = require("./base_page_object");

class LoginPageObject extends BasePageObject {
    async login(email, pass) {
        const emailElement = await this.driver.$('input[id="identification"]');
        await emailElement.setValue(email);
        const passElement = await this.driver.$('input[id="password"]');
        await passElement.setValue(pass);
        const loginBtn = await this.driver.$('button[data-test-button="sign-in"]');
        await loginBtn.click();
    }
}

module.exports = { LoginPageObject };
