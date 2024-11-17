const { BasePageObject } = require("../base_page_object");

class PostCreationPageObject extends BasePageObject {
  async fillPostTitle(title) {
    const element = await this.driver.$('textarea[placeholder="Post Title"]');
    await element.setValue(title);
  }

  async fillPostDescription(description) {
    const element = await this.driver.$(
      'div[class^="koenig-editor"] > div:nth-child(1)'
    );
    await element.setValue(description);
  }

  async clickPostScheduleForLater() {
    const options = await this.driver.$$("div.gh-publishmenu-radio");
    options[1].click();
  }

  async clickPostSetItLiveNow() {
    const options = await this.driver.$$("div.gh-publishmenu-radio");
    options[0].click();
  }

  async uploadFeatureImage(route) {
    // Espera a que el botón "Add feature image" esté disponible en la página
    const element1 = await this.driver.$(
      "button.gh-editor-feature-image-add-button"
    );
    await element1.click();

    const element2 = await this.driver.$('input[type="file"]');
    await element2.setValue(route);
  }
}

module.exports = { PostCreationPageObject };
