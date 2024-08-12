const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/05_product/02_addProduct/screenshots/';

async function clickOnProductName(driver,productName) {
    let clickOnProduct;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        clickOnProduct = await driver.findElement(By.xpath(`//a[text()=" ${productName} "]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'productName_NotFound.png');
        await assert.fail(err);
    }
    return clickOnProduct;
}exports.clickOnProductName = clickOnProductName;

async function clickOnQuickPageTabs(driver,tabName) {
    let clickOnQuickPageTabs;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        clickOnQuickPageTabs = await driver.findElement(By.xpath(`//a[text()="${tabName}"]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'quickPageTabs_NotFound.png');
        await assert.fail("As "+tabName+" is not found,so test case has been aborted");
    }
    return clickOnQuickPageTabs;
}exports.clickOnQuickPageTabs = clickOnQuickPageTabs;

async function findQuickViewPageCloseIcon(driver) {
    let closeIcon;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        closeIcon = await driver.findElement(By.xpath('//div[2]/div[@class="material-header quickview-header"]/a'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'quickViewPageCloseIcon_NotFound.png');
        await assert.fail(err);
    }
    return closeIcon;
}exports.findQuickViewPageCloseIcon = findQuickViewPageCloseIcon;

async function findAddProductFields(driver,IdName) {
    let addProductFields;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        addProductFields = await driver.findElement(By.id(`${IdName}`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addProductFields_NotFound.png');
        await assert.fail("As add product fields of "+IdName+" is not found,so test case has been aborted");
    }
    return addProductFields;
}exports.findAddProductFields = findAddProductFields;