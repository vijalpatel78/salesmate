const {By} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/03_setup/data_administration/exportContact/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findContactsExportModule(driver) {
    let contactsExportModule;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        contactsExportModule = await driver.findElement(By.xpath('//div[text()=" Contacts "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactExportModule_NotFound.png');
        await assert.fail("As contacts export module is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return contactsExportModule;
}exports.findContactsExportModule = findContactsExportModule;

async function findContactIcon(driver) {
    let contactIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        contactIcon = await driver.findElement(By.xpath('//span[@class="icon-ic_contacts"]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactIcon_NotFound.png');
        await assert.fail("As 06_contact icon is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return contactIcon;
}exports.findContactIcon = findContactIcon;

async function findModuleTab(driver,moduleName) {
    let moduleTab;
    await driver.manage().setTimeouts({implicit:20000});
    try {
        moduleTab = await driver.findElement(By.xpath(`//button[contains(text()," ${moduleName} ")]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+moduleTab+'_NotFound.png');
        await assert.fail("As "+moduleName+" is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return moduleTab;
}exports.findModuleTab = findModuleTab;

async function findSelectAllLink(driver) {
    let selectAllLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        selectAllLink = await driver.findElement(By.xpath('//a[text()="Select All"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'selectAllLink_NotFound.png');
        await assert.fail("As select all link is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return selectAllLink;
}exports.findSelectAllLink = findSelectAllLink;

async function findExportButton(driver) {
    let exportButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        exportButton = await driver.findElement(By.xpath('//a[text()="Export "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'exportButton_NotFound.png');
        await assert.fail("As export button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return exportButton;
}exports.findExportButton = findExportButton;

async function findSearchField(driver) {
    let searchField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        searchField = await driver.findElement(By.xpath('//input[@placeholder="Search Fields"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'searchField_NotFound.png');
        await assert.fail("As search field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return searchField;
}exports.findSearchField = findSearchField;

async function findAssociatedContactsCheckbox(driver) {
    let associatedContactsCheckbox;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        associatedContactsCheckbox = await driver.findElement(By.id('Company.associatedContacts'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'associatedContactsCheckbox_NotFound.png');
        await assert.fail("As associated contacts checkbox is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return associatedContactsCheckbox;
}exports.findAssociatedContactsCheckbox = findAssociatedContactsCheckbox;

async function findLastModifiedByCheckbox(driver) {
    let lastModifiedByCheckbox;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        lastModifiedByCheckbox = await driver.findElement(By.id('lastModifiedBy'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'lastModifiedByCheckbox_NotFound.png');
        await assert.fail("As last modified by checkbox is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return lastModifiedByCheckbox;
}exports.findLastModifiedByCheckbox = findLastModifiedByCheckbox;
