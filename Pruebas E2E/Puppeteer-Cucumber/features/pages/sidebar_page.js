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
    });

    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
  }
}

module.exports = SidebarPageObject;
