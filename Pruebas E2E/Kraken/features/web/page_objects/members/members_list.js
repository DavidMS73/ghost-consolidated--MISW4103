const { BasePageObject } = require('../base_page_object');

class MembersListPageObject extends BasePageObject {
    async clickNewMemberButton() {
        const element = await this.driver.$('a[href="#/members/new/"]');
        await element.click();
    }
}

module.exports = { MembersListPageObject };