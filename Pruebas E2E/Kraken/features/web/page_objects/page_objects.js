const { PageCreationPageObject } = require('./pages/page_creation');
const { PagesListPageObject } = require('./pages/pages_list');
const { LoginPageObject } = require('./login');
const { SideBarPageObject } = require('./side_bar');
const { TagsCreationPageObject } = require('./tags/tags_creation');

module.exports = {
    PageCreationPageObject,
    PagesListPageObject,
    LoginPageObject,
    SideBarPageObject,
    TagsCreationPageObject
};
