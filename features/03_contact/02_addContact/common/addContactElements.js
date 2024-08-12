const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/02_addContact/screenshots/';

async function findAddContactFields(driver,Id) {
    let addContactFields;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        addContactFields = await driver.findElement(By.id(`${Id}`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addContactFields_NotFound.png');
        await assert.fail(err);
    }
    return addContactFields;
}exports.findAddContactFields = findAddContactFields;

async function findCompanyField(driver) {
    let companyField;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        companyField = await driver.findElement(By.xpath('//sm-autocomplete/sm-element//ro-tag/div/input[@type="text"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'companyField_NotFound.png');
        await assert.fail(err);
    }
    return companyField;
}exports.findCompanyField = findCompanyField;

async function findTagsField(driver) {
    let tagsField;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        tagsField = await driver.findElement(By.xpath('//sm-tag/sm-element//ro-tag/div/input'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'tagsField_NotFound.png');
        await assert.fail(err);
    }
    return tagsField;
}exports.findTagsField = findTagsField;