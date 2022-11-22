const assert = require('assert');
const {until} = require('selenium-webdriver');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const emailSignaturePageElementObj = require('./emailSignaturePageElements');
const emailPreferencesPageElementObj = require('../../emailPreferences/common/emailPreferencesPageElements')
const commonActionObj = require('../../../00_common/actions/commonActions');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');

//will navigate on the security page and then come back to the email signature page
async function comeBackToEmailSignaturePage(driver,screenshotPath){
    await commonActionObj.clickOnSecurity();
    const emailSettingsTab = await emailPreferencesPageElementObj.findEmailSettingsTab(driver,screenshotPath);
    await emailSettingsTab.click();
    await driver.sleep(1000);
    const emailSignatureTab = await emailSignaturePageElementObj.findEmailSignatureTab(driver,screenshotPath);
    await emailSignatureTab.click();
    await driver.sleep(1500);
    await driver.wait(until.urlContains('app/user/emailSettings/signature'),10000);
}exports.comeBackToEmailSignaturePage=comeBackToEmailSignaturePage;

async function openEmailSignaturePage(driver,screenshotPath){
    //will open the my account page
    await openMyAccountPageObj.openMyAccountPage(driver,screenshotPath);

    //will find 'email settings' tab and then click on that
    const emailSettingsTab = await emailSignaturePageElementObj.findEmailSettingsTab(driver,screenshotPath);
    await emailSettingsTab.click();
    await driver.sleep(2000);

    //will find 'email signature' tab and then click on that
    const emailSignatureTab = await emailSignaturePageElementObj.findEmailSignatureTab(driver,screenshotPath);
    await emailSignatureTab.click();
    await driver.sleep(2000);

    //will verify whether the email signature page found or not
    try{
        await driver.wait(until.urlContains('app/user/emailSettings/signature'),15000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignaturePage_NotFound.png');
        await assert.fail('Due to the email signature page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'EmailSignaturePage_NotFound.png\'.');
    }

    console.log('The email signature page has been opened successfully...');
}exports.openEmailSignaturePage=openEmailSignaturePage;