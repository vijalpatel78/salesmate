const {Given,When,Then} = require('@cucumber/cucumber');
const {By} = require('selenium-webdriver');
const assert = require('assert');
const appsPageElementsObj = require('../../common/appsPageElements');
const commonElementsObj = require('../../../../../00_common/webElements/commonElements');
const commonActionObj = require('../../common/actions');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/GEOLocation/screenshots/';
let expectedContactValue, expectedCompanyValue, expectedDealValue, expectedActivityValue;

Given('the Geo Location app is uninstalled', async () =>{
    //will uninstall the Geo Location app
    await commonActionObj.uninstallApp(driver,screenshotPath,'Geo Location Tracking');
});

Given('the Geo Location app is installed', async () =>{
    //will install the Geo Location app
    await commonActionObj.installApp(driver,'Geo Location Tracking');
});

When('the user clicks on the Install button of Geo Location app', async () =>{
    //will install the Geo Location app
    await commonActionObj.installApp(driver,'Geo Location Tracking');
});

When('the user clicks on the Configure button of Geo Location app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Geo Location Tracking');
});

When('Contact creation: {string}', async (value) =>{
    //will find the 06_contact creation toggle button
    const contactToggleBtn = await commonElementsObj.findToggleButton(driver,screenshotPath,'isEnabledForContact');
    const currentValue = await contactToggleBtn.getAttribute('value');
    const toggleBtn = await contactToggleBtn.findElements(By.xpath('following-sibling::i'));
    //will click on the button 
    if(value.toLowerCase() != currentValue){
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
    }else{
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
    }
    await driver.sleep(1000);
    expectedContactValue = value.toLowerCase();
});

When('Company creation: {string}', async (value) =>{
    //will find the Company creation toggle button
    const companyToggleBtn = await commonElementsObj.findToggleButton(driver,screenshotPath,'isEnabledForCompany');
    const currentValue = await companyToggleBtn.getAttribute('value');
    const toggleBtn = await companyToggleBtn.findElements(By.xpath('following-sibling::i'));
    //will click on the button 
    if(value.toLowerCase() != currentValue){
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
    }else{
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
    }
    await driver.sleep(1000);
    expectedCompanyValue = value.toLowerCase();
});

When('Deal creation: {string}', async (value) =>{
    //will find the Deal creation toggle button
    const dealToggleBtn = await commonElementsObj.findToggleButton(driver,screenshotPath,'isEnabledForDeal');
    const currentValue = await dealToggleBtn.getAttribute('value');
    const toggleBtn = await dealToggleBtn.findElements(By.xpath('following-sibling::i'));
    //will click on the button 
    if(value.toLowerCase() != currentValue){
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
    }else{
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
    }
    await driver.sleep(1000);
    expectedDealValue = value.toLowerCase();
});

When('Activity creation: {string}', async (value) =>{
    //will find the Activity creation toggle button
    const activityToggleBtn = await commonElementsObj.findToggleButton(driver,screenshotPath,'isEnabledForTask');
    const currentValue = await activityToggleBtn.getAttribute('value');
    const toggleBtn = await activityToggleBtn.findElements(By.xpath('following-sibling::i'));
    //will click on the button 
    if(value.toLowerCase() != currentValue){
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
    }else{
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
        await driver.executeScript("arguments[0].click()",toggleBtn[0]);
    }
    await driver.sleep(1000);
    expectedActivityValue = value.toLowerCase();
});

Then('the Geo Location app should get installed', async () =>{
    //will check the app is get installed or not
    try{
        await appsPageElementsObj.findAppRemoveBtn(driver,screenshotPath);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'GeoLocationApp_Not_Installed.png');
        assert.fail('The Geo Location app is not getting installed. Screenshot Name: \''+screenshotPath+'GeoLocationApp_Not_Installed.png\'.');
    }

    console.log('The Geo Location app has been installed successfully...');
    const appsTab = await appsPageElementsObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Geo Location app should get uninstalled', async () =>{
    //will check the app is get uninstalled or not
    const installBtn = await appsPageElementsObj.findAppInstallBtn(driver,'Geo Location Tracking');
    if(installBtn.length > 0){
        console.log('The Geo Location app has been uninstalled successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'GeoLocationApp_Not_Uninstalled.png');
        assert.fail('The Geo Location app is not getting uninstalled. Screenshot Name: \''+screenshotPath+'GeoLocationApp_Not_Uninstalled.png\'.');
    }
});

Then('the Geo Location settings should get updated', async () =>{
    let fieldName;

    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Geo Location Tracking');
    await driver.sleep(2000);

    //will get the actual value of all fields
    const contactToggleBtn = await commonElementsObj.findToggleButton(driver,screenshotPath,'isEnabledForContact');
    const actualContactValue = await contactToggleBtn.getAttribute('value');
    const companyToggleBtn = await commonElementsObj.findToggleButton(driver,screenshotPath,'isEnabledForCompany');
    const actualCompanyValue = await companyToggleBtn.getAttribute('value');
    const dealToggleBtn = await commonElementsObj.findToggleButton(driver,screenshotPath,'isEnabledForDeal');
    const actualDealValue = await dealToggleBtn.getAttribute('value');
    const activityToggleBtn = await commonElementsObj.findToggleButton(driver,screenshotPath,'isEnabledForTask');
    const actualActivityValue = await activityToggleBtn.getAttribute('value');

    //will check the settings is get updated or not
    try{
        fieldName = 'ContactCreation';
        assert.strictEqual(actualContactValue,expectedContactValue);
        fieldName = 'CompanyCreation';
        assert.strictEqual(actualCompanyValue,expectedCompanyValue);
        fieldName = 'DealCreation';
        assert.strictEqual(actualDealValue,expectedDealValue);
        fieldName = 'ActivityCreation';
        assert.strictEqual(actualActivityValue,expectedActivityValue);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'_FieldData_NotUpdated.png');
        assert.fail('The \''+fieldName+'\' field data is not updated. Screenshot Name: \''+screenshotPath+fieldName+'_FieldData_NotUpdated.png\'.');
    }

    console.log('The Geo Location settings has been updated with ContactCreation:'+actualContactValue+', CompanyCreation: '+actualCompanyValue+', DealCreation: '+actualDealValue+' and ActivityCreation: '+actualActivityValue+'...');
    const appsTab = await appsPageElementsObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});