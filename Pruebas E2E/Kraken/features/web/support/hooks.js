const { After, Before, } = require("@cucumber/cucumber");
const { WebClient } = require('kraken-node');
const {
  PageCreationPageObject,
  PagesListPageObject,
  SideBarPageObject,
  LoginPageObject,
} = require('../page_objects/page_objects');

Before(async function() {
  this.deviceClient = new WebClient('edge', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  this.pageCreationPO = new PageCreationPageObject(this.driver);
  this.pageListPO = new PagesListPageObject(this.driver);
  this.sideBarPO = new SideBarPageObject(this.driver);
  this.loginPO = new LoginPageObject(this.driver);
})

After(async function() {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});
