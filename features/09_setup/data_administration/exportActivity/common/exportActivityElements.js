const {By} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/03_setup/data_administration/exportActivity/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findTasksExportModule(driver) {
    let tasksExportModule;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        tasksExportModule = await driver.findElement(By.xpath('//div[text()=" Activities "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'tasksExportModule_NotFound.png');
        await assert.fail("As tasks export module is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return tasksExportModule;
}exports.findTasksExportModule = findTasksExportModule;

async function findActivityIcon(driver) {
    let activityIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        activityIcon = await driver.findElement(By.xpath('//span[@class="icon-ic_activity"]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activityIcon_NotFound.png');
        await assert.fail("As activity icon is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return activityIcon;
}exports.findActivityIcon = findActivityIcon;

async function findModuleTab(driver,moduleName) {
    let moduleTab;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        moduleTab = await driver.findElement(By.xpath(`//button[contains(text(),"${moduleName}")]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+moduleName+'_NotFound.png');
        await assert.fail("As "+moduleName+" is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return moduleTab;
}exports.findModuleTab = findModuleTab;

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

async function findTitleCheckbox(driver) {
    let titleCheckbox;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        titleCheckbox = await driver.findElement(By.id('Deal.title'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'titleCheckbox_NotFound.png');
        await assert.fail("As title checkbox is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return titleCheckbox;
}exports.findTitleCheckbox = findTitleCheckbox;

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
