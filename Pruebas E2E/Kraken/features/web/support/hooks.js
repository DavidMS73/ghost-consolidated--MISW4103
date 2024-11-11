const { After, Before } = require("@cucumber/cucumber");
const { WebClient } = require("kraken-node");
const {
  PageCreationPageObject,
  PagesListPageObject,
  SideBarPageObject,
  LoginPageObject,
  TagsListPageObject,
  TagCreationPageObject,
  PostListPageObject,
  PostCreationPageObject,
  MembersCreationPageObject,
  MembersListPageObject,
  PostViewCreationPageObject,
  CommonPageObject,
} = require("../page_objects/page_objects");

Before(async function () {
  this.deviceClient = new WebClient("chrome", {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  // Common
  this.loginPO = new LoginPageObject(this.driver);
  this.commonPO = new CommonPageObject(this.driver);
  this.sideBarPO = new SideBarPageObject(this.driver);
  // Page
  this.pageCreationPO = new PageCreationPageObject(this.driver);
  this.pageListPO = new PagesListPageObject(this.driver);
  // Tags
  this.tagListPO = new TagsListPageObject(this.driver);
  this.tagCreationPO = new TagCreationPageObject(this.driver);
  // Posts
  this.postCreationPO = new PostCreationPageObject(this.driver);
  this.postListPO = new PostListPageObject(this.driver);
  // Posts Views
  this.postViewCreationPO = new PostViewCreationPageObject(this.driver);
  // Members
  this.membersCreationPO = new MembersCreationPageObject(this.driver);
  this.membersListPO = new MembersListPageObject(this.driver);
});

After(async function () {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});
