const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/05_product/04_managePrices/screenshots/';

async function findEditPriceButton(driver,rowNumber,colNumber) {
    let editPriceButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        editPriceButton = await driver.findElement(By.css(`tr:nth-of-type(${rowNumber}) > td:nth-of-type(${colNumber}) > .default-text.m-r > .icon-pencil2`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPriceButton_NotFound.png');
        await assert.fail(err);
    }
    return editPriceButton;
}exports.findEditPriceButton = findEditPriceButton;

async function findEditPriceUpdateButton(driver) {
    let editPriceUpdateButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        editPriceUpdateButton = await driver.findElement(By.xpath('//ngb-modal-window[2]//button[@id="btnSubmit"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPriceUpdateButton_NotFound.png');
        await assert.fail(err);
    }
    return editPriceUpdateButton;
}exports.findEditPriceUpdateButton = findEditPriceUpdateButton;

async function findDeletePriceButton(driver,rowNumber,colNumber) {
    let deletePriceButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        deletePriceButton = await driver.findElement(By.css(`tr:nth-of-type(${rowNumber}) > td:nth-of-type(${colNumber}) > .default-text > .icon-trash`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deletePriceButton_NotFound.png');
        await assert.fail(err);
    }
    return deletePriceButton;
}exports.findDeletePriceButton = findDeletePriceButton;