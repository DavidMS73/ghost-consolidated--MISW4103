const { Given } = require("@cucumber/cucumber");

// Given

Given(
  "I login with email {kraken-string} and password {kraken-string}",
  async function (email, pass) {
    await this.loginPO.login(email, pass);
  }
);
