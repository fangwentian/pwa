const puppeteer = require('puppeteer');

module.exports = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://hubble.netease.com/', {waitUntil: 'networkidle0'});
    await page.click('#login')
    await page.waitForSelector('#corp_id_for_corpid')
    await page.type('#corp_id_for_corpid', 'hzfangwentian')
    await page.type('#corp_id_for_corppw', 'Fang2222')
    await page.click('.tab-pane.active button[type="submit"]')
    await page.waitFor(3000)
    await page.screenshot({path: 'example.png'});

    await browser.close();
};