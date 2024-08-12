const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/10_contactPreviewPageTabs/02_relatedTab/02_dealsTab/screenshots/';

async function findDealCloseIcon(driver) {
    let dealCloseIcon;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        dealCloseIcon = await driver.findElement(By.xpath('//ngb-modal-window[2]//button[@class="close"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealCloseIcon_NotFound.png');
        await assert.fail(err);
    }
    return dealCloseIcon;
}exports.findDealCloseIcon = findDealCloseIcon;

async function findSideArrow(driver) {
    let sideArrow;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        sideArrow = await driver.findElement(By.xpath('//div[1]/div/section-title//span'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'sideArrow_NotFound.png');
        await assert.fail(err);
    }
    return sideArrow;
}exports.findSideArrow = findSideArrow;

async function findDownArrow(driver) {
    let downArrow;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        downArrow = await driver.findElement(By.xpath('//sm-deal-list//section-title/h4/span[1]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'downArrow_NotFound.png');
        await assert.fail(err);
    }
    return downArrow;
}exports.findDownArrow = findDownArrow;

async function findAddDealIcon(driver) {
    let addDealIcon;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        addDealIcon = await driver.findElement(By.xpath('//div[1]/div/section-title//a'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addDealIcon_NotFound.png');
        await assert.fail(err);
    }
    return addDealIcon;
}exports.findAddDealIcon = findAddDealIcon;

async function findSaveButton(driver) {
    let saveButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        saveButton = await driver.findElement(By.xpath('//add-deal/div/sm-button[2]/sm-element//button[@id="btnSubmit"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'saveButton_NotFound.png');
        await assert.fail(err);
    }
    return saveButton;
}exports.findSaveButton = findSaveButton;

async function findDealOptions(driver) {
    let dealOptions;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        dealOptions = await driver.findElement(By.css('.otherdetail > span:nth-of-type(1)'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealOptions_NotFound.png');
        await assert.fail(err);
    }
    return dealOptions;
}exports.findDealOptions = findDealOptions;

async function findDealRemoveAction(driver) {
    let removeAction;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        removeAction = await driver.findElement(By.xpath('//i[@class="icon-more-squares-vertical-filled"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'removeAction_NotFound.png');
        await assert.fail(err);
    }
    return removeAction;
}exports.findDealRemoveAction = findDealRemoveAction;