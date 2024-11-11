const { BasePageObject } = require("../base_page_object");

class PostCreationPageObject extends BasePageObject {
  async fillPostTitle(title) {
    const element = await this.driver.$('textarea[placeholder="Post title"]');
    await element.setValue(title);
  }

  async fillPostDescription(description) {
    const element = await this.driver.$('div[data-kg="editor"] > div');
    await element.setValue(description);
  }

  async clickPostTimeOptions() {
    const element = await this.driver.$(
      'div[data-test-setting="publish-at"] > button'
    );
    await element.click();
  }

  async clickPostScheduleForLater() {
    const allLabels = await this.driver.$$("label");
    for (let label of allLabels) {
      const labelText = await label.getText();
      if (labelText.trim() === "Schedule for later") {
        label.click();
        break;
      }
    }
  }

  async clickPostSetItLiveNow() {
    const allLabels = await this.driver.$$("label");
    for (let label of allLabels) {
      const labelText = await label.getText();
      if (labelText.trim() === "Set it live now") {
        label.click();
        break;
      }
    }
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
