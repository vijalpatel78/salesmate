const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/10_emailTemplates/screenshots/';

async function findAddNewFolderIcon(driver) {
    let addNewFolderIcon;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        addNewFolderIcon = await driver.findElement(By.xpath('//i[@class="icon-ic_quick_add pull-right add-fill-icon"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addNewFolderIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(addNewFolderIcon));
    await driver.sleep(1000);
    return addNewFolderIcon;
}exports.findAddNewFolderIcon = findAddNewFolderIcon;

async function findActionsOption(driver,listNumber) {
    let actionsOption;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        actionsOption = await driver.findElement(By.xpath(`//div/div[1]/ul[2]/li[${listNumber}]/div/a/span`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'actionsOption_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(actionsOption));
    await driver.sleep(1000);
    return actionsOption;
}exports.findActionsOption = findActionsOption;

async function findEditOrDeleteLink(driver,folderNumber,actionNumber) {
    let editOrDeleteLink;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        editOrDeleteLink = await driver.findElement(By.xpath(`//div/div[1]/ul[2]/li[${folderNumber}]//ul/li[${actionNumber}]/a`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editOrDeleteLink_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(editOrDeleteLink));
    await driver.sleep(1000);
    return editOrDeleteLink;
}exports.findEditOrDeleteLink = findEditOrDeleteLink;

async function findFolderName(driver,folderName) {
    let folder;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        folder = await driver.findElement(By.xpath(`//a[text()="${folderName}"]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'confirmationPopupButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(folder));
    await driver.sleep(1000);
    return folder;
}exports.findFolderName = findFolderName;

async function findInsertAttribute(driver) {
    let folder;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        folder = await driver.findElement(By.xpath('//button[@id="insertAttribute-2"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'confirmationPopupButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(folder));
    await driver.sleep(1000);
    return folder;
}exports.findInsertAttribute = findInsertAttribute;

async function findModuleTab(driver) {
    let moduleTab;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        moduleTab = await driver.findElement(By.xpath('//popper-content[1]/div[@role="popper"]//insert-field-popper//button[2]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'moduleTab_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(moduleTab));
    await driver.sleep(1000);
    return moduleTab;
}exports.findModuleTab = findModuleTab;

async function findAllTemplatesBackLink(driver) {
    let allTemplatesBackLink;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        allTemplatesBackLink = await driver.findElement(By.xpath('//div[1]/div[2]/span/a'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'allTemplatesBackLink_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(allTemplatesBackLink));
    await driver.sleep(1000);
    return allTemplatesBackLink;
}exports.findAllTemplatesBackLink = findAllTemplatesBackLink;