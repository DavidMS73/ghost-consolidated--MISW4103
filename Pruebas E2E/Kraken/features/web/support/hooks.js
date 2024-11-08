const { After, Before, } = require("@cucumber/cucumber");
const { WebClient } = require('kraken-node');
const { PageCreationPageObject } = require('../page_objects/page_creation');
const { PagesListPageObject } = require('../page_objects/pages_list');
const { SideBarPageObject } = require('../page_objects/side_bar');

Before(async function() {
  this.deviceClient = new WebClient('edge', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  this.pageCreationPO = new PageCreationPageObject(this.driver);
  this.pageListPO = new PagesListPageObject(this.driver);
  this.sideBarPO = new SideBarPageObject(this.driver);
})

After(async function() {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});
