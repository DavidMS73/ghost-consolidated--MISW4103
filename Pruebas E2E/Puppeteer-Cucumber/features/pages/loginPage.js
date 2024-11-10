class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(username, password) {
    // Espera a que el campo de texto "identification" esté disponible en la página
    await this.page.waitForSelector('input[name="identification"]');
    await this.page.type('input[name="identification"]', username);
    await this.page.type('input[name="password"]', password);
    await this.page.click('button.login[type="submit"]');
    await this.page.waitForNavigation({ waitUntil: "networkidle0" });
  }

  async isInLoginPage() {
    const selector = 'button.login[type="submit"]';
    const btnExists = await this.page.evaluate((selector) => {
      return document.querySelector(selector) !== null;
    }, selector);

    return btnExists;
  }

  async signOut() {
    await this.page.goto(`${constants.baseUrl}/ghost/#/signout`);
  }
}

module.exports = LoginPage;
