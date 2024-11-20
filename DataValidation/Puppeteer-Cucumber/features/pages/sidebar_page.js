const { timeout } = require("puppeteer");
const properties = require("../../properties");
const constants = require("../support/constants");
const scope = require("../support/scope");

class SidebarPageObject {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(section) {
    const sectionPaths = {
      posts: "/posts",
      pages: "/pages",
      dashboard: "/dashboard",
      tags: "/tags",
      members: "/members",
    };

    const path = sectionPaths[section] || "";
    await scope.page.goto(properties.BASE_URL + path, {
      waitUntil: "networkidle0",
      timeout: 20000,
    });
  }
}

module.exports = SidebarPageObject;
