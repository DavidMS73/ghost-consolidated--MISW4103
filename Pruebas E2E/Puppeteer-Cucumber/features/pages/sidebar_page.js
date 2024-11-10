const constants = require("../support/constants");
const scope = require("../support/scope");

class SidebarPageObject {
  constructor(page) {
    this.page = page;
  }
  async navigateTo(section) {
    if (section === "posts") {
      await scope.page.goto(constants.baseUrl + "/posts", {
        waitUntil: "networkidle0",
      });
    } else if (section === "pages") {
      await scope.page.goto(constants.baseUrl + "/posts", {
        waitUntil: "networkidle0",
      });
    } else if (section === "dashboard") {
      await scope.page.goto(constants.baseUrl + "/dashboard", {
        waitUntil: "networkidle0",
      });
    } else
      await scope.page.goto(constants.baseUrl, {
        waitUntil: "networkidle0",
      });
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
  }
}

module.exports = SidebarPageObject;
