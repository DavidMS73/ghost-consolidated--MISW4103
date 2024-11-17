class PostPageObject {
  constructor(page) {
    this.page = page;
  }

  async clickNewPostButton() {
    const selector = 'a[href="#/editor/post/"]';
    // Espera a que el botón "New post" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de creación de un post dando clic en el botón "New post"
    await this.page.click(selector);
  }

  async fillPostTitle(title) {
    const selector = 'textarea[placeholder="Post Title"]';
    // Espera a que el campo de título esté disponible en la página
    await this.page.waitForSelector(selector);
    // Ingresa el título en el campo de título
    await this.page.type(selector, title);
  }

  async fillPostDescription(description) {
    const selector = 'div[class^="koenig-editor"] > div:nth-child(1)';
    // Espera a que el campo de descripción esté disponible en la página
    await this.page.waitForSelector(selector);
    // Ingresa la descripción en el campo de descripción
    await this.page.type(selector, description);
  }

  async clickPostScheduleForLater() {
    //Seleccionar la opción de programar la publicación
    await this.page.evaluate(() => {
      const options = Array.from(
        document.querySelectorAll("div.gh-publishmenu-radio")
      );
      options[1].click();
    });
  }

  async clickPostSetItLiveNow() {
    //Seleccionar la opción de programar la publicación
    await this.page.evaluate(() => {
      const options = Array.from(
        document.querySelectorAll("div.gh-publishmenu-radio")
      );
      options[0].click();
    });
  }

  async deployCollapsePostsMenu() {
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector(
      'button[aria-label="Expand custom post types"]'
    );
    // Navega a la página de programación de publicación de un post dando clic en el botón "Publish"
    await this.page.click('button[aria-label="Expand custom post types"]');
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
  }

  async goToScheduledPosts() {
    const selector = 'a[href="#/posts/"]';
    // Espera a que el botón "Scheduled" esté disponible en la página
    await this.page.waitForSelector(selector);
    // Navega a la página de posts programados dando clic en el botón "Scheduled"
    await this.page.click(selector);
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
    const selector2 = 'a[href="#/posts/?type=scheduled"]';
    await this.page.click(selector2);
  }

  async checkPostInList(titleParam) {
    // Espera a que se carguen todos los elementos h3 con la clase especificada
    await this.page.waitForSelector("h3.gh-content-entry-title");
    // Obtiene todos los elementos h3 con la clase especificada
    const h3Titles = await this.page.$$("h3.gh-content-entry-title");
    // Itera sobre los elementos y verifica si alguno coincide con el título proporcionado
    for (const h3Title of h3Titles) {
      const title = await this.page.evaluate((h3) => h3.innerText, h3Title);
      if (title === titleParam) return true; // True si encuentra el título
    }
    return false; // False si no encuentra el título
  }

  async goToPublishedPosts() {
    const selector = 'a[href="#/posts/"]';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await new Promise((r) => setTimeout(r, 500));
    const selector2 = 'a[href="#/posts/?type=published"]';
    await this.page.click(selector2);
  }

  async uploadFeatureImage(route) {
    // Espera a que el botón "Add feature image" esté disponible en la página
    await this.page.waitForSelector(
      "button.gh-editor-feature-image-add-button"
    );

    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click("button.gh-editor-feature-image-add-button"),
    ]);

    await fileChooser.accept([route]);
  }
}

module.exports = PostPageObject;
