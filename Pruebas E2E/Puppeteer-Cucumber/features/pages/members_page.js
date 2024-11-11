class MembersPageObject {
  constructor(page) {
    this.page = page;
  }

  async clickCreateMemberButton() {
    await this.page.waitForSelector('a[href="#/members/new/"]');
    await this.page.click('a[href="#/members/new/"]');
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillEmail(email) {
    await this.page.waitForSelector('#member-email');
    await this.page.type('#member-email', email);
    await new Promise((r) => setTimeout(r, 500));
  }

  async fillName(name) {
    await this.page.waitForSelector('#member-name');
    await this.page.type('#member-name', name);
    await new Promise((r) => setTimeout(r, 500));
  }

  async clickSaveMemberButton() {
    await this.page.waitForSelector('button[data-test-button="save"]');
    await this.page.click('button[data-test-button="save"]');
    await new Promise((r) => setTimeout(r, 500));
  }

  async goToMembersList() {
    await this.page.waitForSelector('a[href="#/members/"]');
    await this.page.click('a[href="#/members/"]');
    await new Promise((r) => setTimeout(r, 500));
  }

  async checkMemberInList(emailToCheck) {
    await this.page.waitForSelector("h3.gh-members-list-name");
    const emails = await this.page.$$("h3.gh-members-list-name");
    for (const email of emails) {
      const emailText = await this.page.evaluate((htmlTag) => htmlTag.innerText, email);
      if (emailText === emailToCheck) return true;
    }

    return false;
  } 

  async checkErrorMessageByMissingEmail() {
    await this.page.waitForSelector("div.gh-cp-member-email-name > div.form-group.max-width.error > p");
    const error = await this.page.$("div.gh-cp-member-email-name > div.form-group.max-width.error > p");
    const errorText = await this.page.evaluate((htmlTag) => htmlTag.innerText, error);
    return errorText === "Please enter an email.";
  }

  async checkAvatarInitials(first, last) {
    await this.page.waitForSelector("span.gh-member-avatar-label");
    const avatar = await this.page.$("span.gh-member-avatar-label");
    const avatarText = await this.page.evaluate((htmlTag) => htmlTag.innerText, avatar);
    return avatarText === first + last;
  }

  async unfocusFormField() {
    await this.page.waitForSelector("h2");
    await this.page.click("h2");
    await new Promise((r) => setTimeout(r, 500));
  }
}

module.exports = MembersPageObject;
