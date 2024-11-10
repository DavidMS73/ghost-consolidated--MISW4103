const { After, Before, } = require("@cucumber/cucumber");
const { WebClient } = require('kraken-node');
const {
  PageCreationPageObject,
  PagesListPageObject,
  SideBarPageObject,
  LoginPageObject,
  TagsListPageObject,
  TagCreationPageObject
} = require('../page_objects/page_objects');

Before(async function() {
  this.deviceClient = new WebClient('chrome', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  // Common
  this.loginPO = new LoginPageObject(this.driver);
  this.sideBarPO = new SideBarPageObject(this.driver);
  // Page
  this.pageCreationPO = new PageCreationPageObject(this.driver);
  this.pageListPO = new PagesListPageObject(this.driver);
  // Tags
  this.tagListPO = new TagsListPageObject(this.driver);
  this.tagCreationPO = new TagCreationPageObject(this.driver);
})

After(async function() {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});
