const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/09_contactDetails/04_editContactDetails/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findCustomizeFieldsIcon(driver) {
    let customizeFieldsIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        customizeFieldsIcon = await driver.findElement(By.xpath('//sm-detail-widget//h4/span[1]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'customizeFieldsIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return customizeFieldsIcon;
}exports.findCustomizeFieldsIcon = findCustomizeFieldsIcon;

async function findCurrentFieldCloseIcon(driver,fieldIndex) {
    let currentFieldCloseIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        currentFieldCloseIcon = await driver.findElement(By.xpath(`//ul[@id="currentFields"]/li[${fieldIndex}]/a/span[@class="icon-close"]`));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'currentFieldCloseIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return currentFieldCloseIcon;
}exports.findCurrentFieldCloseIcon = findCurrentFieldCloseIcon;

async function findManageFieldsBackButton(driver) {
    let manageFieldsBackButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        manageFieldsBackButton = await driver.findElement(By.xpath('//span[@class="icon-ic_bold_prev_arrow"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'manageFieldsBackButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return manageFieldsBackButton;
}exports.findManageFieldsBackButton = findManageFieldsBackButton;

async function findSearchField(driver) {
    let searchField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        searchField = await driver.findElement(By.xpath('//input[@placeholder="Search Fields"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'searchField_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return searchField;
}exports.findSearchField = findSearchField;

async function findExpandOrCollapseArrow(driver) {
    let expandOrCollapseArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        expandOrCollapseArrow = await driver.findElement(By.xpath('//h4/span[4]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'expandOrCollapseArrow_NotFound.png');
        await assert.fail("As expand or collapse button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return expandOrCollapseArrow;
}exports.findExpandOrCollapseArrow = findExpandOrCollapseArrow;

async function findEditLink(driver,editIndex) {
    let editLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editLink = await driver.findElement(By.xpath(`//sm-display-widget-value[${editIndex}]/div/div[1]/a`));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editLink_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editLink;
}exports.findEditLink = findEditLink;

async function findEditContactFields(driver,id) {
    let editContactFields;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editContactFields = await driver.findElement(By.id(`${id}`));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editContactFields_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editContactFields;
}exports.findEditContactFields = findEditContactFields;

async function findEditFieldSaveButton(driver,fieldIndex) {
    let editFieldSaveButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editFieldSaveButton = await driver.findElement(By.xpath(`//section-body/sm-display-widget-value[${fieldIndex}]/div/div[1]/a[2]`));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editFieldSaveButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editFieldSaveButton;
}exports.findEditFieldSaveButton = findEditFieldSaveButton;