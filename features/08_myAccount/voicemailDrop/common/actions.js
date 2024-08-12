const assert = require('assert');
const {until} = require('selenium-webdriver');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const commonActionObj = require('../../../00_common/actions/commonActions')
const voicemailPageElementObj = require('../common/voicemailPageElements');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');

async function openVoicemailDropPage(driver,screenshotPath){
    //will open the my account page
    await openMyAccountPageObj.openMyAccountPage(driver,screenshotPath);

    //will find 'voicemail drop' tab and then click on that
    const voicemailDropTab = await voicemailPageElementObj.findVoicemailDropTab(driver,screenshotPath);
    await voicemailDropTab.click();
    await driver.sleep(2000);

    //will verify whether the voicemail drop page found or not
    try{
        await driver.wait(until.urlContains('app/user/voicemailDrop'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'VoicemailDropPage_NotFound.png');
        await assert.fail('Due to the voicemail drop page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'VoicemailDropPage_NotFound.png\'');
    }

    console.log('The voicemail drop page has been opened successfully...');
}exports.openVoicemailDropPage=openVoicemailDropPage;

//will navigate on the security page and then come back to the voicemail drop page
async function comeBackToVoicemailDropPage(driver,screenshotPath){
    await commonActionObj.clickOnSecurity();
    const voicemailDropTab = await voicemailPageElementObj.findVoicemailDropTab(driver,screenshotPath);
    await voicemailDropTab.click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/user/voicemailDrop'),10000);
}exports.comeBackToVoicemailDropPage=comeBackToVoicemailDropPage;