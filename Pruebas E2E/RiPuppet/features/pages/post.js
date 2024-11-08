class PostPage {
  constructor(page) {
    this.page = page;
  }

  async createPost() {
    // Espera a que el botón "New post" esté disponible en la página
    await this.page.waitForSelector('a[data-test-new-post-button=""]');
    // Navega a la página de creación de un post dando clic en el botón "New post"
    await this.page.click('a[data-test-new-post-button=""]');
    // Espera para que la navegación se complete
    await new Promise((r) => setTimeout(r, 10000));
  }
}

module.exports = PostPage;
