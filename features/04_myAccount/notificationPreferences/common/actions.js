const {until} = require('selenium-webdriver');
const assert = require('assert');
const sharedElementsObj = require('../../../00_common/actions/commonActions');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const notificationPreferenceElementsObj = require('./notificationPreferencesPageElements');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');

//will navigate on the dashboard page and then come back to the notification preferences page
async function comeBackToNotificationPreferencesPage(driver,screenshotPath){
    await driver.sleep(1000);
    await sharedElementsObj.clickOnSecurity();
    await driver.sleep(1000);
    await notificationPreferenceElementsObj.clickOnNotificationPreference(driver,screenshotPath);
    await driver.wait(until.urlContains('app/user/notificationPreferences'),10000);
}exports.comeBackToNotificationPreferencesPage=comeBackToNotificationPreferencesPage;

async function openNotificationPreferencePage(driver,screenshotPath){
    //will open my account page
    await openMyAccountPageObj.openMyAccountPage(driver,screenshotPath);

    //will find 'Notification Preferences' tab and then click on that
    const notificationTab = await notificationPreferenceElementsObj.clickOnNotificationPreference(driver,screenshotPath);
    await notificationTab.click();
     
    //will verify whether the Notification Preferences page found or not
    const currentPageURL = await driver.getCurrentUrl();
    console.log(currentPageURL);
    try{
        await currentPageURL.endsWith('app/user/notificationPreferences');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/notificationPreferencesPage_NotFound.png');
        await assert.fail('Due to the notification preferences page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/notificationPreferencesPage_NotFound.png\'');
    }

    console.log('The notification preferences page has been opened successfully...');
}exports.openNotificationPreferencePage=openNotificationPreferencePage;