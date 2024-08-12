const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/09_contactDetails/08_listWidget/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findListRemoveIcon(driver,listIndex) {
    let listRemoveIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        listRemoveIcon = await driver.findElement(By.xpath(`//div/div/div[${listIndex}]/div/span/a/i[@class='icon-close']`)).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listRemoveIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return listRemoveIcon;
}exports.findListRemoveIcon = findListRemoveIcon;

async function findRemoveConfirmButton(driver,confirmButtonText) {
    let removeConfirmButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        removeConfirmButton = await driver.findElement(By.xpath(`//button[text()="${confirmButtonText}"]`)).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'removeConfirmButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return removeConfirmButton;
}exports.findRemoveConfirmButton = findRemoveConfirmButton;