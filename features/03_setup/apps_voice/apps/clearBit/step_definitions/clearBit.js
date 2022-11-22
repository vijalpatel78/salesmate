const {Given,When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const formElementObj = require('../../../../../00_common/webElements/formElements');
const appsPageElementObj = require('../../common/appsPageElements');
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const commonActionObj = require('../../common/actions');
const actionObj = require('../../common/actions');
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/clearBit/screenshots/';

let expectedKey, expectedContactImport, expectedGoogleImport, expectedAutoSubscribe;

Given('the ClearBit app is uninstalled', async () =>{
    //will uninstall the ClearBit app
    await actionObj.uninstallApp(driver,screenshotPath,'ClearBit');
});

Given('the ClearBit app is installed', async () =>{
    //will install the ClearBit app
    await commonActionObj.installApp(driver,'ClearBit');
});

When('the user clicks on the Configure button of ClearBit app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'ClearBit');
});

When('the user clicks on the Install button of ClearBit app', async () =>{
    //will install the ClearBit app
    await commonActionObj.installApp(driver,'ClearBit');
});

When('ClearBit API Key: {string}', async (key) =>{
    //will find the ClearBit API Key field
    const keyField = await formElementObj.findTextbox(driver,screenshotPath,'apiKeyInput');
    await clearFieldDataObj.clearFieldData(keyField);
    //will pass the new data
    await keyField.sendKeys(key);
    expectedKey = key;
});

