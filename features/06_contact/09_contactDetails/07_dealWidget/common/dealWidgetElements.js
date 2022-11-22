const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/09_contactDetails/07_dealWidget/screenshots/';

async function findAddDealIcon(driver) {
    let addDealIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addDealIcon = await driver.findElement(By.xpath('//div[@id="rightSideWidgetContainer"]/sm-deal-list//a'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addDealIcon_NotFound.png');
        await assert.fail(err);
    }
    return addDealIcon;
}exports.findAddDealIcon = findAddDealIcon;

async function findExpandOrCollapseArrow(driver) {
    let expandOrCollapseArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        expandOrCollapseArrow = await driver.findElement(By.xpath('//sm-deal-list[1]//section-title/h4/span[1]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'expandOrCollapseArrow_NotFound.png');
        await assert.fail(err);
    }
    return expandOrCollapseArrow;
}exports.findExpandOrCollapseArrow = findExpandOrCollapseArrow;

async function findDealTitle(driver) {
    let dealTitle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        dealTitle = await driver.findElement(By.css('.breakword.flex-1.font-medium.font-size-sm.m-b-xs.primary-text-dark.text-ellipsis.title'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealTitle_NotFound.png');
        await assert.fail(err);
    }
    return dealTitle;
}exports.findDealTitle = findDealTitle;