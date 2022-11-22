const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/01_signUp/screenshots/';

async function findModuleIcon(driver,moduleName) {
    let moduleIcon;
    try {
        moduleIcon = await driver.wait(until.elementLocated(By.xpath(`//span[@class="icon-ic_${moduleName}"]`)), 10000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+moduleName+'_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(moduleIcon));
    await driver.sleep(3000);
    return moduleIcon;
}exports.findModuleIcon = findModuleIcon;

async function findAddModuleButton(driver,buttonName) {
    let addModuleButton;
    try {
        addModuleButton = await driver.wait(until.elementLocated(By.xpath(`//button[text()="${buttonName} "]`)), 10000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'add'+buttonName+'_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(addModuleButton));
    await driver.sleep(1000);
    return addModuleButton;
}exports.findAddModuleButton = findAddModuleButton;

async function findManageColumns(driver) {
    let manageColumns;
    try {
        manageColumns = await driver.wait(until.elementLocated(By.xpath('//button[@tooltip="Manage Columns"]')), 10000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'manageColumn_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(manageColumns));
    await driver.sleep(2000);
    return manageColumns;
}exports.findManageColumns = findManageColumns;

async function findDealToolTip(driver) {
    let dealToolTip;
    try {
        dealToolTip = await driver.wait(until.elementLocated(By.xpath('//button[@tooltip="List"]')), 10000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealManageColumns_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(dealToolTip));
    await driver.sleep(500);
    return dealToolTip;
}exports.findDealToolTip = findDealToolTip;

async function findDealManageColumns(driver) {
    let manageColumns;
    try {
        manageColumns = await driver.wait(until.elementLocated(By.xpath('//button[@tooltip="Manage Columns"]')), 10000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealManageColumns_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(manageColumns));
    await driver.sleep(2000);
    return manageColumns;
}exports.findDealManageColumns = findDealManageColumns;

async function findContactOrCompanyName(driver,indexNumber) {
    let contactOrCompanyName;
    try {
        contactOrCompanyName = await driver.wait(until.elementLocated(By.xpath(`(//a[@class="entity-show-link text-ellipsis"])[${indexNumber}]`)), 10000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactOrCompanyName_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(contactOrCompanyName));
    await driver.sleep(2000);
    return contactOrCompanyName;
}exports.findContactOrCompanyName = findContactOrCompanyName;

async function findDealName(driver,indexNumber) {
    let dealName;
    try {
        dealName = await driver.wait(until.elementLocated(By.xpath(`(//a[@class="entity-show-link"])[${indexNumber}]`)), 10000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealName_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(dealName));
    await driver.sleep(2000);
    return dealName;
}exports.findDealName = findDealName;