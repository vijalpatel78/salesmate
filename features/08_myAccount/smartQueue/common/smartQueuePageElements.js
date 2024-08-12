const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of smart queue page on the browser 
 *  and then return those elements 
*/

async function findSmartQueueTab(driver,screenshotPath){
    let smartQueueTab;

    await driver.manage().setTimeouts({implicit:15000});
    try{
        smartQueueTab = await driver.findElement(By.css('a[href="#/app/user/activitySmartQueue"]'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SmartQueueTab_NotFound.png');
        await assert.fail('Due to the smart queue tab is not found, this test case is not possible to execute. To view smart queue tab, the Twilio or RingCentral app must be configred on the Salesmate link. Screenshot Name: \''+screenshotPath+'SmartQueueTab_NotFound.png\'');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});

    await driver.wait(until.elementIsVisible(smartQueueTab));
    return smartQueueTab;
}exports.findSmartQueueTab=findSmartQueueTab;

async function findAutoDialCheckbox(driver,screenshotPath){
    let autoDialCheckbox;

    try{
        autoDialCheckbox = await driver.findElement(By.id('isAutoDialEnabled'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AutoDialCheckbox_NotFound.png');
        await assert.fail('Due to the auto-dial checkbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AutoDialCheckbox_NotFound.png\'.');
    }

    return autoDialCheckbox;
}exports.findAutoDialCheckbox=findAutoDialCheckbox;

async function findAutoDialTimerField(driver,screenshotPath){
    let autoDialTimerField;

    try{
        autoDialTimerField = await driver.findElement(By.id('autoDialingWaitingTime'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AutoDialTimerField_NotFound.png');
        await assert.fail('Due to the auto-dial timer field is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AutoDialTimerField_NotFound.png\'.');
    }

    await driver.wait(until.elementIsVisible(autoDialTimerField));
    return autoDialTimerField;
}exports.findAutoDialTimerField=findAutoDialTimerField;

async function findManageRingTimeField(driver,screenshotPath){
    let manageRingTimeField;

    try{
        manageRingTimeField = await driver.findElement(By.id('ringingTime'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ManageRingTimeField_NotFound.png');
        await assert.fail('Due to the manage ring time field is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ManageRingTimeField_NotFound.png\'.');
    }

    await driver.wait(until.elementIsVisible(manageRingTimeField));
    return manageRingTimeField;
}exports.findManageRingTimeField=findManageRingTimeField;

async function findFieldValidationMessage(driver,screenshotPath,field){
    let fieldValidationMessage;

    try{
        fieldValidationMessage = await field.findElement(By.xpath('following::sm-validation-messages[1]/div[1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'FieldValidationMessage_NotFound.png');
        await assert.fail('Due to the field validation message is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(fieldValidationMessage));
    return fieldValidationMessage;
}exports.findFieldValidationMessage=findFieldValidationMessage;