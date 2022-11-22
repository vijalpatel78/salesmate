const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/05_product/07_massOperations/01_massUpdate/screenshots/';

async function findListField(driver,fieldNumber) {
    let listField;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        listField = await driver.findElement(By.xpath(`//ul[@role='tree']/li[2]/ul/li[${fieldNumber}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'selectFieldDropdown_NotFound.png');
        await assert.fail(err);
    }
    return listField;
}exports.findListField = findListField;

async function findSelectConditionDropdown(driver) {
    let selectConditionDropdown;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        selectConditionDropdown = await driver.findElement(By.xpath('//div[2]/span//b[@role="presentation"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'selectConditionDropdown_NotFound.png');
        await assert.fail(err);
    }
    return selectConditionDropdown;
}exports.findSelectConditionDropdown = findSelectConditionDropdown;

async function findListCondition(driver,conditionNumber) {
    let listCondition;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        listCondition = await driver.findElement(By.xpath(`//ul[@role='tree']/li[${conditionNumber}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listCondition_NotFound.png');
        await assert.fail(err);
    }
    return listCondition;
}exports.findListCondition = findListCondition;