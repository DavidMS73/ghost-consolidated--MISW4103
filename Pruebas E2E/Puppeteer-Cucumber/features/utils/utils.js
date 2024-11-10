const wait = (millis) => new Promise(resolve => {
    setTimeout(resolve, millis);
});

const getText = async (page, selector) => {
    const element = await page.$(selector);
    return await page.evaluate(e => e.textContent.trim(), element);
};

module.exports = { wait, getText };
