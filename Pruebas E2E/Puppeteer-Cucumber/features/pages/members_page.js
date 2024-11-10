class MembersPageObject {
  constructor(page) {
    this.page = page;
  }

  async createPost() {
    // Espera a que el botón "New post" esté disponible en la página
    await this.page.waitForSelector('a[data-test-new-post-button=""]');
    // Navega a la página de creación de un post dando clic en el botón "New post"
    await this.page.click('a[data-test-new-post-button=""]');
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillTitle(title) {
    // Espera a que el campo de título esté disponible en la página
    await this.page.waitForSelector('textarea[placeholder="Post title"]');
    // Ingresa el título en el campo de título
    await this.page.type('textarea[placeholder="Post title"]', title);
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillDescription(description) {
    // Espera a que el campo de descripción esté disponible en la página
    await this.page.waitForSelector('div[data-kg="editor"] > div');
    // Ingresa la descripción en el campo de descripción
    await this.page.type('div[data-kg="editor"] > div', description);
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
  }

  async clickPublishPost() {
    // Espera a que el botón "Publish" esté disponible en la página
    await this.page.waitForSelector('button[data-test-button="publish-flow"]');
    // Navega a la página de programación de publicación de un post dando clic en el botón "Publish"
    await this.page.click('button[data-test-button="publish-flow"]');
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
  }

  async publishPostLater() {
    // Espera a que el botón "Right now" esté disponible en la página
    await this.page.waitForSelector(
      'div[data-test-setting="publish-at"] > button'
    );
    // Da click en la lista desplegable de programación de publicación
    await this.page.click('div[data-test-setting="publish-at"] > button');

    //Seleccionar la opción de programar la publicación
    await this.page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      const label = labels.find(
        (label) => label.textContent.trim() === "Schedule for later"
      );
      label.click();
    });

    // Esperar a que el botón "Continue, final review" esté disponible en la página
    await this.page.waitForSelector('button[data-test-button="continue"]');
    // Continúa con la publicación haciendo clic en el botón "Continue"
    await this.page.click('button[data-test-button="continue"]');

    // Espera a que el botón "Publish post, right now" esté disponible en la página
    await this.page.waitForSelector(
      'button[data-test-button="confirm-publish"]'
    );
    // Publica el post haciendo clic en el botón "Publish post, right now"
    await this.page.click('button[data-test-button="confirm-publish"]');

    await new Promise((r) => setTimeout(r, 1000));

    // Espera a que el botón "Close" del modal esté disponible en la página
    await this.page.waitForSelector("button.dismiss");
    // Cierra el modal haciendo clic en el botón "Close"
    await this.page.click("button.dismiss");

    await new Promise((r) => setTimeout(r, 1000));
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
    // Espera a que el botón "Scheduled" esté disponible en la página
    await this.page.waitForSelector('a[href="#/posts/?type=scheduled"]');
    // Navega a la página de posts programados dando clic en el botón "Scheduled"
    await this.page.click('a[href="#/posts/?type=scheduled"]');
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 1000));
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

  async publishPostNow() {
    // Espera a que el botón "Right now" esté disponible en la página
    await this.page.waitForSelector(
      'div[data-test-setting="publish-at"] > button'
    );
    // Da click en la lista desplegable de programación de publicación
    await this.page.click('div[data-test-setting="publish-at"] > button');

    //Seleccionar la opción de programar la publicación
    await this.page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      const label = labels.find(
        (label) => label.textContent.trim() === "Set it live now"
      );
      label.click();
    });

    // Esperar a que el botón "Continue, final review" esté disponible en la página
    await this.page.waitForSelector('button[data-test-button="continue"]');
    // Continúa con la publicación haciendo clic en el botón "Continue"
    await this.page.click('button[data-test-button="continue"]');

    // Espera aa que el botón "Publish post, right now" esté disponible en la página
    await this.page.waitForSelector(
      'button[data-test-button="confirm-publish"]'
    );
    // Publica el post haciendo clic en el botón "Publish post, right now"
    await this.page.click('button[data-test-button="confirm-publish"]');

    await new Promise((r) => setTimeout(r, 1000));

    // Espera a que el botón "Close" del modal esté disponible en la página
    await this.page.waitForSelector("button.close");
    // Cierra el modal haciendo clic en el botón "Close"
    await this.page.click("button.close");

    await new Promise((r) => setTimeout(r, 1000));
  }

  async goToPublishedPosts() {
    // Espera a que el botón "Scheduled" esté disponible en la página
    await this.page.waitForSelector('a[href="#/posts/?type=published"]');
    // Navega a la página de posts programados dando clic en el botón "Scheduled"
    await this.page.click('a[href="#/posts/?type=published"]');
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
  }

  async uploadFeatureImage(route) {
    // Espera a que el botón "Add feature image" esté disponible en la página
    await this.page.waitForSelector('button.gh-editor-feature-image-add-button');

    const [fileChooser] =  await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click('button.gh-editor-feature-image-add-button')
  ]);

    await fileChooser.accept([route]);
  }

  
}

module.exports = MembersPageObject;
