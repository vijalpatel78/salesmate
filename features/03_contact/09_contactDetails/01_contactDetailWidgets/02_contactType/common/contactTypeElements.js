const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/09_contactDetails/01_contactDetailWidgets/02_contactType/screenshots/';

async function findContactTypeElement(driver) {
    let contactTypeElement;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        contactTypeElement = await driver.findElement(By.xpath('//contact-type/div[1]/div/contact-type-formatted//span//span'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactTypeElement_NotFound.png');
        await assert.fail(err);
    }
    return contactTypeElement;
}exports.findContactTypeElement = findContactTypeElement;

async function findContactTypeColor(driver,colorIndex) {
    let contactTypeColor;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        contactTypeColor = await driver.findElement(By.xpath(`//div[@class="highlight-tag-block m-b-sm"]//li[${colorIndex}]`));
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactTypeColor_NotFound.png');
        await assert.fail(err);
    }
    return contactTypeColor;
}exports.findContactTypeColor = findContactTypeColor;

async function findContactTypeEditButton(driver,contactTypeIndex) {
    let contactTypeEditButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        contactTypeEditButton = await driver.findElement(By.xpath(`//contact-type/div[1]//div//ul/li[${contactTypeIndex}]/span/span/i`));
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactTypeEditButton_NotFound.png');
        await assert.fail(err);
    }
    return contactTypeEditButton;
}exports.findContactTypeEditButton = findContactTypeEditButton;

async function findCancelButton(driver) {
    let cancelButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        cancelButton = await driver.findElement(By.xpath('//manage-contact-type//button[@type="button"]'));
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'cancelButton_NotFound.png');
        await assert.fail(err);
    }
    return cancelButton;
}exports.findCancelButton = findCancelButton;

async function findContactTypeDeleteButton(driver) {
    let contactTypeDeleteButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        contactTypeDeleteButton = await driver.findElement(By.xpath('//manage-contact-type//h6/a[2]/i'));
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactTypeDeleteButton_NotFound.png');
        await assert.fail(err);
    }
    return contactTypeDeleteButton;
}exports.findContactTypeDeleteButton = findContactTypeDeleteButton;

async function findContactType(driver,contactTypeIndex) {
    let contactType;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        contactType = await driver.findElement(By.xpath(`//ul/li[${contactTypeIndex}]/span/a/contact-type-formatted//span//span`));
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactType_NotFound.png');
        await assert.fail(err);
    }
    return contactType;
}exports.findContactType = findContactType;