const { BasePageObject } = require("../base_page_object");

class PostListPageObject extends BasePageObject {
  async clickNewPostButton() {
    const element = await this.driver.$('a[data-test-new-post-button=""]');
    await element.click();
    await new Promise((r) => setTimeout(r, 500));
  }

  async deployCollapsePostsMenu() {
    // Espera a que el botón "Publish" esté disponible en la página
    const element = await this.driver.$(
      'button[aria-label="Expand custom post types"]'
    );
    // Navega a la página de programación de publicación de un post dando clic en el botón "Publish"
    await element.click();
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 500));
  }

  async goToScheduledPosts() {
    // Espera a que el botón "Scheduled" esté disponible en la página
    const element = await this.driver.$('a[href="#/posts/?type=scheduled"]');
    // Navega a la página de posts programados dando clic en el botón "Scheduled"
    await element.click();
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 1000));
  }

  async checkPostInList(titleParam) {
    // Espera a que se carguen todos los elementos h3 con la clase especificada
    const allH3 = await this.driver.$$("h3.gh-content-entry-title");
    for (let h3 of allH3) {
      const h3Text = await h3.getText();
      if (h3Text === titleParam) {
        return true;
      }
    }
    return false; // False si no encuentra el título
  }
}

module.exports = { PostListPageObject };
