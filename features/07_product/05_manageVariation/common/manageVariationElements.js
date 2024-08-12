const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/05_product/05_manageVariation/screenshots/';

async function findVariationNameField(driver) {
    let variationNameField;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        variationNameField = await driver.findElement(By.xpath('//ngb-modal-window[2]//input[@id="name"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'variationNameField_NotFound.png');
        await assert.fail(err);
    }
    return variationNameField;
}exports.findVariationNameField = findVariationNameField;

async function findSaveButton(driver) {
    let addVariationSaveButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        addVariationSaveButton = await driver.findElement(By.xpath('//ngb-modal-window[2]//button[@id="btnSubmit"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'saveButton_NotFound.png');
        await assert.fail(err);
    }
    return addVariationSaveButton;
}exports.findSaveButton = findSaveButton;

async function findEditVariationButton(driver,rowNumber) {
    let editVariationButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        editVariationButton = await driver.findElement(By.xpath(`//tr[${rowNumber}]/td[3]/a[1]/i[@class='icon-pencil2']`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editVariationButton_NotFound.png');
        await assert.fail(err);
    }
    return editVariationButton;
}exports.findEditVariationButton = findEditVariationButton;

async function findUpdateVariationButton(driver) {
    let updateVariationButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        updateVariationButton = await driver.findElement(By.xpath('//ngb-modal-window[2]//button[@id="btnSubmit"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editVariationButton_NotFound.png');
        await assert.fail(err);
    }
    return updateVariationButton;
}exports.findUpdateVariationButton = findUpdateVariationButton;

async function findDeletePriceButton(driver,rowNumber) {
    let deletePriceButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        deletePriceButton = await driver.findElement(By.xpath(`//tr[${rowNumber}]/td[3]/a[2]/i[@class="icon-trash"]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deletePriceButton_NotFound.png');
        await assert.fail(err);
    }
    return deletePriceButton;
}exports.findDeletePriceButton = findDeletePriceButton;

async function findVariationDeleteButton(driver,rowNumber) {
    let variationDeleteButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        variationDeleteButton = await driver.findElement(By.xpath(`//div[${rowNumber}]/div[1]/div[@class='pull-right']/button[3]/i[@class='icon-trash']`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'variationDeleteButton_NotFound.png');
        await assert.fail(err);
    }
    return variationDeleteButton;
}exports.findVariationDeleteButton = findVariationDeleteButton;