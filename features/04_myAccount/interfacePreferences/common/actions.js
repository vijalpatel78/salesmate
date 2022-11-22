const assert = require('assert');
const {until} = require('selenium-webdriver');
const sharedElementsObj = require('../../../00_common/actions/commonActions');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const interfacePreferenceElementsObj = require('./interfacePreferencesPageElements');

//will navigate on the dashboard page and then come back to the interface preferences page
async function comeBackToInterfacePreferencesPage(driver,screenshotPath){
    await sharedElementsObj.clickOnSecurity();
    await driver.sleep(500);
    const interfacePreferenceTab = await interfacePreferenceElementsObj.clickOnInterfacePreference(driver,screenshotPath);
    await interfacePreferenceTab.click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/user/interfacePreferences'),10000);
}exports.comeBackToInterfacePreferencesPage=comeBackToInterfacePreferencesPage;

async function openInterfacePreferencePage(driver,screenshotPath){
    //will open my account page
    await openMyAccountPageObj.openMyAccountPage(driver,screenshotPath);

    //will find 'Interface Preferences' tab and then click on that
    const interfacePreferenceTab = await interfacePreferenceElementsObj.clickOnInterfacePreference(driver,screenshotPath);
    await interfacePreferenceTab.click();
    await driver.sleep(2000);
    //will verify whether the Interface Preferences page found or not
    try{
        await driver.wait(until.urlContains('app/user/interfacePreferences'), 10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/interfacePreferencesPage_NotFound.png');
        await assert.fail('Due to the interface preferences page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/interfacePreferencesPage_NotFound.png\'');
    }

    console.log('The interface preferences page has been opened successfully...');
}exports.openInterfacePreferencePage=openInterfacePreferencePage;