const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');

/*  All these following functions will find elements of email signature page on the browser 
 *  and then return those elements 
*/

async function findEmailSettingsTab(driver,screenshotPath){
    let emailSettingsTab;

    try{
        emailSettingsTab = await driver.findElement(By.css('a[href="#/app/user/emailSettings"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSettingsTab_NotFound.png');
        await assert.fail('Due to the email settings tab is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'EmailSettingsTab_NotFound.png\''); 
    }

    await driver.wait(until.elementIsVisible(emailSettingsTab));
    return emailSettingsTab;
}exports.findEmailSettingsTab=findEmailSettingsTab;

async function findEmailSignatureTab(driver,screenshotPath){
    let emailSignatureTab;

    try{
        emailSignatureTab = await driver.findElement(By.css('a[href="#/app/user/emailSettings/signature"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignatureTab_NotFound.png');
        await assert.fail('Due to the email signature tab is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'EmailSignatureTab_NotFound.png\''); 
    }

    await driver.wait(until.elementIsVisible(emailSignatureTab));
    return emailSignatureTab;
}exports.findEmailSignatureTab=findEmailSignatureTab;