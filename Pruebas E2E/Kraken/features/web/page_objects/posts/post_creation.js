const { BasePageObject } = require("../base_page_object");

class PostCreationPageObject extends BasePageObject {
  async fillPostTitle(title) {
    const element = await this.driver.$('textarea[placeholder="Post title"]');
    await element.setValue(title);
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillPostDescription(description) {
    const element = await this.driver.$('div[data-kg="editor"] > div');
    await element.setValue(description);
    await new Promise((r) => setTimeout(r, 500));
  }

  async clickPublishPost() {
    const element = await this.driver.$(
      'button[data-test-button="publish-flow"]'
    );
    await element.click();
    await new Promise((r) => setTimeout(r, 500));
  }

  async publishPostLater() {
    const element = await this.driver.$(
      'div[data-test-setting="publish-at"] > button'
    );
    await element.click();

    await new Promise((r) => setTimeout(r, 1000));

    const allLabels = await this.driver.$$("label");
    for (let label of allLabels) {
      const labelText = await label.getText();
      if (labelText.trim() === "Schedule for later") {
        label.click();
        break;
      }
    }

    await new Promise((r) => setTimeout(r, 500));

    // Esperar a que el botón "Continue, final review" esté disponible en la página
    const element2 = await this.driver.$('button[data-test-button="continue"]');
    await element2.click();

    // Espera a que el botón "Publish post, right now" esté disponible en la página
    const element3 = await this.driver.$(
      'button[data-test-button="confirm-publish"]'
    );
    // Publica el post haciendo clic en el botón "Publish post, right now"
    await element3.click();

    await new Promise((r) => setTimeout(r, 1000));

    // Espera a que el botón "Close" del modal esté disponible en la página
    const element4 = await this.driver.$("button.dismiss");
    // Cierra el modal haciendo clic en el botón "Close"
    await element4.click();

    await new Promise((r) => setTimeout(r, 1000));
  }

  async publishPostNow() {
    // Espera a que el botón "Right now" esté disponible en la página
    const element = await this.driver.$(
      'div[data-test-setting="publish-at"] > button'
    );
    await element.click();

    await new Promise((r) => setTimeout(r, 1000));

    const allLabels = await this.driver.$$("label");
    for (let label of allLabels) {
      const labelText = await label.getText();
      if (labelText.trim() === "Set it live now") {
        label.click();
        break;
      }
    }

    await new Promise((r) => setTimeout(r, 500));

    // Esperar a que el botón "Continue, final review" esté disponible en la página
    const element2 = await this.driver.$('button[data-test-button="continue"]');
    await element2.click();

    // Espera a que el botón "Publish post, right now" esté disponible en la página
    const element3 = await this.driver.$(
      'button[data-test-button="confirm-publish"]'
    );
    // Publica el post haciendo clic en el botón "Publish post, right now"
    await element3.click();

    await new Promise((r) => setTimeout(r, 1000));

    // Espera a que el botón "Close" del modal esté disponible en la página
    const element4 = await this.driver.$("button.close");
    // Cierra el modal haciendo clic en el botón "Close"
    await element4.click();

    await new Promise((r) => setTimeout(r, 1000));
  }

}

module.exports = { PostCreationPageObject };
