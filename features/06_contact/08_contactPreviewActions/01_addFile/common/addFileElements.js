const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/08_contactPreviewActions/01_addFile/screenshots/';

async function findFileOpenArrow(driver){
    let fileOpenArrow;
    await driver.manage().setTimeouts({implicit:10000});
    try{
        fileOpenArrow = await driver.findElement(By.xpath('//sm-file-list//section/section-title//span'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'fileOpenArrow_NotFound.png');
        await assert.fail(err);
    }
    return fileOpenArrow;
}exports.findFileOpenArrow=findFileOpenArrow;

async function findRelatedRemoveOption(driver,fileIndex){
    let relatedRemoveOption;
    await driver.manage().setTimeouts({implicit:10000});
    try{
        relatedRemoveOption = await driver.findElement(By.xpath(`//ul//li[${fileIndex}]/div[1]/div/a`));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'relatedRemoveOption_NotFound.png');
        await assert.fail(err);
    }
    return relatedRemoveOption;
}exports.findRelatedRemoveOption=findRelatedRemoveOption;