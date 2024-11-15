const { BasePageObject } = require("./base_page_object");

class LoginPageObject extends BasePageObject {
    async login(email, pass) {
        const emailElement = await this.driver.$('input[name="identification"]');
        await emailElement.setValue(email);
        const passElement = await this.driver.$('input[name="password"]');
        await passElement.setValue(pass);
        const loginBtn = await this.driver.$('button[class^="login"]');
        await loginBtn.click();
    }
}

module.exports = { LoginPageObject };