When('Contacts Import: {string}', async (value) =>{
    try {
        value = value.toLowerCase() === 'true' ? '1' : 'false';
        //will find the contact import checkbox
        const contactImportCheckbox = await formElementObj.findCheckbox(driver, screenshotPath, 'csvExcelImport');
        //will get the current value of checkbox
        const currentValue = await contactImportCheckbox.getAttribute('value');
        //will click on the checkbox only when the current and expected values are different
        if (value.toLowerCase() !== currentValue) {
            await driver.executeScript("arguments[0].click();", contactImportCheckbox);
        } else {
            console.log('The value of Do you want ClearBit App to run while you import contacts using Excel/CSV? checkbox is already ' + currentValue + '...');
        }
        expectedContactImport = value;
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('Google Contacts Import: {string}', async (value) =>{
    try {
        value = value.toLowerCase() === 'true' ? '1' : 'false';
        //will find the google contact import checkbox
        const googleContactImportCheckbox = await formElementObj.findCheckbox(driver, screenshotPath, 'googleImport');
        //will get the current value of checkbox
        const currentValue = await googleContactImportCheckbox.getAttribute('value');
        //will click on the checkbox only when the current and expected values are different
        if (value.toLowerCase() !== currentValue) {
            await driver.executeScript("arguments[0].click();", googleContactImportCheckbox);
        } else {
            console.log('The value of Do you want ClearBit App to run while you import Google contacts? checkbox is already ' + currentValue + '...');
        }
        expectedGoogleImport = value;
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('Auto Subscribe: {string}', async (value) =>{
    try {
        value = value.toLowerCase() == 'true' ? '1' : 'false';
        //will find the Auto Subscribe checkbox
        const autoSubscribeCheckbox = await formElementObj.findCheckbox(driver, screenshotPath, 'autoSubscribe');
        //will get the current value of checkbox
        const currentValue = await autoSubscribeCheckbox.getAttribute('value');
        //will click on the checkbox only when the current and expected values are different
        if (value.toLowerCase() != currentValue) {
            await driver.executeScript("arguments[0].click();", autoSubscribeCheckbox);
        } else {
            console.log('The value of auto subscribe checkbox is already ' + currentValue + '...');
        }
        expectedAutoSubscribe = value;
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should give the {string} validation message for the key field', async (validationMsg) =>{
    //will get the actual validation message of key field
    const keyField = await formElementObj.findTextbox(driver,screenshotPath,'apiKeyInput');
    const validationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,keyField);
    const actualValidationMsg = await validationElem.getText();

    //will check the validation message is as per the expectation or not
    try{
        assert.strictEqual(actualValidationMsg,validationMsg);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Key_FieldValidation_NotCorrect.png');
        assert.fail('Due to the key field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'Key_FieldValidation_NotCorrect.png\'.');
    }
    
    console.log('The \''+validationMsg+'\' validation messages is getting displayed...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the ClearBit app should get installed', async () =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);

    //will check the app is get installed or not
    const installedApp = await appsPageElementObj.findInstalledApp(driver,'ClearBit');
    if(installedApp.length > 0){
        await driver.wait(until.elementIsVisible(installedApp[0]));
        console.log('The clearBit app has been installed successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ClearBitApp_NotInstalled.png');
        assert.fail('Due to the clearBit app is not installed, the test case has been failed. Screenshot Name: \''+screenshotPath+'ClearBitApp_NotInstalled.png\'.');
    }

    //will click on the Configure button of clearBit app
    await commonActionObj.clickConfigureBtn(driver,'ClearBit');
    //will find the ClearBit API Key field
    const keyField = await formElementObj.findTextbox(driver,screenshotPath,'apiKeyInput');
    //will get the field data
    const actualKey = await keyField.getAttribute('value');

    //will check the app is get installed with provided key or not
    try {
        assert.strictEqual(actualKey,expectedKey);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ClearBitApp_NotInstalled_WithKey.png');
        assert.fail('Due to the clearBit app is not installed with the provided \''+expectedKey+'\' key, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ClearBitApp_NotInstalled_WithKey.png\'.');
    }

    console.log('The clearBit app has been installed with the provided \''+expectedKey+'\' key...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the ClearBit settings should get updated', async () =>{
    let fieldName;

    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button of clearBit app
    await commonActionObj.clickConfigureBtn(driver,'ClearBit');

    //will get the actual value of all fields
    const keyField = await formElementObj.findTextbox(driver,screenshotPath,'apiKeyInput');
    const actualKey = await keyField.getAttribute('value');
    const contactImportCheckbox = await formElementObj.findCheckbox(driver,screenshotPath,'csvExcelImport');
    const actualContactImport = await contactImportCheckbox.getAttribute('value');
    const googleContactImportCheckbox = await formElementObj.findCheckbox(driver,screenshotPath,'googleImport');
    const actualGoogleContactImport = await googleContactImportCheckbox.getAttribute('value');
    const autoSubscribeCheckbox = await formElementObj.findCheckbox(driver,screenshotPath,'autoSubscribe');
    const actualAutoSubscribe = await autoSubscribeCheckbox.getAttribute('value');

    //will check the settings is get updated or not
    try{
        fieldName = 'Key'
        assert.strictEqual(actualKey,expectedKey);
        fieldName = 'ContactImport'
        assert.strictEqual(actualContactImport,expectedContactImport);
        fieldName = 'GoogleContactImport'
        assert.strictEqual(actualGoogleContactImport,expectedGoogleImport);
        fieldName = 'AutoSubscribe'
        assert.strictEqual(actualAutoSubscribe,expectedAutoSubscribe);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'_Field_NotUpdated.png');
        assert.fail('Due to the \''+fieldName+'\' field is not updated, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'_Field_NotUpdated.png\'.');
    }
    
    console.log('The clearBit settings has been updated with Key: '+expectedKey+', Contact Import: '+expectedContactImport+', Google Contact Import: '+expectedGoogleImport+', and Auto Subscribe: '+expectedAutoSubscribe+'...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the ClearBit app should get uninstalled', async () =>{
    //will check the app is get uninstalled or not
    const installBtn = await appsPageElementObj.findAppInstallBtn(driver,'ClearBit');
    if(installBtn.length > 0){
        console.log('The ClearBit app has been uninstalled successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ClearBitApp_Not_Uninstalled.png');
        assert.fail('The ClearBit app is not getting uninstalled. Screenshot Name: \''+screenshotPath+'ClearBitApp_Not_Uninstalled.png\'.');
    }
});