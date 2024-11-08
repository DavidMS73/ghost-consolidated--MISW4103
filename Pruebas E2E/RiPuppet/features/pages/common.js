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
}

module.exports = LoginPage;
