const { When } = require("@cucumber/cucumber");

// When

When(
  "I login with email {kraken-string} and password {kraken-string}",
  async function (email, pass) {
    await this.loginPO.login(email, pass);
  }
);
