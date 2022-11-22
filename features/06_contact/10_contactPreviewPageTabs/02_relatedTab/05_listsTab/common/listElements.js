const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/10_contactPreviewPageTabs/02_relatedTab/05_listsTab/screenshots/';
const elementSearchTimeout = require('../../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findSideArrow(driver) {
    let sideArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        sideArrow = await driver.findElement(By.xpath('//div[6]/div/section-title//span')).click();
        await driver.sleep(5000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'fileSideArrow_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return sideArrow;
}exports.findSideArrow = findSideArrow;

async function findAddFileIcon(driver) {
    let addFileIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addFileIcon = await driver.findElement(By.xpath('//sm-list-widget//section-title//a')).click();
        await driver.sleep(3000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addFileIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addFileIcon;
}exports.findAddFileIcon = findAddFileIcon;

async function findDownArrow(driver) {
    let downArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        downArrow = await driver.findElement(By.xpath('//sm-list-widget//section-title/h4/span[1]')).click();
        await driver.sleep(5000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'downArrow_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return downArrow;
}exports.findDownArrow = findDownArrow;

async function findListDropDownTextBox(driver) {
    let listDropDown;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        listDropDown = await driver.findElement(By.xpath('//add-contact-to-list//ul//input[@role="textbox"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listDropDown_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return listDropDown;
}exports.findListDropDownTextBox = findListDropDownTextBox;

async function findListDropDown(driver,listIndex) {
    let listDropDown;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        await driver.findElement(By.xpath('//add-contact-to-list//ul//input[@role="textbox"]')).click();
        await driver.sleep(1000);
        listDropDown = await driver.findElement(By.xpath(`//ul[@role="tree"]/li[${listIndex}]`)).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listDropDown_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return listDropDown;
}exports.findListDropDown = findListDropDown;

async function findSaveButton(driver) {
    let downArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        downArrow = await driver.findElement(By.id('btnSave')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'saveButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return downArrow;
}exports.findSaveButton = findSaveButton;

async function findCancelButton(driver) {
    let cancelButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        cancelButton = await driver.findElement(By.xpath('//button[@class="btn btn-default pull-right"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'cancelButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return cancelButton;
}exports.findCancelButton = findCancelButton;

async function findAddToListButton(driver) {
    let addToListButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addToListButton = await driver.findElement(By.xpath('//button[text()=" Add to List "]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addToListButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addToListButton;
}exports.findAddToListButton = findAddToListButton;

async function findAddToListCloseIcon(driver) {
    let addToListCloseIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addToListCloseIcon = await driver.findElement(By.xpath('//ngb-modal-window//button[@class="close"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addToListCloseIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addToListCloseIcon;
}exports.findAddToListCloseIcon = findAddToListCloseIcon;

async function findListRemoveIcon(driver) {
    let listRemoveIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        listRemoveIcon = await driver.findElement(By.xpath('//sm-list-widget//i[@class="icon-close"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listRemoveIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return listRemoveIcon;
}exports.findListRemoveIcon = findListRemoveIcon;

async function findListRemoveConfirmationButton(driver,confirmationButton) {
    let listRemoveConfirmationButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        listRemoveConfirmationButton = await driver.findElement(By.xpath(`//button[text()="${confirmationButton}"]`)).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listRemoveConfirmationButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return listRemoveConfirmationButton;
}exports.findListRemoveConfirmationButton = findListRemoveConfirmationButton;