const { BasePageObject } = require("../base_page_object");

class PostListPageObject extends BasePageObject {
  async clickNewPostButton() {
    const element = await this.driver.$('a[href="#/editor/post/"]');
    await element.click();
  }

  async goToScheduledPosts() {
    const element1 = await this.driver.$('a[href="#/posts/"]');
    await element1.click();
    await new Promise((r) => setTimeout(r, 500));
    const element2 = await this.driver.$('a[href="#/posts/?type=scheduled"]');
    await element2.click();
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

  async goToPublishedPosts() {
    const element1 = await this.driver.$('a[href="#/posts/"]');
    await element1.click();
    const element2 = await this.driver.$('a[href="#/posts/?type=published"]');
    await element2.click();
  }
}

module.exports = { PostListPageObject };
