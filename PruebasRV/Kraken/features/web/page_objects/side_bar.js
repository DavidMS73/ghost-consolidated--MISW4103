const { BasePageObject } = require('./base_page_object');

class SideBarPageObject extends BasePageObject {
    async clickSideBarPagesSection() {
        const element = await this.driver.$('a[href="#/pages/"]');
        await element.click();
    }

    async clickSideBarTagsSection() {
        const element = await this.driver.$('a[href="#/tags/"]');
        await element.click();
    }

    async clickSideBarPostsSection() {
        const element = await this.driver.$('a[href="#/posts/"]');
        await element.click();
    }

    async clickSideBarMembersSection() {
        const element = await this.driver.$('a[href="#/members/"]');
        await element.click();
    }
}

module.exports = { SideBarPageObject };
