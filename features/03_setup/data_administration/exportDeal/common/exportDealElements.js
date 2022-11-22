const {By} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/03_setup/data_administration/exportContact/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findDealExportModule(driver) {
    let contactsExportModule;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        contactsExportModule = await driver.findElement(By.xpath('//div[text()=" Deal "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealExportModule_NotFound.png');
        await assert.fail("As deals export module is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return contactsExportModule;
}exports.findDealExportModule = findDealExportModule;

async function findDealIcon(driver) {
    let dealIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        dealIcon = await driver.findElement(By.xpath('//span[@class="icon-ic_deal"]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealIcon_NotFound.png');
        await assert.fail("As deal icon is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return dealIcon;
}exports.findDealIcon = findDealIcon;

async function findAssociatedContactsCheckbox(driver) {
    let associatedContactsCheckbox;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        associatedContactsCheckbox = await driver.findElement(By.id('PrimaryCompany.associatedContacts'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'associatedContactsCheckbox_NotFound.png');
        await assert.fail("As associated contacts checkbox is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return associatedContactsCheckbox;
}exports.findAssociatedContactsCheckbox = findAssociatedContactsCheckbox;

async function findLastNameCheckbox(driver) {
    let lastNameCheckbox;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        lastNameCheckbox = await driver.findElement(By.id('PrimaryContact.lastName'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'lastNameCheckbox_NotFound.png');
        await assert.fail("As last name checkbox is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return lastNameCheckbox;
}exports.findLastNameCheckbox = findLastNameCheckbox;